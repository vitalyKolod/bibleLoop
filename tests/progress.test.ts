import { describe, expect, test } from '@jest/globals';
import {
  completeLesson,
  initialProgress,
  localDate,
  newLessonProgress,
  nextStreak,
  recordAnswer,
} from '../src/entities/progress/model';
const now = new Date(2026, 0, 1, 0, 5);
describe('local calendar streak', () => {
  test('yesterday increments across year boundary', () =>
    expect(nextStreak(4, '2025-12-31', now)).toBe(5));
  test('same day unchanged', () => expect(nextStreak(4, '2026-01-01', now)).toBe(4));
  test('gap resets', () => expect(nextStreak(4, '2025-12-29', now)).toBe(1));
  test('first study and leap day', () => {
    expect(nextStreak(0, null, now)).toBe(1);
    expect(nextStreak(1, '2024-02-29', new Date(2024, 2, 1))).toBe(2);
    expect(localDate(now)).toBe('2026-01-01');
  });
});
describe('lesson progress', () => {
  test('records first attempt once and keeps missed IDs', () => {
    const p = newLessonProgress('lesson');
    const failed = recordAnswer(p, 'question', false);
    expect(failed.answeredQuestions).toBe(1);
    expect(failed.missedStepIds).toEqual(['question']);
    expect(recordAnswer(failed, 'question', true)).toBe(failed);
    expect(recordAnswer(failed, 'another', true).correctAnswers).toBe(1);
    expect(p.answeredQuestions).toBe(0);
  });
  test('completion rewards only once including replays', () => {
    const progress = {
      ...initialProgress,
      lessonProgress: { lesson: newLessonProgress('lesson') },
    };
    const completed = completeLesson(progress, 'lesson', 50, now);
    expect(completed.totalXp).toBe(50);
    expect(completed.streak).toBe(1);
    expect(completed.completedLessonIds).toEqual(['lesson']);
    expect(completeLesson(completed, 'lesson', 50, now)).toBe(completed);
    const replay = completeLesson(
      { ...completed, lessonProgress: { lesson: newLessonProgress('lesson') } },
      'lesson',
      50,
      now,
    );
    expect(replay.totalXp).toBe(50);
    expect(replay.lessonProgress.lesson.earnedXp).toBe(0);
  });
});
