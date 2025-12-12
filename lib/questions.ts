import storyline from "@/storyline.json"

// Question bank for each chapter
// Each level has 5 questions based on the storyline sentences
const QUESTION_BANK = {
  1: {
    // Chapter 1: Childhood and Early Life
    1: [
      {
        type: "multiple-choice",
        question: "Where did José Rizal grow up?",
        options: ["Manila", "Calamba", "Dapitan", "Laguna"],
        correct: 1,
      },
      {
        type: "multiple-choice",
        question: "What did young Rizal love to do?",
        options: ["Playing sports", "Reading books and drawing", "Farming", "Cooking"],
        correct: 1,
      },
      {
        type: "multiple-choice",
        question: "Who was Rizal's first teacher?",
        options: ["School teachers", "His friends", "His Mother", "The neighbors"],
        correct: 2,
      },
      {
        type: "typing",
        question: "What was Rizal's nickname?",
        correctAnswer: "pepe",
      },
      {
        type: "multiple-choice",
        question: "Who guided Pepe as an older brother?",
        options: ["Justo", "Paciano", "Mariano", "Miguel"],
        correct: 1,
      },
    ],
    2: [
      {
        type: "multiple-choice",
        question: "How was Rizal at first in school?",
        options: ["Very loud", "Shy", "Angry", "Lazy"],
        correct: 1,
      },
      {
        type: "multiple-choice",
        question: "What was the name of Pepe's pony?",
        options: ["Alipato", "Pinto", "Malaya", "Tagpi"],
        correct: 0,
      },
      {
        type: "multiple-choice",
        question: "What passion did Rizal discover?",
        options: ["Cooking", "Writing and art", "Sports", "Music"],
        correct: 1,
      },
      {
        type: "word-arrangement",
        question: "Arrange these words:",
        words: ["The", "Moth", "That", "Flew", "Too", "Close", "To", "The", "Flame", "And", "Got", "Burned"],
        correctOrder: ["The", "Moth", "That", "Flew", "Too", "Close", "To", "The", "Flame", "And", "Got", "Burned"]
      },
    ],
    3: [
      {
        type: "classification",
        question: "Classify these activities Rizal did:",
        items: ["Reading books", "Playing sports", "Drawing", "Writing"],
        categories: ["Academic", "Physical"],
        correctMapping: {
          "Reading books": "Academic",
          "Drawing": "Academic",
          "Writing": "Academic",
          "Playing sports": "Physical"
        }
      },
      {
        type: "multiple-choice",
        question: "Who was Usman?",
        options: ["His cousin", "His teacher", "His dog", "His neighbor"],
        correct: 2,
      },
      {
        type: "typing",
        question: "What story did his mother tell him?",
        correctAnswer: "The moth and the flame",
      },
      {
        type: "multiple-choice",
        question: "Rizal's family was known for being:",
        options: ["Poor", "Educated", "Lazy", "Angry"],
        correct: 1,
      },
      {
        type: "typing",
        question: "What is Rizal's mother's name?",
        correctAnswer: "Teodora",
      },
    ],
    4: [
      {
        type: "multi-input-typing",
        question: "Name at least 2 of Rizal's siblings (first name only):",
        correctAnswers: "Saturnina,Paciano,Narcisa,Olympia,Lucia,Maria,Concepcion,Josefa,Trinidad,Soledad",
        inputCount: 2,
        placeholder: "Type a sibling's name..."
      },
      {
        type: "multiple-choice",
        question: "What did Pepe love doing as a child?",
        options: ["Cooking", "Making clay figures", "Farming", "Sewing"],
        correct: 1,
      },
      {
        type: "word-arrangement",
        question: "Arrange the words:",
        words: ["Rizal", "loved", "his", "family"],
        correctOrder: ["Rizal", "loved", "his", "family"],
      },
    ],
    5: [
      {
        type: "word-arrangement",
        question: "Arrange these words to form a sentence about Rizal:",
        words: ["Rizal", "was", "a", "curious", "child"],
        correctOrder: ["Rizal", "was", "a", "curious", "child"],
      },
      {
        type: "multiple-choice",
        question: "What made Rizal different from other children?",
        options: ["He was lazy", "He was very curious and smart", "He was mean", "He was shy"],
        correct: 1,
      },
      {
        type: "typing",
        question: "What is Jose Rizal's full name?",
        correctAnswer: "José Protasio Rizal Mercado y Alonso Realonda",
      },
      {
        type: "multiple-choice",
        question: "José Rizal lived in a big family with __ brothers and sisters.",
        options: ["5", "11", "4", "7"],
        correct: 1,
      },
      {
        type: "multiple-choice",
        question: "He was the __ child in the middle of his big family.",
        options: ["5th", "7th", "9th", "11th"],
        correct: 1,
      },
    ],
  },
  2: {
    // Chapter 2: Student Years
    1: [
      {
        type: "matching",
        question: "Match Rizal's student years descriptions:",
        pairs: [
          { left: "First studied at?", right: "Ateneo" },
          { left: "sobresaliente", right: "excellent" },
          { left: "poem for youth", right: "Hope of the fatherland" }
        ]
      },
      {
        type: "multiple-choice",
        question: "What did Pepe want to become to help his mother?",
        options: ["Teacher", "Eye doctor", "Farmer", "Painter"],
        correct: 1,
      },
      {
        type: "typing",
        question: "Who ran the University of Santo Tomas?",
        correctAnswer: "Dominican priests",
        acceptedAnswers: ["Dominican priests", "Dominicans", "dominican priests", "dominicans", "Dominican priest", "dominican priest", "Dominican", "dominican"]
      },
      {
        type: "multiple-choice",
        question: "What subjects did Rizal learn?",
        options: ["Science", "Spanish", "Math", "Law"],
        correct: [0, 1, 2], // Accept A, B, and C (all except D)
        multipleCorrect: true
      },
      {
        type: "word-arrangement",
        question: "Arrange the words:",
        words: ["Fatherland", "Of", "The", "Hope"],
        correctOrder: ["Hope", "Of", "The", "Fatherland"],
      },
    ],
    2: [
      {
        type: "multiple-choice",
        question: "Why did Rizal study medicine?",
        options: ["To help his mother", "study science", "To work in a hospital", "followed brothers advice"],
        correct: 0,
      },
      {
        type: "typing",
        question: "What did Rizal loved writing?",
        correctAnswer: "poems",
        acceptedAnswers: ["poems", "poem", "Poems", "Poem"]
      },
      {
        type: "multiple-choice",
        question: "Rizal was known for being:",
        options: ["Lazy", "Disciplined", "Rude", "Careless"],
        correct: 1,
      },
      {
        type: "typing",
        question: "Who ran the Ateneo?",
        correctAnswer: "Jesuit priests",
        acceptedAnswers: ["Jesuit priests", "Jesuit priest", "Jesuits", "Jesuit", "jesuit priests", "jesuit priest", "jesuits", "jesuit"]
      },
      {
        type: "multiple-choice",
        question: "What made Rizal stand out in school?",
        options: ["His height", "His intelligence and discipline", "His wealth", "His age"],
        correct: 1,
      },
    ],
    3: [
      {
        type: "typing",
        question: "What language did Rizal learn as a subject in school?",
        correctAnswer: "Spanish",
        acceptedAnswers: ["Spanish", "spanish"]
      },
      {
        type: "multiple-choice",
        question: "Rizal excelled in:",
        options: ["Sports", "Academics", "Music", "Law"],
        correct: 1,
      },
      {
        type: "classification",
        question: "Classify Rizal's activities:",
        items: ["Writing", "Drawing", "Running", "Swimming"],
        categories: ["Arts", "Sports"],
        correctMapping: {
          "Writing": "Arts",
          "Drawing": "Arts",
          "Running": "Sports",
          "Swimming": "Sports"
        }
      },
      {
        type: "word-arrangement",
        question: "Arrange Pepe's fullname:",
        words: ["Rizal", "Protasio", "Y", "Alonso", "Realonda", "Jose", "Mercado"],
        correctOrder: ["Jose", "Protasio", "Rizal", "Mercado", "Y", "Alonso", "Realonda"],
      },
    ],
    4: [
      {
        type: "typing",
        question: "Spell the grade he earned for studying hard",
        correctAnswer: "sobresaliente",
        acceptedAnswers: ["sobresaliente", "Sobresaliente", "SOBRESALIENTE"]
      },
      {
        type: "multiple-choice",
        question: "Rizal's education helped him become:",
        options: ["A businessman", "A national hero", "A professional philosopher", "A soldier"],
        correct: 1,
      },
      {
        type: "typing",
        question: "Give at least one of what Rizal learned when he was in school?",
        correctAnswer: "fencing",
        acceptedAnswers: [
          "fencing",
          "Fencing",
          "wrestling",
          "Wrestling",
          "measure land like a land surveyor",
          "Measure land like a land surveyor",
          "fencing, wrestling, and how to measure land like a land surveyor",
          "Fencing, wrestling, and how to measure land like a land surveyor",
          "fencing wrestling and how to measure land like a land surveyor",
          "Fencing wrestling and how to measure land like a land surveyor"
        ]
      },
      {
        type: "multiple-choice",
        question: "What was Rizal passionate about?",
        options: ["Writing poems", "Writing essays", "Law", "Art"],
        correct: [0, 1, 3], // Writing poems, Writing essays, Art
        multipleCorrect: true
      },
    ],
    5: [
      {
        type: "drawing",
        question: "Trace Rizal's dog, Usman, to continue",
        imageUrl: "/traceable/alipato.png"
      },
      {
        type: "multiple-choice",
        question: "What did school life prepare Rizal for?",
        options: ["Nothing", "Bigger challenges", "Farming", "Business"],
        correct: 1,
      },
      {
        type: "typing",
        question: "What does Sobresaliente means?",
        correctAnswer: "excellent",
        acceptedAnswers: ["excellent", "Excellent", "EXCELLENT"]
      },
      {
        type: "word-arrangement",
        question: "Arrange:",
        words: ["Education", "shaped", "Rizal's", "future"],
        correctOrder: ["Education", "shaped", "Rizal's", "future"],
      },
      {
        type: "multiple-choice",
        question: "Rizal's student years were:",
        options: ["Wasted", "Very productive", "Boring", "Short"],
        correct: 1,
      },
    ],
  },
  3: {
    // Chapter 3: Travels Abroad
    1: [
      {
        type: "multiple-choice",
        question: "Where did Rizal first go after leaving the Philippines?",
        options: ["Spain", "Germany", "France", "Philippines"],
        correct: 0,
      },
      {
        type: "fill-in-blanks",
        question: "Rizal left the Philippines on a ___",
        blanks: ["ship"]
      },
      {
        type: "typing",
        question: "What did Rizal buy instead of fancy things?",
        correctAnswer: "books",
        acceptedAnswers: ["books", "Books", "BOOKS", "book", "Book", "BOOK"]
      },
      {
        type: "typing",
        question: "Name one language Rizal learned",
        correctAnswer: "German",
        acceptedAnswers: ["German", "german", "GERMAN", "French", "french", "FRENCH"]
      },
    ],
    2: [
      {
        type: "classification",
        question: "Match the place with Rizal's activity:",
        items: ["Medical studies", "Learned new languages", "Hard work", "Continued learning"],
        categories: ["Spain", "Berlin"],
        correctMapping: {
          "Medical studies": "Spain",
          "Learned new languages": "Spain",
          "Hard work": "Berlin",
          "Continued learning": "Berlin"
        }
      },
      {
        type: "typing",
        question: "Who was Rizal's European friend?",
        correctAnswer: "Ferdinand Blumentritt",
        acceptedAnswers: ["Ferdinand Blumentritt", "ferdinand blumentritt", "Blumentritt", "blumentritt", "FERDINAND BLUMENTRITT"]
      },
      {
        type: "fill-in-blanks",
        question: "Berlin is the capital of ___",
        blanks: ["Germany"]
      },
      {
        type: "multiple-choice",
        question: "Rizal learned new languages in Europe.",
        options: ["True", "False"],
        correct: 0,
      },
    ],
    3: [
      {
        type: "typing",
        question: "Rizal joined other Filipinos in the?",
        correctAnswer: "Propaganda Movement",
        acceptedAnswers: ["Propaganda Movement", "propaganda movement", "PROPAGANDA MOVEMENT", "Propaganda movement"]
      },
      {
        type: "typing",
        question: "The Propaganda Movement sometimes call themselves the?",
        correctAnswer: "Indios Bravos",
        acceptedAnswers: ["Indios Bravos", "indios bravos", "INDIOS BRAVOS", "Indios bravos"]
      },
      {
        type: "typing",
        question: "Spell the name of Rizal's friend he met in Europe",
        correctAnswer: "Ferdinand Blumentritt",
        acceptedAnswers: ["Ferdinand Blumentritt", "ferdinand blumentritt", "FERDINAND BLUMENTRITT", "Blumentritt", "blumentritt"]
      },
      {
        type: "multiple-choice",
        question: "Rizal told his parents that he will leave the Philippines",
        options: ["True", "False"],
        correct: 1,
      },
    ],
    4: [
      {
        type: "multiple-choice",
        question: "Rizal spent money on books",
        options: ["Correct", "Incorrect"],
        correct: 0,
      },
      {
        type: "multiple-choice",
        question: "Group Rizal joined in Europe",
        options: ["Indios Bravos", "Katipunan", "Guardias", "Ilustrados"],
        correct: 0,
      },
      {
        type: "typing",
        question: "___ was the Capital of Germany",
        correctAnswer: "Berlin",
        acceptedAnswers: ["Berlin", "berlin", "BERLIN"]
      },
      {
        type: "drawing",
        question: "Trace Rizal's Pony Alipato, to continue",
        imageUrl: "/traceable/pony.png"
      },
    ],
    5: [
      {
        type: "word-arrangement",
        question: "Arrange these words about Rizal's travels:",
        words: ["Rizal", "traveled", "to", "learn", "and", "grow"],
        correctOrder: [
          ["Rizal", "traveled", "to", "learn", "and", "grow"],
          ["Rizal", "traveled", "to", "grow", "and", "learn"]
        ],
      },
      {
        type: "multiple-choice",
        question: "Rizal realized Filipinos deserved",
        options: ["Fairness and respect", "Gold and power", "Foreign rulers", "Luxury life"],
        correct: 0,
      },
      {
        type: "typing",
        question: "What group did Rizal join with other Filipinos?",
        correctAnswer: "Propaganda Movement",
        acceptedAnswers: ["Propaganda Movement", "propaganda movement", "PROPAGANDA MOVEMENT", "Propaganda movement", "Indios Bravos", "indios bravos"]
      },
      {
        type: "fill-in-blanks",
        question: "Rizal wanted to help his ___",
        blanks: [["country", "Philippines", "people", "mother"]]
      },
      {
        type: "multiple-choice",
        question: "Rizal met Professor Ferdinand Blumentritt in Berlin",
        options: ["True", "False"],
        correct: 0,
      },
    ],
  },
  4: {
    // Chapter 4: Noli Me Tangere
    1: [
      {
        type: "typing",
        question: "What did Rizal love to do?",
        correctAnswer: "Writing",
        acceptedAnswers: ["Writing", "writing", "WRITING", "Stories", "stories", "STORIES", "Poems", "poems", "POEMS"]
      },
      {
        type: "fill-in-blanks",
        question: "Rizal used his ___ to show what Filipinos were feeling.",
        blanks: [["words", "Words", "WORDS"]]
      },
      {
        type: "typing",
        question: "Name one of Rizal's books.",
        correctAnswer: "Noli Me Tangere",
        acceptedAnswers: ["Noli Me Tangere", "noli me tangere", "NOLI ME TANGERE", "Noli me tangere", "El Filibusterismo", "el filibusterismo", "EL FILIBUSTERISMO", "El filibusterismo"]
      },
      {
        type: "multiple-choice",
        question: "How did Rizal share his message?",
        options: ["Writing", "Fighting", "Singing", "Traveling"],
        correct: 0,
      },
    ],
    2: [
      {
        type: "multiple-choice",
        question: "What did Rizal's books talk about?",
        options: ["Law and Obligations", "Nature and Life itself", "Injustices and unfair treatment", "Mind and Behavior"],
        correct: 2,
      },
      {
        type: "multiple-choice",
        question: "Is Maria Clara based from one of Rizal's novel?",
        options: ["True", "False"],
        correct: 0,
      },
      {
        type: "word-arrangement",
        question: "Arrange the words to make a correct sentence:",
        words: ["used", "message", "Rizal", "writing", "his", "share", "to", "a"],
        correctOrder: [["Rizal", "used", "his", "writing", "to", "share", "a", "message"]],
      },
      {
        type: "typing",
        question: "Spell the full name of Rizal's great love",
        correctAnswer: "Leonor Rivera",
        acceptedAnswers: ["Leonor Rivera", "leonor rivera", "LEONOR RIVERA", "Leonor rivera"]
      },
    ],
    3: [
      {
        type: "typing",
        question: "Name of the Hero from one of Rizal's novel",
        correctAnswer: "Ibarra",
        acceptedAnswers: ["Ibarra", "ibarra", "IBARRA", "Crisostomo Ibarra", "crisostomo ibarra", "CRISOSTOMO IBARRA"]
      },
      {
        type: "multiple-choice",
        question: "What the hero dreamed of building?",
        options: ["School", "Market", "House", "Farmer"],
        correct: 0,
      },
      {
        type: "multiple-choice",
        question: "While living in Europe, Rizal began to write powerful stories about the Philippines",
        options: ["True", "False"],
        correct: 0,
      },
      {
        type: "multiple-choice",
        question: "Noli Me Tangere, means \"Touch Me Not\" in English",
        options: ["True", "False"],
        correct: 0,
      },
    ],
    4: [
      {
        type: "multiple-choice",
        question: "Which book talked about unfair treatment?",
        options: ["Noli Me Tangere", "El Filibusterismo", "Mi último adiós", "The Reign of Greed"],
        correct: 1,
      },
      {
        type: "multi-input-typing",
        question: "Name two ways Rizal shared his ideas.",
        correctAnswers: "Writing,Books,Poems,Stories,writing,books,poems,stories,WRITING,BOOKS,POEMS,STORIES",
        inputCount: 2,
        placeholder: "Type a way..."
      },
      {
        type: "multiple-choice",
        question: "He finished the Noli in Germany and later printed the Fili in Ghent, Belgium.",
        options: ["True", "False"],
        correct: 0,
      },
      {
        type: "classification",
        question: "Match the descriptions to the correct book:",
        items: ["Fili in Ghent, Belgium", "Maria Clara and Ibarra", "Social cancer", "Injustices"],
        categories: ["Noli Me Tangere", "El Filibusterismo"],
        correctMapping: {
          "Fili in Ghent, Belgium": "El Filibusterismo",
          "Maria Clara and Ibarra": "Noli Me Tangere",
          "Social cancer": "Noli Me Tangere",
          "Injustices": "El Filibusterismo"
        }
      },
    ],
  },
  5: {
    // Chapter 5: Advocacy and Reform
    1: [
      {
        type: "multiple-choice",
        question: "Rizal wanted a bloody war for the Philippines.",
        options: ["True", "False"],
        correct: 1,
      },
      {
        type: "typing",
        question: "What was the name of the newspaper Rizal wrote for?",
        correctAnswer: "La Solidaridad",
        acceptedAnswers: ["La Solidaridad", "la solidaridad", "LA SOLIDARIDAD", "La solidaridad"]
      },
      {
        type: "multi-input-typing",
        question: "Name two pen names Rizal used (type each separately):",
        correctAnswers: "Laong Laan,Dimasalang,laong laan,dimasalang,LAONG LAAN,DIMASALANG",
        inputCount: 2,
        placeholder: "Type a pen name..."
      },
      {
        type: "spelling",
        question: "Spell the name of the newspaper Rizal wrote for (hint: it means 'solidarity' in Spanish)",
        correctAnswer: "solidaridad",
        acceptedAnswers: ["solidaridad", "Solidaridad", "SOLIDARIDAD", "La Solidaridad", "la solidaridad", "LA SOLIDARIDAD"]
      },
    ],
    2: [
      {
        type: "multiple-choice",
        question: "Rizal believed education was the key to freedom.",
        options: ["True", "False"],
        correct: 0,
      },
      {
        type: "typing",
        question: "According to Rizal, who are the hope of the fatherland?",
        correctAnswer: "youth",
        acceptedAnswers: ["youth", "the youth", "Youth", "The Youth", "YOUTH", "THE YOUTH"]
      },
      {
        type: "multi-input-typing",
        question: "Name two things Rizal wrote for La Solidaridad:",
        correctAnswers: "letters,essays,articles,Letters,Essays,Articles,LETTERS,ESSAYS,ARTICLES",
        inputCount: 2,
        placeholder: "Type one..."
      },
      {
        type: "multiple-choice",
        question: "Rizal used his real name for all his writings.",
        options: ["True", "False"],
        correct: 1,
      },
    ],
    3: [
      {
        type: "typing",
        question: "What group did Rizal help start in the Philippines?",
        correctAnswer: "La Liga Filipina",
        acceptedAnswers: ["La Liga Filipina", "la liga filipina", "LA LIGA FILIPINA", "La liga filipina"]
      },
      {
        type: "multiple-choice",
        question: "La Liga Filipina was created to unite Filipinos.",
        options: ["True", "False"],
        correct: 0,
      },
      {
        type: "spelling",
        question: "Spell the second word in 'La Liga ___' (the group Rizal started)",
        correctAnswer: "filipina",
        acceptedAnswers: ["filipina", "Filipina", "FILIPINA"]
      },
      {
        type: "multi-input-typing",
        question: "What two things did La Liga Filipina teach Filipinos to be?",
        correctAnswers: "brave,united,Brave,United,BRAVE,UNITED",
        inputCount: 2,
        placeholder: "Type one quality..."
      },
    ],
    4: [
      {
        type: "multiple-choice",
        question: "Rizal wanted the Philippines to become a province of Spain with equal rights.",
        options: ["True", "False"],
        correct: 0,
      },
      {
        type: "typing",
        question: "Complete the phrase: 'The pen is mightier than the ___'",
        correctAnswer: "sword",
        acceptedAnswers: ["sword", "Sword", "SWORD"]
      },
      {
        type: "multiple-choice",
        question: "Rizal used violence to fight for justice.",
        options: ["True", "False"],
        correct: 1,
      },
      {
        type: "multi-input-typing",
        question: "Name two things Rizal wanted for the Philippines:",
        correctAnswers: "fair treatment,equal rights,justice,freedom,Fair Treatment,Equal Rights,Justice,Freedom,FAIR TREATMENT,EQUAL RIGHTS,JUSTICE,FREEDOM",
        inputCount: 2,
        placeholder: "Type one..."
      },
    ],
    5: [
      {
        type: "typing",
        question: "What did Rizal use instead of violence to push for change?",
        correctAnswer: "writing",
        acceptedAnswers: ["writing", "words", "pen", "Writing", "Words", "Pen", "WRITING", "WORDS", "PEN", "his writing", "his words", "his pen", "His writing", "His words", "His pen"]
      },
      {
        type: "multiple-choice",
        question: "Rizal believed peaceful change was better than war.",
        options: ["True", "False"],
        correct: 0,
      },
      {
        type: "spelling",
        question: "Spell the word that means 'supporting a cause or policy' (starts with A)",
        correctAnswer: "advocacy",
        acceptedAnswers: ["advocacy", " ", "ADVOCACY"]
      },
      {
        type: "multi-input-typing",
        question: "Name two ways Rizal learned to fight for justice (from his childhood and travels):",
        correctAnswers: "reading,traveling,education,seeing freedom,Reading,Traveling,Education,Seeing Freedom,READING,TRAVELING,EDUCATION,SEEING FREEDOM",
        inputCount: 2,
        placeholder: "Type one way..."
      },
    ],
  },
  6: {
    // Chapter 6: Return to the Philippines
    1: [
      {
        type: "multiple-choice",
        question: "It was safe for Rizal to return to the Philippines.",
        options: ["True", "False"],
        correct: 1,
      },
      {
        type: "typing",
        question: "What town was Rizal sent to by the Spanish government?",
        correctAnswer: "Dapitan",
        acceptedAnswers: ["Dapitan", "dapitan", "DAPITAN"]
      },
      {
        type: "multiple-choice",
        question: "What did Rizal win that helped him buy land?",
        options: ["A contest", "The lottery", "A prize", "A scholarship"],
        correct: 1,
      },
      {
        type: "typing",
        question: "What did Rizal build to bring clean water to the town?",
        correctAnswer: "waterworks",
        acceptedAnswers: ["waterworks", "Waterworks", "WATERWORKS", "water works", "Water works", "WATER WORKS"]
      },
    ],
    2: [
      {
        type: "multiple-choice",
        question: "Rizal gave up when he was sent to Dapitan.",
        options: ["True", "False"],
        correct: 1,
      },
      {
        type: "typing",
        question: "What did Rizal make to light the streets at night?",
        correctAnswer: "coconut oil lamps",
        acceptedAnswers: ["coconut oil lamps", "Coconut oil lamps", "COCONUT OIL LAMPS", "lamps", "Lamps", "LAMPS", "oil lamps", "Oil lamps", "OIL LAMPS"]
      },
      {
        type: "multiple-choice",
        question: "How did students pay Rizal for their education?",
        options: ["With money", "By helping with work", "With food", "They didn't pay"],
        correct: 1,
      },
      {
        type: "multiple-choice",
        question: "Rizal opened a free school for:",
        options: ["Girls", "Boys", "Adults", "Everyone"],
        correct: 1,
      },
    ],
    3: [
      {
        type: "typing",
        question: "What giant map did Rizal make on the ground using stones?",
        correctAnswer: "Mindanao",
        acceptedAnswers: ["Mindanao", "mindanao", "MINDANAO"]
      },
      {
        type: "multiple-choice",
        question: "Rizal worked as a doctor in Dapitan.",
        options: ["True", "False"],
        correct: 0,
      },
      {
        type: "typing",
        question: "Whose eyes did Rizal operate on?",
        correctAnswer: "his mother",
        acceptedAnswers: ["his mother", "His mother", "HIS MOTHER", "mother", "Mother", "MOTHER", "his mother's", "His mother's"]
      },
      {
        type: "multiple-choice",
        question: "What did Rizal study to become?",
        options: ["A lawyer", "An eye doctor", "A teacher", "An engineer"],
        correct: 1,
      },
    ],
    4: [
      {
        type: "typing",
        question: "What flying lizard did Rizal discover? (Draco ___)",
        correctAnswer: "rizali",
        acceptedAnswers: ["rizali", "Rizali", "RIZALI"]
      },
      {
        type: "typing",
        question: "Who became Rizal's wife in Dapitan?",
        correctAnswer: "Josephine Bracken",
        acceptedAnswers: ["Josephine Bracken", "josephine bracken", "JOSEPHINE BRACKEN", "Josephine", "josephine", "JOSEPHINE"]
      },
      {
        type: "multiple-choice",
        question: "Rizal's mother and sisters came to live with him in Dapitan.",
        options: ["True", "False"],
        correct: 0,
      },
      {
        type: "multiple-choice",
        question: "How did the people of Dapitan feel about Rizal?",
        options: ["They feared him", "They admired his kindness", "They ignored him", "They disliked him"],
        correct: 1,
      },
    ],
    5: [
      {
        type: "matching",
        question: "Match Rizal's activities in Dapitan:",
        pairs: [
          { left: "Built waterworks", right: "Clean water for town" },
          { left: "Made coconut oil lamps", right: "Light for streets" },
          { left: "Opened free school", right: "Taught boys skills" },
          { left: "Worked as doctor", right: "Operated on mother's eyes" }
        ]
      },
      {
        type: "multiple-choice",
        question: "Rizal lived simply in Dapitan.",
        options: ["True", "False"],
        correct: 0,
      },
      {
        type: "typing",
        question: "What childhood skill did Rizal show by making clay figures and the Mindanao map?",
        correctAnswer: "art",
        acceptedAnswers: ["art", "Art", "ART", "his love for art", "His love for art", "love for art"]
      },
      {
        type: "multiple-choice",
        question: "In Dapitan, Rizal showed he was:",
        options: ["Selfish", "Lazy", "Kind and hardworking", "Angry"],
        correct: 2,
      },
    ],
  },
  7: {
    // Chapter 7: Trial and Imprisonment
    1: [
      {
        type: "multiple-choice",
        question: "Why were the Spanish authorities afraid of Rizal?",
        options: ["His personality", "His ideas", "His family", "His travels"],
        correct: 1,
      },
      {
        type: "typing",
        question: "What prison was Rizal put in?",
        correctAnswer: "Fort Santiago",
        acceptedAnswers: ["Fort Santiago", "fort santiago", "FORT SANTIAGO", "Fort santiago"]
      },
      {
        type: "multiple-choice",
        question: "Rizal was arrested because of his writings and beliefs.",
        options: ["True", "False"],
        correct: 0,
      },
      {
        type: "typing",
        question: "Where was Fort Santiago located?",
        correctAnswer: "Manila",
        acceptedAnswers: ["Manila", "manila", "MANILA"]
      },
    ],
    2: [
      {
        type: "multiple-choice",
        question: "What did the Spanish authorities accuse Rizal of starting?",
        options: ["A school", "A rebellion", "A newspaper", "A business"],
        correct: 1,
      },
      {
        type: "multiple-choice",
        question: "Rizal always wanted peaceful reform.",
        options: ["True", "False"],
        correct: 0,
      },
      {
        type: "typing",
        question: "How did Rizal act during his trial?",
        correctAnswer: "calm and brave",
        acceptedAnswers: ["calm and brave", "Calm and brave", "CALM AND BRAVE", "calm", "Calm", "CALM", "brave", "Brave", "BRAVE"]
      },
      {
        type: "multiple-choice",
        question: "Rizal showed the same discipline he had as a:",
        options: ["Child", "Student", "Doctor", "Writer"],
        correct: 1,
      },
    ],
    3: [
      {
        type: "typing",
        question: "What did Rizal continue to do inside his jail cell?",
        correctAnswer: "write",
        acceptedAnswers: ["write", "Write", "WRITE", "writing", "Writing", "WRITING"]
      },
      {
        type: "typing",
        question: "What is the title of Rizal's last poem in Spanish? (Mi Último ___)",
        correctAnswer: "Adiós",
        acceptedAnswers: ["Adiós", "adios", "ADIOS", "Adios", "adiós", "ADIÓS"]
      },
      {
        type: "multiple-choice",
        question: "What does 'Mi Último Adiós' mean in English?",
        options: ["My Last Hope", "My Last Farewell", "My Last Letter", "My Last Dream"],
        correct: 1,
      },
      {
        type: "multiple-choice",
        question: "Rizal's last poem was filled with love for his country.",
        options: ["True", "False"],
        correct: 0,
      },
    ],
    4: [
      {
        type: "typing",
        question: "Where did Rizal hide his last poem?",
        correctAnswer: "alcohol lamp",
        acceptedAnswers: ["alcohol lamp", "Alcohol lamp", "ALCOHOL LAMP", "lamp", "Lamp", "LAMP", "an alcohol lamp", "An alcohol lamp"]
      },
      {
        type: "typing",
        question: "Which sister did Rizal give the lamp to?",
        correctAnswer: "Trinidad",
        acceptedAnswers: ["Trinidad", "trinidad", "TRINIDAD"]
      },
      {
        type: "multiple-choice",
        question: "The guards found Rizal's hidden poem.",
        options: ["True", "False"],
        correct: 1,
      },
      {
        type: "typing",
        question: "What term did Rizal use in his poem for the problems hurting the land?",
        correctAnswer: "social cancer",
        acceptedAnswers: ["social cancer", "Social cancer", "SOCIAL CANCER", "Social Cancer"]
      },
    ],
    5: [
      {
        type: "matching",
        question: "Match the details about Rizal's imprisonment:",
        pairs: [
          { left: "Fort Santiago", right: "Prison in Manila" },
          { left: "Mi Último Adiós", right: "Last poem" },
          { left: "Trinidad", right: "Sister who received lamp" },
          { left: "Alcohol lamp", right: "Hiding place for poem" }
        ]
      },
      {
        type: "multiple-choice",
        question: "Even in his darkest days, Rizal accepted his fate with:",
        options: ["Anger", "Courage and hope", "Fear", "Sadness"],
        correct: 1,
      },
      {
        type: "multiple-choice",
        question: "Rizal had faith in his people even in prison.",
        options: ["True", "False"],
        correct: 0,
      },
      {
        type: "typing",
        question: "What three things did Rizal's last poem express love for?",
        correctAnswer: "country",
        acceptedAnswers: ["country", "Country", "COUNTRY", "his country", "His country", "parents", "Parents", "PARENTS", "people", "People", "PEOPLE"]
      },
    ],
  },
  8: {
    // Chapter 8: Execution and Legacy
    1: [
      {
        type: "typing",
        question: "On what date was Rizal executed?",
        correctAnswer: "December 30, 1896",
        acceptedAnswers: ["December 30, 1896", "december 30, 1896", "DECEMBER 30, 1896", "December 30 1896", "december 30 1896"]
      },
      {
        type: "typing",
        question: "What is the old name of Rizal Park?",
        correctAnswer: "Bagumbayan",
        acceptedAnswers: ["Bagumbayan", "bagumbayan", "BAGUMBAYAN"]
      },
      {
        type: "multiple-choice",
        question: "What is another name for Rizal Park?",
        options: ["Luneta", "Manila Bay", "Fort Santiago", "Intramuros"],
        correct: 0,
      },
      {
        type: "multiple-choice",
        question: "Rizal was executed by firing squad.",
        options: ["True", "False"],
        correct: 0,
      },
    ],
    2: [
      {
        type: "multiple-choice",
        question: "Why did Rizal ask not to be shot in the back?",
        options: ["He was afraid", "He was not a traitor", "He wanted to run", "He was tired"],
        correct: 1,
      },
      {
        type: "multiple-choice",
        question: "When the shots were fired, how did Rizal fall?",
        options: ["On his back", "On his side", "Facing the sky", "Face down"],
        correct: 2,
      },
      {
        type: "typing",
        question: "What were Rizal's last words? (Consummatum ___)",
        correctAnswer: "est",
        acceptedAnswers: ["est", "Est", "EST"]
      },
      {
        type: "typing",
        question: "What does 'Consummatum est' mean in English?",
        correctAnswer: "It is finished",
        acceptedAnswers: ["It is finished", "it is finished", "IT IS FINISHED", "It is done", "it is done"]
      },
    ],
    3: [
      {
        type: "multiple-choice",
        question: "How did Filipinos feel when they heard of Rizal's death?",
        options: ["Happy", "Angry", "Wept but inspired", "Confused"],
        correct: 2,
      },
      {
        type: "typing",
        question: "Where was Rizal from as a boy?",
        correctAnswer: "Calamba",
        acceptedAnswers: ["Calamba", "calamba", "CALAMBA"]
      },
      {
        type: "multiple-choice",
        question: "Rizal wrote that the youth are the hope of the:",
        options: ["World", "Fatherland", "Future", "Country"],
        correct: 1,
      },
      {
        type: "typing",
        question: "Name one of Rizal's famous novels (Noli Me Tangere or El Filibusterismo)",
        correctAnswer: "Noli Me Tangere",
        acceptedAnswers: ["Noli Me Tangere", "noli me tangere", "NOLI ME TANGERE", "El Filibusterismo", "el filibusterismo", "EL FILIBUSTERISMO", "Noli", "noli", "NOLI", "Fili", "fili", "FILI"]
      },
    ],
    4: [
      {
        type: "multiple-choice",
        question: "Rizal's death awakened the spirit of the nation.",
        options: ["True", "False"],
        correct: 0,
      },
      {
        type: "typing",
        question: "What did Rizal's death help lead to?",
        correctAnswer: "independence",
        acceptedAnswers: ["independence", "Independence", "INDEPENDENCE", "Philippines independence", "Philippine independence", "the Philippines' independence"]
      },
      {
        type: "multiple-choice",
        question: "Where does Rizal's monument stand today?",
        options: ["Fort Santiago", "Dapitan", "Rizal Park", "Calamba"],
        correct: 2,
      },
      {
        type: "typing",
        question: "What two things are on Rizal's monument that symbolize his ideas?",
        correctAnswer: "book and torch",
        acceptedAnswers: ["book and torch", "Book and torch", "BOOK AND TORCH", "book", "Book", "BOOK", "torch", "Torch", "TORCH", "a book and a torch"]
      },
    ],
    5: [
      {
        type: "matching",
        question: "Match Rizal's life stages with his contributions:",
        pairs: [
          { left: "Boy from Calamba", right: "Curious and loved learning" },
          { left: "Student", right: "Youth are hope of fatherland" },
          { left: "Writer", right: "Noli Me Tangere and El Fili" },
          { left: "In Dapitan", right: "Doctor and teacher" }
        ]
      },
      {
        type: "multiple-choice",
        question: "Rizal is honored as a:",
        options: ["National hero", "King", "President", "General"],
        correct: 0,
      },
      {
        type: "multiple-choice",
        question: "Rizal's story continues to guide children and adults today.",
        options: ["True", "False"],
        correct: 0,
      },
      {
        type: "typing",
        question: "What quality did Rizal show when he turned and fell facing the sky?",
        correctAnswer: "bravery",
        acceptedAnswers: ["bravery", "Bravery", "BRAVERY", "courage", "Courage", "COURAGE", "brave", "Brave", "BRAVE"]
      },
    ],
  },
}

// Get questions for a specific chapter and level (from local bank)
export function getQuestionsForLevel(chapterId: number, levelId: number) {
  const chapterQuestions = QUESTION_BANK[chapterId as keyof typeof QUESTION_BANK]
  if (!chapterQuestions) {
    // Return default questions if not found
    return getDefaultQuestions(chapterId, levelId)
  }

  const levelQuestions = chapterQuestions[levelId as keyof typeof chapterQuestions]
  return levelQuestions || getDefaultQuestions(chapterId, levelId)
}

// Export the question bank for syncing
export { QUESTION_BANK }

// Generate default questions from storyline
function getDefaultQuestions(chapterId: number, levelId: number) {
  const chapterData = storyline.chapters.find((c) => c.chapter === chapterId)
  if (!chapterData) return []

  const sentences = chapterData.story.split("\n").filter((s) => s.trim())
  const sentenceIndex = (levelId - 1) % sentences.length
  const sentence = sentences[sentenceIndex]

  return [
    {
      type: "multiple-choice",
      question: `What does this sentence tell us? "${sentence}"`,
      options: [
        "About Rizal's life",
        "About another person",
        "About animals",
        "About food",
      ],
      correct: 0,
    },
  ]
}
