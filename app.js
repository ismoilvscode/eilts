/* =========================================================
   APP — Мантиқи асосии барнома
   ========================================================= */

/* ---------- TABS ---------- */
function switchTab(tab){
  if(state.route === tab) return;
  stopTimers();
  state.route = tab;
  render();
  window.scrollTo({top:0});
}
function updateTabbar(){
  const tb = document.getElementById("tabbar");
  if(!tb) return;
  const mainRoutes = ["home","profile","settings"];
  const show = mainRoutes.includes(state.route);
  tb.classList.toggle("show", show);
  tb.querySelectorAll(".tab").forEach(b=>{
    b.classList.toggle("on", b.dataset.tab === state.route);
  });
  const setLbl = (id,key)=>{
    const el = document.getElementById(id);
    if(el) el.textContent = t(key);
  };
  setLbl("lbl-home","tabHome");
  setLbl("lbl-profile","tabProfile");
  setLbl("lbl-settings","tabSettings");
}

/* =========================================================
   HOME
========================================================= */
function renderHome(){
  const hist = getHistory();
  const doneCount = hist.length;
  const lastBand  = hist.length ? hist[0].band : "—";
  return `
  <div class="topbar">
    <div class="brand">
      <div class="seal">IE</div>
      <div class="brand-text">
        <div class="k">${t('appName')}</div>
        <div class="s">${t('appTag')}</div>
      </div>
    </div>
  </div>

  <div class="hero">
    <h1>${t('heroTitle')}</h1>
    <p>${t('heroDesc')}</p>
    <div class="band">
      <div class="b"><b>${doneCount}</b><span>${t('tests')}</span></div>
      <div class="b"><b>${lastBand}</b><span>${t('band')}</span></div>
    </div>
  </div>

  <div class="grid">
    <div class="mcard" data-mod="listening" onclick="go('listeningList')">
      <div class="ico">${ICONS.headphones}</div>
      <div class="t">${t('modListening')}</div>
      <div class="d">${t('modListeningD')}</div>
      <div class="badge">01</div>
    </div>
    <div class="mcard" data-mod="reading" onclick="go('readingList')">
      <div class="ico">${ICONS.book}</div>
      <div class="t">${t('modReading')}</div>
      <div class="d">${t('modReadingD')}</div>
      <div class="badge">02</div>
    </div>
    <div class="mcard" data-mod="writing" onclick="go('writing', {writingStage:'task1'})">
      <div class="ico">${ICONS.pencil}</div>
      <div class="t">${t('modWriting')}</div>
      <div class="d">${t('modWritingD')}</div>
      <div class="badge">03</div>
    </div>
    <div class="mcard" data-mod="speaking" onclick="go('speaking', {speakingIdx:0})">
      <div class="ico">${ICONS.mic}</div>
      <div class="t">${t('modSpeaking')}</div>
      <div class="d">${t('modSpeakingD')}</div>
      <div class="badge">04</div>
    </div>
  </div>

  <button class="fulltest-btn" onclick="startFullTest()">
    ${ICONS.play}<span>${t('fullTest')}</span>
  </button>

  <div class="history">
    <div class="history-head"><div class="t">${t('history')}</div></div>
    ${hist.length === 0
      ? `<div class="history-card"><div class="empty-hist">${t('noHistory')}</div></div>`
      : `<div class="history-card">${hist.map(h=>`<div class="hrow"><span class="l">${esc(h.label)}</span><span class="r">${esc(h.band)}</span></div>`).join("")}</div>`}
  </div>
  <div class="footer-note">${t('footer')}</div>
  `;
}

/* =========================================================
   PROFILE
========================================================= */
function renderProfile(){
  const hist = getHistory();
  const name = getDisplayName();
  const initial = getInitial();
  const photo = getTgPhoto();
  const tg = getTgUser();

  const numericBands = hist.map(h=>parseFloat(h.band)).filter(b=>!isNaN(b));
  const avg  = numericBands.length
    ? (numericBands.reduce((a,b)=>a+b,0)/numericBands.length).toFixed(1)
    : "—";
  const best = numericBands.length ? Math.max(...numericBands).toFixed(1) : "—";

  const joinDate = new Date().toLocaleDateString();

  return `
  <div class="subhead">
    <div class="subhead-text">
      <div class="eyebrow-num">${t('profileTitle')}</div>
      <div class="section-title">${esc(name)}</div>
    </div>
  </div>

  <div class="profile-head">
    ${photo
      ? `<div class="avatar avatar-photo"><img src="${esc(photo)}" alt="${esc(name)}" onerror="this.parentNode.classList.add('avatar-fallback'); this.parentNode.innerHTML='${esc(initial)}';"></div>`
      : `<div class="avatar">${esc(initial)}</div>`}
    <div class="profile-name">${esc(name)}</div>
    ${tg && tg.username ? `<div class="profile-username">@${esc(tg.username)}</div>` : ``}
    <div class="profile-sub">${t('profileJoined')} ${joinDate}</div>
  </div>

  <div class="stats-grid">
    <div class="stat-card"><b>${hist.length}</b><span>${t('profileTestsDone')}</span></div>
    <div class="stat-card"><b>${avg}</b><span>${t('profileAvgBand')}</span></div>
    <div class="stat-card"><b>${best}</b><span>${t('profileBestBand')}</span></div>
    <div class="stat-card"><b>${numericBands.length}</b><span>${t('band')}</span></div>
  </div>

  ${hist.length ? `<div class="sgroup">
    ${hist.slice(0,8).map(h=>`<div class="srow"><span class="k">${esc(h.label)}</span><span class="v">${esc(h.band)}</span></div>`).join("")}
  </div>` : ``}
  `;
}

/* =========================================================
   SETTINGS
========================================================= */
function renderSettings(){
  const s = getSettings();
  return `
  <div class="subhead">
    <div class="subhead-text">
      <div class="eyebrow-num">${t('settingsTitle')}</div>
      <div class="section-title">${t('settingsTitle')}</div>
    </div>
  </div>

  <div class="sgroup-title">${t('settingsLang')}</div>
  <div class="sgroup">
    <div class="srow">
      <span class="k">${t('settingsLang')}</span>
      <div class="seg">
        <button class="${LANG==='tj'?'on':''}" onclick="saveLang('tj')">TJ</button>
        <button class="${LANG==='ru'?'on':''}" onclick="saveLang('ru')">RU</button>
        <button class="${LANG==='en'?'on':''}" onclick="saveLang('en')">EN</button>
      </div>
    </div>
  </div>

  <div class="sgroup-title">${t('settingsTheme')}</div>
  <div class="sgroup">
    <div class="srow">
      <span class="k">${t('settingsTheme')}</span>
      <div class="seg">
        <button class="${THEME==='light'?'on':''}" onclick="saveTheme('light')">${t('settingsThemeLight')}</button>
        <button class="${THEME==='dark'?'on':''}" onclick="saveTheme('dark')">${t('settingsThemeDark')}</button>
      </div>
    </div>
    <div class="srow">
      <span class="k">${t('settingsSound')}</span>
      <button class="toggle ${s.sound?'on':''}" onclick="toggleSetting('sound')"></button>
    </div>
    <div class="srow">
      <span class="k">${t('settingsRate')}</span>
      <input type="range" class="slider" min="0.6" max="1.3" step="0.05"
        value="${s.rate}" oninput="setRate(this.value)">
    </div>
  </div>

  <div class="sgroup-title">${t('settingsAbout')}</div>
  <div class="sgroup">
    <div class="srow"><span class="k">${t('settingsVersion')}</span><span class="v">1.0.0</span></div>
    <div class="srow"><span class="k">${t('appName')}</span><span class="v">IELTS TJ</span></div>
  </div>

  <div class="sgroup">
    <div class="srow danger-row" onclick="resetAllData()">${t('settingsReset')}</div>
  </div>
  `;
}
function toggleSetting(key){
  const s = getSettings();
  s[key] = !s[key];
  saveSettingsData(s);
  render();
}
function setRate(v){
  const s = getSettings();
  s.rate = parseFloat(v);
  saveSettingsData(s);
}
function resetAllData(){
  if(!confirm(t('settingsResetConfirm'))) return;
  ["ielts_history","ielts_profile","ielts_settings"].forEach(k=>localStorage.removeItem(k));
  showToast(t('settingsResetDone'));
  state.answers = {};
  render();
}

/* =========================================================
   TEST LIST
========================================================= */
function renderTestList(kind){
  const items = kind === 'listening' ? t('listeningTests') : t('readingTests');
  return `
  <div class="subhead">
    <button class="backbtn" onclick="go('home')" aria-label="Back">${ICONS.arrowLeft}</button>
    <div class="subhead-text">
      <div class="eyebrow-num">${kind==='listening'?'01':'02'} / IELTS</div>
      <div class="section-title">${kind==='listening'?t('modListening'):t('modReading')}</div>
    </div>
  </div>
  ${items.map((it,i)=>`
    <div class="testrow" onclick="${kind==='listening' ? `openListening(${i})` : `openReading(${i})`}">
      <div><div class="tt">${esc(it.title)}</div><div class="tm">${esc(it.meta)}</div></div>
      <div class="go">${ICONS.chevron}</div>
    </div>`).join("")}
  `;
}

/* =========================================================
   LISTENING
========================================================= */
function openListening(i){
  state.answers = {}; state.checked = false;
  state.audioPlayedOnce = false; state.ttsFailed = false;
  go('listeningTest', {currentListening:i});
  startElapsedTimer();
}
let _cachedVoice = null;
function pickVoice(){
  if(!window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if(!voices || voices.length === 0) return null;
  return voices.find(v=>v.lang === 'en-GB')
      || voices.find(v=>/en-GB/i.test(v.lang))
      || voices.find(v=>/^en/i.test(v.lang))
      || voices[0];
}
if(window.speechSynthesis){
  _cachedVoice = pickVoice();
  window.speechSynthesis.onvoiceschanged = ()=>{ _cachedVoice = pickVoice(); };
}
function ttsSupported(){
  return !!(window.speechSynthesis && window.SpeechSynthesisUtterance);
}
function speakTranscript(){
  const test = LISTENING[state.currentListening];
  const btn = document.getElementById("playBtn");
  if(!ttsSupported()){
    state.ttsFailed = true; state.audioPlayedOnce = true; render(); return;
  }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(test.transcript);
  const voice = _cachedVoice || pickVoice();
  if(voice) utter.voice = voice;
  utter.lang = (voice && voice.lang) || "en-GB";
  const st = getSettings();
  utter.rate = st.rate || 0.95;

  if(btn){
    btn.setAttribute("disabled","true");
    const span = btn.querySelector("span");
    if(span) span.textContent = t('playing');
  }
  let ended = false;
  const stuckTimer = setTimeout(()=>{
    if(!ended){
      state.ttsFailed = true; state.audioPlayedOnce = true;
      window.speechSynthesis.cancel();
      render();
    }
  }, Math.max(8000, test.transcript.split(/\s+/).length * 500));

  utter.onend = ()=>{
    ended = true; clearTimeout(stuckTimer);
    state.audioPlayedOnce = true;
    const b = document.getElementById("playBtn");
    if(b){
      b.removeAttribute("disabled");
      const span = b.querySelector("span");
      if(span) span.textContent = t('replay');
    }
  };
  utter.onerror = ()=>{
    ended = true; clearTimeout(stuckTimer);
    state.ttsFailed = true; state.audioPlayedOnce = true;
    render();
  };
  window.speechSynthesis.speak(utter);
}
function renderListeningTest(){
  const test = LISTENING[state.currentListening];
  const elapsed = currentElapsed();
  return `
  <div class="subhead">
    <button class="backbtn" onclick="go('listeningList')" aria-label="Back">${ICONS.arrowLeft}</button>
    <div class="subhead-text">
      <div class="eyebrow-num">${t('modListening')} · ${test.id}</div>
      <div class="section-title">${t('section')} ${state.currentListening+1}</div>
    </div>
    <div class="timer"><span class="dot"></span><span id="elapsed">${fmtTime(elapsed)}</span></div>
  </div>
  <div class="card">
    <div class="passage-title">${t('modListening')}</div>
    <div class="section-sub">${esc(test.context)}</div>
    ${state.ttsFailed ? `
      <div class="passage">${esc(test.transcript)}</div>
    ` : `
      <button class="playbtn" id="playBtn" onclick="speakTranscript()"><span>${state.audioPlayedOnce ? t('replay') : t('playAudio')}</span></button>
    `}
    <div class="audio-hint">${state.ttsFailed ? t('audioFallback') : t('audioHint')}</div>
  </div>
  ${renderQuestions(test.questions, 'L')}
  ${renderSubmitBar('listeningTest')}
  `;
}

/* =========================================================
   READING
========================================================= */
function openReading(i){
  state.answers = {}; state.checked = false;
  go('readingTest', {currentReading:i});
  startElapsedTimer();
}
function renderReadingTest(){
  const test = READING[state.currentReading];
  const elapsed = currentElapsed();
  return `
  <div class="subhead">
    <button class="backbtn" onclick="go('readingList')" aria-label="Back">${ICONS.arrowLeft}</button>
    <div class="subhead-text">
      <div class="eyebrow-num">${t('modReading')} · ${test.id}</div>
      <div class="section-title">${t('section')} ${state.currentReading+1}</div>
    </div>
    <div class="timer"><span class="dot"></span><span id="elapsed">${fmtTime(elapsed)}</span></div>
  </div>
  <div class="card">
    <div class="passage">
      <div class="passage-title">${esc(test.title)}</div>
      ${test.text.map(p=>`<p>${esc(p)}</p>`).join("")}
    </div>
  </div>
  ${renderQuestions(test.questions, 'R')}
  ${renderSubmitBar('readingTest')}
  `;
}

/* =========================================================
   QUESTIONS
========================================================= */
function renderQuestions(questions, prefix){
  return `<div class="card">` + questions.map((q,i)=>{
    const key = prefix + "_" + i;
    const picked = state.answers[key];
    let body = "";
    if(q.type === "mc"){
      body = `<div class="opts">` + q.opts.map((o,oi)=>{
        let cls = "opt";
        if(state.checked){
          if(oi === q.answer) cls += " correct";
          else if(picked === oi) cls += " wrong";
        } else if(picked === oi) cls += " sel";
        return `<div class="${cls}" onclick="selectAnswer('${key}', ${oi})"><span class="bubble"></span><span>${esc(o)}</span></div>`;
      }).join("") + `</div>`;
    } else if(q.type === "tf"){
      body = `<div class="tf-row">` + t('trueFalse').map((label,oi)=>{
        let cls = "";
        if(state.checked){
          if(oi === q.answer) cls = "correct";
          else if(picked === oi) cls = "wrong";
        } else if(picked === oi) cls = "sel";
        return `<button class="${cls}" onclick="selectAnswer('${key}', ${oi})">${esc(label)}</button>`;
      }).join("") + `</div>`;
    } else if(q.type === "gap"){
      let cls = "gapline";
      const ok = (picked||"").trim().toLowerCase() === String(q.answer).trim().toLowerCase();
      if(state.checked) cls += ok ? " correct" : " wrong";
      body = `<input class="${cls}" type="text" value="${esc(picked||'')}" ${state.checked?'readonly':''} oninput="typeAnswer('${key}', this.value)" placeholder="..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">`;
      if(state.checked && !ok){
        body += `<div class="gap-hint">→ ${esc(q.answer)}</div>`;
      }
    }
    return `<div class="qwrap">
      <div class="qtext"><span class="qnum">${i+1}</span><span>${esc(q.q)}</span></div>
      ${body}
    </div>`;
  }).join("") + `</div>`;
}
function selectAnswer(key, val){
  if(state.checked) return;
  state.answers[key] = val;
  render();
}
function typeAnswer(key, val){
  state.answers[key] = val;
}
function renderSubmitBar(routeBack){
  return `<div class="submitbar">
    ${!state.checked
      ? `<button class="btn-primary" onclick="checkAnswers()">${t('submit')}</button>`
      : `<button class="btn-primary" onclick="finishCurrentModule('${routeBack}')">${state.fullTestMode ? t('goNextModule') : t('finish')}</button>`}
  </div>`;
}
function checkAnswers(){
  state.checked = true;
  stopTimers();
  render();
}
function scoreCurrent(prefix, questions){
  let correct = 0;
  questions.forEach((q,i)=>{
    const key = prefix + "_" + i;
    const picked = state.answers[key];
    if(q.type === "gap"){
      if((picked||"").trim().toLowerCase() === String(q.answer).trim().toLowerCase()) correct++;
    } else {
      if(picked === q.answer) correct++;
    }
  });
  return correct;
}
function finishCurrentModule(routeBack){
  let correct, total, label, questions, prefix;
  if(routeBack === 'listeningTest'){
    const test = LISTENING[state.currentListening];
    questions = test.questions; prefix = 'L'; total = questions.length;
    correct = scoreCurrent(prefix, questions);
    label = t('modListening') + " · " + test.id;
  } else {
    const test = READING[state.currentReading];
    questions = test.questions; prefix = 'R'; total = questions.length;
    correct = scoreCurrent(prefix, questions);
    label = t('modReading') + " · " + test.id;
  }
  const band = bandFromScore(correct, total);
  if(state.fullTestMode) state.fullTestBands.push(band);
  else pushHistory({label, band, date:Date.now()});
  state.resultData = {correct, total, band, label, prefix, questions};
  go('moduleResult');
}

/* =========================================================
   MODULE RESULT
========================================================= */
function renderModuleResult(){
  const r = state.resultData;
  if(!r) return renderHome();
  return `
  <div class="result-hero">
    <div class="result-band">${r.band}</div>
    <div class="result-label">${t('estBand')}</div>
    <div class="result-stats">
      <div class="s"><b>${r.correct}/${r.total}</b><span>${t('correctAnswers')}</span></div>
    </div>
  </div>
  <div class="card">
    <div class="passage-title" style="margin-bottom:8px;">${t('reviewTitle')}</div>
    ${r.questions.map((q,i)=>{
      const key = r.prefix + "_" + i;
      const picked = state.answers[key];
      let ok;
      if(q.type === "gap") ok = (picked||"").trim().toLowerCase() === String(q.answer).trim().toLowerCase();
      else ok = picked === q.answer;
      return `<div class="review-item"><div class="review-mark ${ok?'ok':'no'}">${ok?'✓':'✕'}</div><div>${esc(q.q)}</div></div>`;
    }).join("")}
  </div>
  <div class="submitbar">
    <button class="btn-primary" onclick="afterModuleFinished()">${state.fullTestMode ? t('goNextModule') : t('backHome')}</button>
  </div>
  `;
}
function afterModuleFinished(){
  if(state.fullTestMode) advanceFullTest();
  else go('home');
}

/* =========================================================
   WRITING
========================================================= */
function renderWriting(){
  const stage = state.writingStage || 'task1';
  const task  = WRITING[stage];
  const text  = state.answers['W_' + stage] || "";
  const wc    = text.trim().length ? text.trim().split(/\s+/).length : 0;
  const enough = wc >= task.minWords;
  return `
  <div class="subhead">
    <button class="backbtn" onclick="go('home')" aria-label="Back">${ICONS.arrowLeft}</button>
    <div class="subhead-text">
      <div class="eyebrow-num">${t('modWriting')} · ${stage==='task1'?t('task1'):t('task2')}</div>
      <div class="section-title">${esc(task.title)}</div>
    </div>
    <div class="timer"><span class="dot"></span><span>${task.minutes} ${t('minutes')}</span></div>
  </div>
  <div class="card">
    <div class="wtask">${esc(task.prompt)}</div>
    ${task.table ? `<div style="overflow-x:auto;"><table class="wtable">
      <tr>${task.table.headers.map(h=>`<th>${esc(h)}</th>`).join("")}</tr>
      ${task.table.rows.map(row=>`<tr>${row.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}
    </table></div>` : ``}
    <textarea class="writer" placeholder="..." oninput="typeWriting('${stage}', this.value)">${esc(text)}</textarea>
    <div class="wcount">
      <span>${t('wordCount')}: <b id="wcountNum" class="${enough?'ok':''}">${wc}</b> / ${task.minWords}</span>
      <span id="wcountTick">${enough ? '✓' : ''}</span>
    </div>
    <div class="section-sub" style="margin-top:12px;">${t('writingHint')}</div>
    <div class="checklist">
      ${['chk1','chk2','chk3','chk4'].map((c,i)=>`
        <label class="chk-row"><input type="checkbox" ${state.answers['WC_'+stage+'_'+i]?'checked':''} onchange="toggleCheck('${stage}',${i},this.checked)"><span>${t(c)}</span></label>
      `).join("")}
    </div>
  </div>
  <div class="submitbar">
    ${stage === 'task1'
      ? `<button class="btn-primary" onclick="go('writing',{writingStage:'task2'})">${t('next')}: ${t('task2')}</button>`
      : `<button class="btn-primary" onclick="finishWriting()">${t('saveWriting')}</button>`}
  </div>
  `;
}
function typeWriting(stage, val){
  state.answers['W_' + stage] = val;
  const wc  = val.trim() ? val.trim().split(/\s+/).length : 0;
  const min = WRITING[stage].minWords;
  const n    = document.getElementById('wcountNum');
  const tick = document.getElementById('wcountTick');
  if(n){ n.textContent = wc; n.className = wc >= min ? 'ok' : ''; }
  if(tick) tick.textContent = wc >= min ? '✓' : '';
}
function toggleCheck(stage, i, val){
  state.answers['WC_' + stage + '_' + i] = val;
  const inputs = document.querySelectorAll('.checklist .chk-row input');
  if(inputs[i]) inputs[i].checked = val;
}
function finishWriting(){
  if(state.fullTestMode){
    advanceFullTest();
  } else {
    pushHistory({label:t('modWriting'), band:"—", date:Date.now()});
    showToast(t('moduleDone') + " · " + t('congrats'));
    go('home');
  }
}

/* =========================================================
   SPEAKING
========================================================= */
let mediaStream = null;

const MIC_ERROR_KEYS = {
  denied:      { title:"micDeniedTitle",      desc:"micDeniedDesc" },
  notfound:    { title:"micNotFoundTitle",    desc:"micNotFoundDesc" },
  busy:        { title:"micBusyTitle",        desc:"micBusyDesc" },
  https:       { title:"micHttpsTitle",       desc:"micHttpsDesc" },
  unavailable: { title:"micUnavailableTitle", desc:"micUnavailableDesc" },
  unknown:     { title:"micUnknownTitle",     desc:"micUnknownDesc" }
};

async function toggleRecording(){
  if(state.mediaRecorder && state.mediaRecorder.state === 'recording'){
    state.mediaRecorder.stop();
    return;
  }
  state.micError = null;

  const isSecure =
    location.protocol === 'https:' ||
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1';
  if(!isSecure){ state.micError = "https"; render(); return; }

  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
    state.micError = "unavailable"; render(); return;
  }

  try{
    const stream = await navigator.mediaDevices.getUserMedia({ audio:true });
    mediaStream = stream;

    const chunks = [];
    const mr = new MediaRecorder(stream);
    mr.ondataavailable = e => { if(e.data && e.data.size) chunks.push(e.data); };
    mr.onstop = () => {
      const blob = new Blob(chunks, { type: mr.mimeType || 'audio/webm' });
      if(state.recordedBlobUrl) URL.revokeObjectURL(state.recordedBlobUrl);
      state.recordedBlobUrl = URL.createObjectURL(blob);
      if(mediaStream) mediaStream.getTracks().forEach(tr => tr.stop());
      mediaStream = null;
      state.mediaRecorder = null;
      stopSpeakingTimer();
      render();
    };
    mr.start();
    state.mediaRecorder = mr;
    startSpeakingTimer();
    render();
  } catch(err){
    const name = (err && err.name) || "";
    if(name === 'NotAllowedError' || name === 'SecurityError')            state.micError = "denied";
    else if(name === 'NotFoundError' || name === 'DevicesNotFoundError')  state.micError = "notfound";
    else if(name === 'NotReadableError' || name === 'TrackStartError')    state.micError = "busy";
    else state.micError = "unknown";
    render();
  }
}

function retryMic(){
  state.micError = null;
  render();
  setTimeout(()=>toggleRecording(), 80);
}

async function checkMicPermission(){
  try{
    if(navigator.permissions && navigator.permissions.query){
      const p = await navigator.permissions.query({ name:'microphone' });
      if(p.state === 'denied'){
        state.micError = "denied";
        render();
      }
    }
  }catch(e){}
}

function startSpeakingTimer(){
  state.speakingElapsed = 0;
  state.speakingTimerId = setInterval(()=>{
    state.speakingElapsed++;
    const el = document.getElementById('speakingTime');
    if(el) el.textContent = fmtTime(state.speakingElapsed);
  }, 1000);
}
function stopSpeakingTimer(){
  if(state.speakingTimerId){
    clearInterval(state.speakingTimerId);
    state.speakingTimerId = null;
  }
}

function renderSpeaking(){
  const idx = state.speakingIdx || 0;
  const part = SPEAKING[idx];
  const recording = state.mediaRecorder && state.mediaRecorder.state === 'recording';
  const liveTime  = recording ? fmtTime(state.speakingElapsed) : null;
  const err       = state.micError;
  const errKeys   = err ? MIC_ERROR_KEYS[err] : null;

  return `
  <div class="subhead">
    <button class="backbtn" onclick="go('home')" aria-label="Back">${ICONS.arrowLeft}</button>
    <div class="subhead-text">
      <div class="eyebrow-num">${t('modSpeaking')} · ${t('speakingPart')} ${part.part}</div>
      <div class="section-title">${esc(part.title)}</div>
    </div>
  </div>

  <div class="card">
    <div class="cue-card">
      ${part.prompts.map(p => p.endsWith(':')
        ? `<div style="font-weight:700;margin-top:10px;color:var(--ink);">${esc(p)}</div>`
        : `<div>${esc(p)}</div>`).join("")}
    </div>

    <div class="speak-meta">
      <div class="m"><b>${part.prep ? fmtTime(part.prep) : "—"}</b><span>${t('prepTime')}</span></div>
      <div class="m"><b>${fmtTime(part.speak)}</b><span>${t('speakTime')}</span></div>
    </div>

    ${err ? `
      <div class="mic-error">
        <div class="mic-error-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="3" width="6" height="11" rx="3"/>
            <path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>
            <line x1="3" y1="3" x2="21" y2="21" stroke-width="2"/>
          </svg>
        </div>
        <div class="mic-error-title">${t(errKeys.title)}</div>
        <div class="mic-error-desc">${t(errKeys.desc)}</div>
        <button class="btn-primary mic-retry-btn" onclick="retryMic()">${t('micRetry')}</button>
      </div>
    ` : `
      <div class="rec-panel">
        <button class="rec-btn ${recording?'recording':''}" id="recBtn" onclick="toggleRecording()" aria-label="Record"><span class="dot"></span></button>
        <div class="rec-state ${recording?'live':''}" id="speakingTime">
          ${recording ? liveTime : (state.recordedBlobUrl ? t('playback') : t('startRec'))}
        </div>
        ${state.recordedBlobUrl && !recording ? `<audio controls src="${state.recordedBlobUrl}"></audio>` : ``}
      </div>
    `}
  </div>

  <div class="submitbar">
    ${idx < SPEAKING.length-1
      ? `<button class="btn-primary" onclick="nextSpeakingPart()">${t('next')}</button>`
      : `<button class="btn-primary" onclick="finishSpeaking()">${t('finishModule')}</button>`}
  </div>
  `;
}
function nextSpeakingPart(){
  if(state.recordedBlobUrl){ URL.revokeObjectURL(state.recordedBlobUrl); state.recordedBlobUrl = null; }
  if(mediaStream){ mediaStream.getTracks().forEach(tr=>tr.stop()); mediaStream = null; }
  state.mediaRecorder = null;
  go('speaking', {speakingIdx: (state.speakingIdx||0) + 1});
}
function finishSpeaking(){
  if(state.recordedBlobUrl){ URL.revokeObjectURL(state.recordedBlobUrl); state.recordedBlobUrl = null; }
  if(mediaStream){ mediaStream.getTracks().forEach(tr=>tr.stop()); mediaStream = null; }
  state.mediaRecorder = null;
  if(state.fullTestMode){
    advanceFullTest();
  } else {
    pushHistory({label:t('modSpeaking'), band:"—", date:Date.now()});
    showToast(t('moduleDone') + " · " + t('congrats'));
    go('home');
  }
}

/* =========================================================
   FULL TEST FLOW
========================================================= */
function startFullTest(){
  state.fullTestMode = true;
  state.fullTestQueue = ['listeningTest','readingTest','writing','speaking'];
  state.fullTestBands = [];
  state.currentListening = 0;
  state.currentReading = 0;
  state.writingStage = 'task1';
  state.speakingIdx = 0;
  state.answers = {}; state.checked = false;
  state.audioPlayedOnce = false; state.ttsFailed = false;
  showToast(t('fullTestFlow'));
  go(state.fullTestQueue[0]);
  if(state.fullTestQueue[0] === 'listeningTest' || state.fullTestQueue[0] === 'readingTest') startElapsedTimer();
}
function advanceFullTest(){
  state.fullTestQueue.shift();
  if(state.fullTestQueue.length === 0){
    state.fullTestMode = false;
    const bands = state.fullTestBands.filter(b=>typeof b === 'number');
    const overall = bands.length ? (bands.reduce((a,b)=>a+b,0)/bands.length) : 0;
    const rounded = Math.round(overall * 2) / 2;
    pushHistory({label:t('overallBand'), band: rounded.toFixed(1), date:Date.now()});
    state.overallData = {bands, overall: rounded};
    showToast(t('allDone'));
    go('overallResult');
    return;
  }
  state.answers = {}; state.checked = false;
  state.audioPlayedOnce = false; state.ttsFailed = false;
  const nxt = state.fullTestQueue[0];
  go(nxt);
  if(nxt === 'listeningTest' || nxt === 'readingTest') startElapsedTimer();
}
function renderOverallResult(){
  const o = state.overallData || {bands:[], overall:0};
  const labels = [t('modListening'), t('modReading'), t('modWriting'), t('modSpeaking')];
  return `
  <div class="result-hero">
    <div class="result-band">${o.overall.toFixed(1)}</div>
    <div class="result-label">${t('overallBand')}</div>
  </div>
  <div class="card">
    <div class="passage-title" style="margin-bottom:8px;">${t('resultTitle')}</div>
    ${labels.map((l,i)=>{
      const b = o.bands[i];
      const val = (typeof b === 'number') ? b.toFixed(1) : "—";
      return `<div class="review-item"><div class="review-mark ok" style="background:var(--blue);box-shadow:none;">${i+1}</div><div style="flex:1;display:flex;justify-content:space-between;gap:10px;"><span>${esc(l)}</span><b style="font-variant-numeric:tabular-nums;">${val}</b></div></div>`;
    }).join("")}
  </div>
  <div class="submitbar">
    <button class="btn-primary" onclick="go('home')">${t('backHome')}</button>
  </div>
  `;
}

/* =========================================================
   MAIN RENDER
========================================================= */
function render(){
  let html = "";
  switch(state.route){
    case 'home':           html = renderHome(); break;
    case 'profile':        html = renderProfile(); break;
    case 'settings':       html = renderSettings(); break;
    case 'listeningList':  html = renderTestList('listening'); break;
    case 'readingList':    html = renderTestList('reading'); break;
    case 'listeningTest':  html = renderListeningTest(); break;
    case 'readingTest':    html = renderReadingTest(); break;
    case 'moduleResult':   html = renderModuleResult(); break;
    case 'overallResult':  html = renderOverallResult(); break;
    case 'writing':        html = renderWriting(); break;
    case 'speaking':       html = renderSpeaking(); break;
    default:               html = renderHome();
  }
  document.getElementById('app').innerHTML = html;
  updateTabbar();

  if(state.route === 'speaking' && !state.micError){
    checkMicPermission();
  }
}
render();

document.addEventListener('visibilitychange', ()=>{
  if(!document.hidden && state.startTime){
    const el = document.getElementById('elapsed');
    if(el) el.textContent = fmtTime(currentElapsed());
  }
});