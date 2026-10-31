export type LessonProgress = {
  lessonId: string;
  currentStepIndex: number;
  correctAnswers: number;
  answeredQuestions: number;
  completed: boolean;
  earnedXp: number;
  answeredStepIds: string[];
  missedStepIds: string[];
};
export type Progress = {
  totalXp: number;
  streak: number;
  lastStudyDate: string | null;
  completedLessonIds: string[];
  lessonProgress: Record<string, LessonProgress>;
};
export const initialProgress: Progress = {
  totalXp: 0,
  streak: 0,
  lastStudyDate: null,
  completedLessonIds: [],
  lessonProgress: {},
};
export function newLessonProgress(lessonId: string): LessonProgress {
  return {
    lessonId,
    currentStepIndex: 0,
    correctAnswers: 0,
    answeredQuestions: 0,
    completed: false,
    earnedXp: 0,
    answeredStepIds: [],
    missedStepIds: [],
  };
}
export function recordAnswer(
  progress: LessonProgress,
  stepId: string,
  correct: boolean,
): LessonProgress {
  if (progress.answeredStepIds.includes(stepId)) return progress;
  return {
    ...progress,
    answeredQuestions: progress.answeredQuestions + 1,
    correctAnswers: progress.correctAnswers + (correct ? 1 : 0),
    answeredStepIds: [...progress.answeredStepIds, stepId],
    missedStepIds: correct ? progress.missedStepIds : [...progress.missedStepIds, stepId],
  };
}
export function localDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function nextStreak(streak: number, lastDate: string | null, now = new Date()): number {
  const today = localDate(now);
  if (lastDate === today) return streak;
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  return lastDate === localDate(yesterday) ? streak + 1 : 1;
}
export function completeLesson(
  progress: Progress,
  lessonId: string,
  reward: number,
  now = new Date(),
): Progress {
  const lesson = progress.lessonProgress[lessonId];
  if (!lesson || lesson.completed) return progress;
  const xp = progress.completedLessonIds.includes(lessonId) ? 0 : reward;
  return {
    ...progress,
    totalXp: progress.totalXp + xp,
    streak: nextStreak(progress.streak, progress.lastStudyDate, now),
    lastStudyDate: localDate(now),
    completedLessonIds: [...new Set([...progress.completedLessonIds, lessonId])],
    lessonProgress: {
      ...progress.lessonProgress,
      [lessonId]: { ...lesson, completed: true, earnedXp: xp },
    },
  };
}
