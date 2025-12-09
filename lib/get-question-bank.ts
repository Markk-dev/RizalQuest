// This file re-exports the question bank to avoid circular dependency issues
import { QUESTION_BANK } from "./questions"

export function getQuestionBank() {
  return QUESTION_BANK
}
