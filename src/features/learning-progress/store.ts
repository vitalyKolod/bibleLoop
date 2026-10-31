import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { progressSchema } from '../../entities/progress/schema';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  completeLesson,
  initialProgress,
  newLessonProgress,
  recordAnswer,
  type Progress,
} from '../../entities/progress/model';
type ProgressStore = Progress & {
  hydrated: boolean;
  storageError: boolean;
  setHydrated: (error?: boolean) => void;
  start: (id: string) => void;
  answer: (id: string, stepId: string, correct: boolean) => void;
  advance: (id: string, stepCount: number, expectedIndex: number) => void;
  finish: (id: string, reward: number) => void;
};
export const useProgress = create<ProgressStore>()(
  persist(
    (set) => ({
      ...initialProgress,
      hydrated: false,
      storageError: false,
      setHydrated: (error = false) =>
        set((state) => ({ hydrated: true, storageError: error || state.storageError })),
      start: (id) =>
        set((state) => ({
          lessonProgress: {
            ...state.lessonProgress,
            [id]:
              state.lessonProgress[id] && !state.lessonProgress[id].completed
                ? state.lessonProgress[id]
                : newLessonProgress(id),
          },
        })),
      answer: (id, stepId, correct) =>
        set((state) => {
          const p = state.lessonProgress[id];
          return p && !p.completed
            ? {
                lessonProgress: { ...state.lessonProgress, [id]: recordAnswer(p, stepId, correct) },
              }
            : {};
        }),
      advance: (id, count, expectedIndex) =>
        set((state) => {
          const p = state.lessonProgress[id];
          return p && !p.completed && p.currentStepIndex === expectedIndex
            ? {
                lessonProgress: {
                  ...state.lessonProgress,
                  [id]: { ...p, currentStepIndex: Math.min(p.currentStepIndex + 1, count - 1) },
                },
              }
            : {};
        }),
      finish: (id, reward) => set((state) => completeLesson(state, id, reward)),
    }),
    {
      name: 'learning-progress',
      version: 1,
      storage: createJSONStorage(() => ({
        getItem: (key) => AsyncStorage.getItem(key),
        setItem: async (key, value) => {
          try {
            await AsyncStorage.setItem(key, value);
          } catch {
            if (!useProgress.getState().storageError) useProgress.setState({ storageError: true });
          }
        },
        removeItem: (key) => AsyncStorage.removeItem(key),
      })),
      merge: (persisted, current) => {
        if (persisted === undefined) return current;
        const parsed = progressSchema.safeParse(persisted);
        return parsed.success
          ? { ...current, ...parsed.data }
          : { ...current, ...initialProgress, storageError: true };
      },
      partialize: (state) => ({
        totalXp: state.totalXp,
        streak: state.streak,
        lastStudyDate: state.lastStudyDate,
        completedLessonIds: state.completedLessonIds,
        lessonProgress: state.lessonProgress,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (state) state.setHydrated(Boolean(error));
        else useProgress.setState({ hydrated: true, storageError: true });
      },
    },
  ),
);
