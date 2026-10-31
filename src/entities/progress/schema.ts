import { z } from 'zod';
const count = z.number().int().nonnegative();
const ids = z
  .array(z.string().min(1))
  .refine((v) => new Set(v).size === v.length, 'IDs must be unique');
const lessonProgressSchema = z
  .object({
    lessonId: z.string().min(1),
    currentStepIndex: count,
    correctAnswers: count,
    answeredQuestions: count,
    completed: z.boolean(),
    earnedXp: count,
    answeredStepIds: ids,
    missedStepIds: ids,
  })
  .refine(
    (p) =>
      p.correctAnswers <= p.answeredQuestions &&
      p.answeredQuestions === p.answeredStepIds.length &&
      p.missedStepIds.every((id) => p.answeredStepIds.includes(id)),
    'Invalid answer counters',
  );
export const progressSchema = z
  .object({
    totalXp: count,
    streak: count,
    lastStudyDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .nullable(),
    completedLessonIds: ids,
    lessonProgress: z.record(z.string(), lessonProgressSchema),
  })
  .refine(
    (p) => Object.entries(p.lessonProgress).every(([id, lesson]) => id === lesson.lessonId),
    'Lesson ID does not match storage key',
  );
