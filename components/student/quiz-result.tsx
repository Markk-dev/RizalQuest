"use client"

interface QuizResultProps {
  isCorrect: boolean
  question: {
    id: number
    question: string
    options: string[]
    correct: number
  }
  onNext: () => void
  isLastLevel: boolean
}

export default function QuizResult({ isCorrect, question, onNext, isLastLevel }: QuizResultProps) {
  return (
    <div
      className={`rounded-2xl shadow-lg p-12 text-center ${
        isCorrect ? "bg-green-50 border-2 border-green-300" : "bg-red-50 border-2 border-red-300"
      }`}
    >
      {/* Result Icon and Message */}
      <div className="mb-8">
        <div className="text-7xl mb-6">{isCorrect ? "🎉" : "💪"}</div>
        <h2 className={`text-4xl font-bold mb-3 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
          {isCorrect ? "Nicely done!" : "Try again."}
        </h2>
        <p className={`text-lg ${isCorrect ? "text-green-600" : "text-red-600"}`}>
          {isCorrect ? "You earned 10 XP and 1 Heart!" : "You lost 1 Heart. Keep learning!"}
        </p>
      </div>

      {/* Explanation */}
      <div className="bg-white rounded-xl p-6 mb-8 text-left">
        <p className="text-sm text-gray mb-2">The correct answer is:</p>
        <p className="font-bold text-black text-lg">
          {String.fromCharCode(65 + question.correct)}: {question.options[question.correct]}
        </p>
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark transition-all duration-200 transform hover:scale-105"
      >
        {isLastLevel ? "Back to Chapters" : "Next Level"}
      </button>
    </div>
  )
}
