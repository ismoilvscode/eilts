/* =========================================================
   READING — Дарсҳои хониш
   ========================================================= */
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

  /* ---------- Дарси нави Reading ин ҷо илова кунед ---------- */
];