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
        words: ["School", "life", "prepared", "Rizal"],
        correctOrder: ["School", "life", "prepared", "Rizal"],
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
        type: "multiple-choice",
        question: "Young Rizal showed talent in:",
        options: ["Fighting", "Art and writing", "Cooking", "Dancing"],
        correct: 1,
      },
    ],
    4: [
      {
        type: "multiple-choice",
        question: "What values did Rizal's parents teach him?",
        options: ["Laziness", "Good manners and respect", "Fighting", "Stealing"],
        correct: 1,
      },
      {
        type: "multiple-choice",
        question: "What did Pepe love doing as a child?",
        options: ["Cooking", "Arts and Reading", "Farming", "Sewing"],
        correct: 1,
      },
      {
        type: "multiple-choice",
        question: "How old was Pepe when he learned the alphabet?",
        options: ["2 years old", "3 years old", "5 years old", "7 years old"],
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
        question: "Match Rizal's subjects with their descriptions:",
        pairs: [
          { left: "Spanish", right: "Language he learned" },
          { left: "Science", right: "Study of nature" },
          { left: "Math", right: "Numbers and calculations" }
        ]
      },
      {
        type: "multiple-choice",
        question: "Where did Rizal study?",
        options: ["One school only", "Different schools", "At home", "Abroad only"],
        correct: 1,
      },
      {
        type: "typing",
        question: "How did Rizal approach his studies?",
        correctAnswer: "hard",
      },
      {
        type: "multiple-choice",
        question: "What subjects did Rizal learn?",
        options: ["Only math", "Spanish, science, math and more", "Only art", "Only history"],
        correct: 1,
      },
      {
        type: "word-arrangement",
        question: "Arrange the words:",
        words: ["Rizal", "was", "an", "excellent", "student"],
        correctOrder: ["Rizal", "was", "an", "excellent", "student"],
      },
    ],
    2: [
      {
        type: "multiple-choice",
        question: "How did Rizal work in his lessons?",
        options: ["Lazily", "Hard", "Slowly", "Never"],
        correct: 1,
      },
      {
        type: "typing",
        question: "What did teachers think of Rizal?",
        correctAnswer: "respectful",
      },
      {
        type: "multiple-choice",
        question: "Rizal was known for being:",
        options: ["Lazy", "Disciplined and polite", "Rude", "Careless"],
        correct: 1,
      },
      {
        type: "fill-in-blanks",
        question: "Rizal studied ___ and ___.",
        blanks: ["hard", "well"],
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
        question: "What passion did Rizal discover? (Type one word)",
        correctAnswer: "writing",
      },
      {
        type: "multiple-choice",
        question: "Rizal excelled in:",
        options: ["Sports only", "Academic subjects", "Music only", "Nothing"],
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
        type: "multiple-choice",
        question: "What language did Rizal master?",
        options: ["English", "Spanish", "French", "German"],
        correct: 1,
      },
      {
        type: "word-arrangement",
        question: "Arrange:",
        words: ["Rizal", "loved", "to", "learn"],
        correctOrder: ["Rizal", "loved", "to", "learn"],
      },
    ],
    4: [
      {
        type: "word-arrangement",
        question: "Arrange: Rizal studied at different schools",
        words: ["Rizal", "studied", "at", "different", "schools"],
        correctOrder: ["Rizal", "studied", "at", "different", "schools"],
      },
      {
        type: "multiple-choice",
        question: "Rizal's education helped him become:",
        options: ["A farmer", "A national hero", "A chef", "A soldier"],
        correct: 1,
      },
      {
        type: "typing",
        question: "What did Rizal discover a passion for?",
        correctAnswer: "art",
      },
      {
        type: "multiple-choice",
        question: "Teachers respected Rizal because he was:",
        options: ["Rich", "Disciplined and polite", "Tall", "Old"],
        correct: 1,
      },
      {
        type: "fill-in-blanks",
        question: "Rizal was a ___ student who loved ___.",
        blanks: ["dedicated", "learning"],
      },
    ],
    5: [
      {
        type: "classification",
        question: "Classify these traits of Rizal:",
        items: ["Disciplined", "Lazy", "Polite", "Rude"],
        categories: ["Positive", "Negative"],
        correctMapping: {
          "Disciplined": "Positive",
          "Polite": "Positive",
          "Lazy": "Negative",
          "Rude": "Negative"
        }
      },
      {
        type: "multiple-choice",
        question: "What did school life prepare Rizal for?",
        options: ["Nothing", "Bigger challenges", "Farming", "Business"],
        correct: 1,
      },
      {
        type: "typing",
        question: "What quality made Rizal successful?",
        correctAnswer: "discipline",
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
