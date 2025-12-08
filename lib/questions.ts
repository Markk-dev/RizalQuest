import storyline from "@/storyline.json"

// Question bank for each chapter
// Each level has 5 questions based on the storyline sentences
export const QUESTION_BANK = {
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
        question: "Trace Rizal's dog, Alipato, to continue",
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
}

// Get questions for a specific chapter and level
export function getQuestionsForLevel(chapterId: number, levelId: number) {
  const chapterQuestions = QUESTION_BANK[chapterId as keyof typeof QUESTION_BANK]
  if (!chapterQuestions) {
    // Return default questions if not found
    return getDefaultQuestions(chapterId, levelId)
  }

  const levelQuestions = chapterQuestions[levelId as keyof typeof chapterQuestions]
  return levelQuestions || getDefaultQuestions(chapterId, levelId)
}

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
