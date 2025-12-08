"use client"

import QuizQuestion from "./quiz-question"
import TypingQuestion from "./question-types/typing"
import MultiInputTypingQuestion from "./question-types/multi-input-typing"
import ClassificationQuestion from "./question-types/classification"
import FillInBlanksQuestion from "./question-types/fill-in-blanks"
import WordArrangementQuestion from "./question-types/word-arrangement"
import MatchingQuestion from "./question-types/matching"

interface QuestionRendererProps {
  question: any
  onAnswer: (result: any) => void
  onNext: () => void
}

export default function QuestionRenderer({ question, onAnswer, onNext }: QuestionRendererProps) {
  switch (question.type) {
    case "multiple-choice":
      return <QuizQuestion question={question} onAnswer={onAnswer} onNext={onNext} />
    
    case "typing":
      return <TypingQuestion question={question} onAnswer={onAnswer} onNext={onNext} />
    
    case "multi-input-typing":
      return <MultiInputTypingQuestion question={question} onAnswer={onAnswer} onNext={onNext} />
    
    case "classification":
      return <ClassificationQuestion question={question} onAnswer={onAnswer} onNext={onNext} />
    
    case "fill-in-blanks":
      return <FillInBlanksQuestion question={question} onAnswer={onAnswer} onNext={onNext} />
    
    case "word-arrangement":
      return <WordArrangementQuestion question={question} onAnswer={onAnswer} onNext={onNext} />
    
    case "matching":
      return <MatchingQuestion question={question} onAnswer={onAnswer} onNext={onNext} />
    
    default:
      return <QuizQuestion question={question} onAnswer={onAnswer} onNext={onNext} />
  }
}
