import { beforeEach, expect, test } from '@jest/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialProgress } from '../src/entities/progress/model';
import { useProgress } from '../src/features/learning-progress/store';
beforeEach(async () => {
  await AsyncStorage.clear();
  useProgress.setState({ ...initialProgress, hydrated: true });
});
test('store advances, completes and rehydrates a persisted lesson', async () => {
  useProgress.getState().start('lesson');
  useProgress.getState().answer('lesson', 'q1', true);
  useProgress.getState().advance('lesson', 9, 0);
  expect(useProgress.getState().lessonProgress.lesson.currentStepIndex).toBe(1);
  await useProgress.persist.rehydrate();
  expect(useProgress.getState().lessonProgress.lesson.correctAnswers).toBe(1);
  useProgress.getState().finish('lesson', 50);
  expect(useProgress.getState().totalXp).toBe(50);
  await useProgress.persist.rehydrate();
  expect(useProgress.getState().completedLessonIds).toEqual(['lesson']);
  useProgress.getState().start('lesson');
  useProgress.getState().finish('lesson', 50);
  expect(useProgress.getState().totalXp).toBe(50);
});

test('duplicate navigation callbacks cannot skip a step', () => {
  useProgress.getState().start('lesson');
  useProgress.getState().advance('lesson', 9, 0);
  useProgress.getState().advance('lesson', 9, 0);
  expect(useProgress.getState().lessonProgress.lesson.currentStepIndex).toBe(1);
});

test('invalid persisted state falls back safely with a visible error flag', async () => {
  await AsyncStorage.setItem(
    'learning-progress',
    JSON.stringify({ version: 1, state: { totalXp: 'broken' } }),
  );
  await useProgress.persist.rehydrate();
  expect(useProgress.getState().totalXp).toBe(0);
  expect(useProgress.getState().storageError).toBe(true);
  expect(useProgress.getState().hydrated).toBe(true);
});
