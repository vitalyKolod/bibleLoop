import type { LessonStep } from './schema';
export type Answer = string | string[] | Record<string, string>;
export function normalizeTextAnswer(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase('ru-RU')
    .replace(/^[\s.,!?;:«»“”"'()—–-]+|[\s.,!?;:«»“”"'()—–-]+$/gu, '')
    .replace(/\s+/gu, ' ');
}
const sameSequence = (a: string[], b: string[]) =>
  a.length === b.length && a.every((v, i) => v === b[i]);
export function evaluateAnswer(step: LessonStep, answer: Answer): boolean {
  switch (step.type) {
    case 'story':
    case 'info':
      return true;
    case 'multiple_choice':
      return typeof answer === 'string' && answer === step.correctOptionId;
    case 'text_input':
      return (
        typeof answer === 'string' &&
        step.correctAnswers.some((a) => normalizeTextAnswer(a) === normalizeTextAnswer(answer))
      );
    case 'word_bank':
      return Array.isArray(answer) && sameSequence(answer, step.correctWordIds);
    case 'order_items':
      return Array.isArray(answer) && sameSequence(answer, step.correctOrder);
    case 'match_pairs':
      return (
        typeof answer === 'object' &&
        !Array.isArray(answer) &&
        Object.keys(answer).length === step.pairs.length &&
        step.pairs.every((p) => answer[p.id] === p.id)
      );
  }
}
export function isAnswerReady(step: LessonStep, answer: Answer): boolean {
  if (step.type === 'story' || step.type === 'info') return true;
  if (step.type === 'order_items')
    return Array.isArray(answer) && answer.length === step.items.length;
  if (step.type === 'match_pairs')
    return (
      typeof answer === 'object' &&
      !Array.isArray(answer) &&
      Object.keys(answer).length === step.pairs.length
    );
  return typeof answer === 'string'
    ? answer.trim().length > 0
    : Array.isArray(answer) && answer.length > 0;
}
