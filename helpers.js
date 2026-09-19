/* =========================================================
   HELPERS — Ёвариҳо, state, icons, storage
========================================================= */

/* ---------- Забон ва мавзӯъ ---------- */
let LANG  = localStorage.getItem("ielts_lang")  || "tj";
let THEME = localStorage.getItem("ielts_theme") || "light";

/* ---------- Ҳолати барнома ---------- */
let state = {
  route:"home",
  fullTestMode:false,
  fullTestQueue:[],
  fullTestBands:[],
  currentListening:0,
  currentReading:0,
  answers:{},
  checked:false,
  startTime:null,
  elapsedSec:0,
  timerId:null,
  audioPlayedOnce:false,
  ttsFailed:false,
  recordedBlobUrl:null,
  mediaRecorder:null,
  speakingIdx:0,
  speakingTimerId:null,
  speakingElapsed:0,
  writingStage:"task1",
  resultData:null,
  overallData:null,
  micError:null
};

/* ---------- Тарҷума ---------- */
function t(key){ return I18N[LANG][key]; }

/* ---------- Забон / мавзӯъ ---------- */
function saveLang(l){
  LANG = l;
  localStorage.setItem("ielts_lang", l);
  document.documentElement.lang = l;
  render();
}
function saveTheme(m){
  THEME = m;
  localStorage.setItem("ielts_theme", m);
  applyTheme();
  render();
}
function applyTheme(){
  document.documentElement.setAttribute("data-theme", THEME);
  const meta = document.querySelector('meta[name="theme-color"]');
  if(meta) meta.setAttribute("content", THEME === "dark" ? "#07070a" : "#eef0f5");
}
applyTheme();
document.documentElement.lang = LANG;

/* =========================================================
   TELEGRAM WEBAPP
========================================================= */
try{
  if(window.Telegram && window.Telegram.WebApp){
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    if(tg.colorScheme === "dark" && !localStorage.getItem("ielts_theme")){
      THEME = "dark"; applyTheme();
    }
    tg.onEvent && tg.onEvent("themeChanged", ()=>{
      if(!localStorage.getItem("ielts_theme")){
        THEME = tg.colorScheme; applyTheme();
      }
    });
  }
}catch(e){}

/* ---------- Гирифтани маълумоти корбар аз Telegram ---------- */
function getTgUser(){
  try{
    if(window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe){
      const u = window.Telegram.WebApp.initDataUnsafe.user;
      if(u && u.id) return u;
    }
  }catch(e){}
  return null;
}

/* Ном ва насаби пурра аз Telegram */
function getDisplayName(){
  const tg = getTgUser();
  if(tg){
    const first = tg.first_name || "";
    const last  = tg.last_name  || "";
    const full  = (first + " " + last).trim();
    if(full) return full;
    if(tg.username) return "@" + tg.username;
  }
  const p = getProfile();
  if(p.name) return p.name;
  return t('profileDefault');
}

/* Сурати корбар аз Telegram (ё null) */
function getTgPhoto(){
  const tg = getTgUser();
  return (tg && tg.photo_url) ? tg.photo_url : null;
}

/* Ҳарфи аввали ном */
function getInitial(){
  const name = getDisplayName();
  return (name.trim().charAt(0) || "U").toUpperCase();
}

/* ---------- Утилитаҳо ---------- */
function showToast(msg){
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(()=>el.classList.remove("show"), 2200);
}
function getHistory(){
  try{ return JSON.parse(localStorage.getItem("ielts_history")||"[]"); }
  catch(e){ return []; }
}
function pushHistory(entry){
  const h = getHistory();
  h.unshift(entry);
  localStorage.setItem("ielts_history", JSON.stringify(h.slice(0,12)));
}
function fmtTime(sec){
  const m = Math.floor(sec/60), s = sec%60;
  return String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");
}
function bandFromScore(correct, total){
  const pct = correct/total;
  if(pct >= 0.9) return 8.5;
  if(pct >= 0.8) return 7.5;
  if(pct >= 0.6) return 6.5;
  if(pct >= 0.4) return 5.5;
  if(pct >= 0.2) return 4.5;
  return 3.5;
}
function esc(s){
  return String(s == null ? "" : s)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;")
    .replace(/'/g,"&#39;");
}

/* ---------- Навигатсия ---------- */
function go(route, extra){
  stopTimers();
  state.route = route;
  Object.assign(state, extra||{});
  render();
  window.scrollTo({top:0});
}
function stopTimers(){
  if(state.timerId){ clearInterval(state.timerId); state.timerId = null; }
  if(state.speakingTimerId){ clearInterval(state.speakingTimerId); state.speakingTimerId = null; }
  if(window.speechSynthesis) window.speechSynthesis.cancel();
  state.startTime = null;
  state.speakingElapsed = 0;
}
function startElapsedTimer(){
  state.startTime = Date.now();
  state.elapsedSec = 0;
  state.timerId = setInterval(()=>{
    state.elapsedSec = Math.floor((Date.now() - state.startTime)/1000);
    const el = document.getElementById("elapsed");
    if(el) el.textContent = fmtTime(state.elapsedSec);
  }, 250);
}
function currentElapsed(){
  if(!state.startTime) return state.elapsedSec || 0;
  return Math.floor((Date.now() - state.startTime)/1000);
}

/* ---------- Иконкаҳо ---------- */
const ICONS = {
  headphones:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13v-1a8 8 0 0 1 16 0v1"/><rect x="2.5" y="13" width="5" height="7" rx="2.2"/><rect x="16.5" y="13" width="5" height="7" rx="2.2"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Z"/><path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5a1.5 1.5 0 0 0 1.5-1.5v-13Z"/></svg>',
  pencil:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m4 20 1-4.2L15.6 5.2a1.5 1.5 0 0 1 2.1 0l1.1 1.1a1.5 1.5 0 0 1 0 2.1L8.2 19 4 20Z"/><path d="M14 6.5 17.5 10"/></svg>',
  mic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  arrowLeft:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  chevron:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
  sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8V4z"/></svg>'
};

/* ---------- Profile / Settings storage ---------- */
function getProfile(){
  try{ return JSON.parse(localStorage.getItem("ielts_profile")||"{}"); }
  catch(e){ return {}; }
}
function saveProfileData(p){
  localStorage.setItem("ielts_profile", JSON.stringify(p));
}
function getSettings(){
  try{
    return Object.assign(
      { sound:true, rate:0.95, theme:"auto" },
      JSON.parse(localStorage.getItem("ielts_settings")||"{}")
    );
  }catch(e){
    return { sound:true, rate:0.95, theme:"auto" };
  }
}
function saveSettingsData(s){
  localStorage.setItem("ielts_settings", JSON.stringify(s));
}