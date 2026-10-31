import { describe, expect, test } from '@jest/globals';
import { abrahamLesson } from '../src/content/lessons/abraham';
import { evaluateAnswer, normalizeTextAnswer } from '../src/entities/lesson/evaluate';
import { lessonSchema, parseLesson } from '../src/entities/lesson/schema';
describe('text normalization', () => {
  test.each([
    ['  Авраам  ', 'авраам'],
    ['«АВРААМ!»', 'авраам'],
    ['  отец   многих \n народов. ', 'отец многих народов'],
  ])('%s → %s', (input, expected) => expect(normalizeTextAnswer(input)).toBe(expected));
  test('does not conflate distinct biblical names', () => {
    const step = abrahamLesson.steps.find((s) => s.type === 'text_input');
    if (!step) throw new Error('Missing fixture');
    expect(evaluateAnswer(step, 'Авраам')).toBe(true);
    expect(evaluateAnswer(step, 'Аврам')).toBe(false);
  });
});
describe('answer evaluation', () => {
  test('multiple choice, word bank, ordering and matching', () => {
    const [, , multiple, , words, order, match] = abrahamLesson.steps;
    expect(evaluateAnswer(multiple, 'canaan')).toBe(true);
    expect(evaluateAnswer(multiple, 'egypt')).toBe(false);
    expect(evaluateAnswer(words, ['covenant'])).toBe(true);
    expect(evaluateAnswer(words, ['law'])).toBe(false);
    expect(evaluateAnswer(order, ['call', 'go', 'covenant', 'name'])).toBe(true);
    expect(evaluateAnswer(order, ['name', 'call', 'go', 'covenant'])).toBe(false);
    expect(
      evaluateAnswer(match, { abraham: 'abraham', canaan: 'canaan', covenant: 'covenant' }),
    ).toBe(true);
    expect(
      evaluateAnswer(match, { abraham: 'canaan', canaan: 'abraham', covenant: 'covenant' }),
    ).toBe(false);
  });
  test('rejects incompatible answer shapes', () => {
    expect(evaluateAnswer(abrahamLesson.steps[2], ['canaan'])).toBe(false);
    expect(evaluateAnswer(abrahamLesson.steps[6], {})).toBe(false);
  });
});
describe('versioned content', () => {
  test('accepts complete authored lesson', () =>
    expect(lessonSchema.safeParse(abrahamLesson).success).toBe(true));
  test('rejects unsupported version', () =>
    expect(lessonSchema.safeParse({ ...abrahamLesson, schemaVersion: 2 }).success).toBe(false));
  test('reports missing correct option', () =>
    expect(() =>
      parseLesson({
        ...abrahamLesson,
        steps: [{ ...abrahamLesson.steps[2], correctOptionId: 'missing' }],
      }),
    ).toThrow('Correct option must exist'));
  test('rejects repeated step IDs and malformed order', () => {
    expect(
      lessonSchema.safeParse({
        ...abrahamLesson,
        steps: [abrahamLesson.steps[0], abrahamLesson.steps[0]],
      }).success,
    ).toBe(false);
    expect(
      lessonSchema.safeParse({
        ...abrahamLesson,
        steps: [{ ...abrahamLesson.steps[5], correctOrder: ['call', 'call', 'call', 'call'] }],
      }).success,
    ).toBe(false);
  });
});
