/* =========================================================
   LESSONS — Ҳамаи мазмуни тестҳо
   =========================================================
   Барои илова кардани дарси нав танҳо ба массиви дахлдор
   як объекти нав илова кунед.
========================================================= */

/* ---------------------------------------------------------
   LISTENING — Тестҳои гӯш кардан
--------------------------------------------------------- */
const LISTENING = [
  {
    id: "L1",
    context: "You will hear a conversation between a student, Maria, and a university accommodation officer.",
    transcript: "Accommodation Officer: Good morning, welcome to the Housing Office. How can I help you today? "
      + "Maria: Hi, I'm looking for accommodation for next semester. My name is Maria Santos. "
      + "Accommodation Officer: Thanks, Maria. Are you looking for a single room or would you consider sharing? "
      + "Maria: I'd prefer a single room, if possible, with my own bathroom. "
      + "Accommodation Officer: We have a room available in Kellner Hall, on the third floor. The rent is two hundred and forty pounds a week, including bills. "
      + "Maria: That sounds good. Is it close to the library? "
      + "Accommodation Officer: Yes, it's about a ten minute walk. The bus stop is right outside the building, route number twelve. "
      + "Maria: Perfect. What do I need to do to book it? "
      + "Accommodation Officer: You'll need to pay a deposit of one hundred pounds and fill out this form. The deadline for this room is the fifteenth of September.",
    questions: [
      { type:"mc",  q:"What type of room is Maria looking for?", opts:["A shared room","A single room with a bathroom","A studio flat"], answer:1 },
      { type:"gap", q:"The room is located in Kellner Hall, on the ____ floor.", answer:"third" },
      { type:"gap", q:"The weekly rent is £____.", answer:"240" },
      { type:"mc",  q:"How far is the accommodation from the library?", opts:["A five minute walk","A ten minute walk","A twenty minute walk"], answer:1 },
      { type:"gap", q:"The booking deadline is the ____ of September.", answer:"15th" }
    ]
  },
  {
    id: "L2",
    context: "You will hear a university lecturer introducing a course on environmental science.",
    transcript: "Lecturer: Good afternoon everyone, and welcome to Introduction to Environmental Science. Over the next twelve weeks, we'll cover four main topics: climate systems, biodiversity, pollution, and sustainable resource management. "
      + "Each week there will be a two hour lecture on Monday, followed by a one hour seminar on Thursday. Attendance at seminars is compulsory. "
      + "For assessment, thirty percent of your grade comes from a group project due in week six, and the remaining seventy percent comes from a final written exam in week thirteen. "
      + "The group project requires you to choose a local environmental issue and propose a realistic solution. You should form groups of four by the end of this week. "
      + "Please note that the reading list has been uploaded to the online learning platform, and the most important text is a book called Foundations of Ecology.",
    questions: [
      { type:"tf",  q:"The course lasts for twelve weeks.", answer:0 },
      { type:"mc",  q:"How many main topics will the course cover?", opts:["Three","Four","Five"], answer:1 },
      { type:"tf",  q:"Attendance at the Thursday seminar is optional.", answer:1 },
      { type:"gap", q:"The group project is worth ____ percent of the final grade.", answer:"30" },
      { type:"gap", q:"Students should form groups of ____ students.", answer:"four" }
    ]
  }

  /* ---------- Дарси нав ин ҷо илова кунед ----------
  ,
  {
    id: "L3",
    context: "...",
    transcript: "...",
    questions: [ ... ]
  }
  */
];


/* ---------------------------------------------------------
   READING — Тестҳои хониш
--------------------------------------------------------- */
const READING = [
  {
    id: "R1",
    title: "The Rise of Urban Beekeeping",
    text: [
      "Over the past two decades, beekeeping has moved from rural farms into the heart of major cities. Rooftops in New York, balconies in Paris, and community gardens in London now host thousands of beehives, reflecting a growing public interest in pollinator conservation and locally produced honey.",
      "Urban beekeeping offers several advantages over rural beekeeping. City environments often provide a longer flowering season because ornamental gardens, parks, and street trees bloom at different times throughout the year. In addition, urban areas typically have lower pesticide use than large-scale agricultural land, which can result in healthier bee colonies.",
      "However, the practice is not without challenges. Limited space means hives must be carefully positioned to avoid conflict with neighbours, and some cities require beekeepers to register their hives and follow strict guidelines regarding hive placement and colony management. Critics also argue that an oversupply of honeybees in small urban areas could increase competition for nectar with wild, native pollinator species, some of which are already under threat.",
      "Despite these concerns, many environmental groups view urban beekeeping as a valuable tool for public engagement. Community apiaries and educational programmes allow city residents, including children, to learn directly about pollination and food production, fostering a stronger connection between urban populations and the natural systems that sustain them."
    ],
    questions: [
      { type:"tf",  q:"Urban beekeeping has become more common in the last twenty years.", answer:0 },
      { type:"tf",  q:"Rural areas generally use less pesticide than cities.", answer:1 },
      { type:"mc",  q:"According to the text, why might city flowering seasons be longer?", opts:["Because of warmer city temperatures","Because of a variety of gardens, parks and street trees","Because cities have fewer insects"], answer:1 },
      { type:"mc",  q:"What concern do critics raise about urban beekeeping?", opts:["Honey quality is lower in cities","Bees may compete with wild pollinators for nectar","Hives are too expensive to maintain"], answer:1 },
      { type:"tf",  q:"All cities allow beekeepers to place hives without registration.", answer:1 }
    ]
  },
  {
    id: "R2",
    title: "Silent Reading and the Modern Brain",
    text: [
      "For most of human history, reading was performed aloud, even when a person was alone. Historians note that silent reading only became widespread after the invention of the printing press, when books became more affordable and readers could engage with text privately and at their own pace.",
      "Cognitive scientists have since become interested in how silent reading affects comprehension compared with reading aloud. Some studies suggest that reading aloud can improve memory retention of specific facts, a phenomenon researchers call the production effect: information that is spoken is often more memorable than information that is only read silently.",
      "On the other hand, silent reading tends to be significantly faster, allowing readers to process more complex texts within a limited time. This is particularly useful in academic contexts, where students must read large volumes of material quickly. Speed, however, can come at the cost of deep engagement; some researchers argue that slower, more deliberate reading, whether silent or aloud, leads to better critical analysis of a text's argument.",
      "Ultimately, most experts agree that the best reading strategy depends on the purpose of the task. Reading aloud may suit memorisation or language learning, while silent reading is generally more efficient for gathering large amounts of information quickly."
    ],
    questions: [
      { type:"mc",  q:"According to the passage, silent reading became common after...", opts:["the invention of writing","the invention of the printing press","the rise of public libraries"], answer:1 },
      { type:"gap", q:"Researchers call the memory advantage of reading aloud the ____ effect.", answer:"production" },
      { type:"tf",  q:"Silent reading is generally faster than reading aloud.", answer:0 },
      { type:"tf",  q:"All experts agree that silent reading is always the better strategy.", answer:1 },
      { type:"mc",  q:"Reading aloud is suggested to be particularly useful for...", opts:["gathering large volumes of information","memorisation and language learning","fast academic reading"], answer:1 }
    ]
  }

  /* ---------- Дарси нав ин ҷо илова кунед ---------- */
];


/* ---------------------------------------------------------
   WRITING — Вазифаҳои навиштан
--------------------------------------------------------- */
const WRITING = {
  task1: {
    title: "Writing Task 1",
    minutes: 20,
    minWords: 150,
    prompt: "The table below shows the percentage of households with internet access in four countries between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    table: {
      headers: ["Country","2000","2010","2020"],
      rows: [
        ["Country A","12%","58%","93%"],
        ["Country B","5%","31%","82%"],
        ["Country C","20%","67%","95%"],
        ["Country D","2%","19%","71%"]
      ]
    }
  },
  task2: {
    title: "Writing Task 2",
    minutes: 40,
    minWords: 250,
    prompt: "Some people believe that university education should be free for all students, while others think students should pay for their own education. Discuss both views and give your own opinion. Write at least 250 words."
  }
};


/* ---------------------------------------------------------
   SPEAKING — Қисмҳои сӯҳбат
--------------------------------------------------------- */
const SPEAKING = [
  {
    part: 1, prep: 0, speak: 60,
    title: "Part 1 — Introduction",
    card: "Answer general questions about yourself.",
    prompts: [
      "What is your full name?",
      "Do you work or are you a student?",
      "What do you like about your hometown?",
      "How do you usually spend your weekends?"
    ]
  },
  {
    part: 2, prep: 60, speak: 120,
    title: "Part 2 — Long Turn",
    card: "Describe a skill you would like to learn.",
    prompts: [
      "Describe a skill you would like to learn.",
      "You should say:",
      "what the skill is",
      "why you want to learn it",
      "how you would learn it",
      "and explain how this skill could be useful to you."
    ]
  },
  {
    part: 3, prep: 0, speak: 90,
    title: "Part 3 — Discussion",
    card: "Discuss broader questions related to Part 2.",
    prompts: [
      "Why do you think people continue learning new skills throughout their lives?",
      "Do you think schools should teach more practical skills?",
      "How has technology changed the way people learn new skills?"
    ]
  }

  /* ---------- Қисми нав ин ҷо илова кунед ---------- */
];