import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { abrahamLesson } from '../src/content/lessons/abraham';
import type { LessonStep } from '../src/entities/lesson/schema';
import { LessonStepRenderer } from '../src/features/lesson-player/LessonStepRenderer';
import { MultipleChoiceExercise } from '../src/features/lesson-player/exercises';
function getStep<T extends LessonStep['type']>(type: T): Extract<LessonStep, { type: T }> {
  const step = abrahamLesson.steps.find(
    (s): s is Extract<LessonStep, { type: T }> => s.type === type,
  );
  if (!step) throw new Error(`Missing ${type}`);
  return step;
}
describe('exercise UI', () => {
  test('multiple choice renders accessible options and emits stable ID', async () => {
    const change = jest.fn();
    await render(
      <MultipleChoiceExercise
        step={getStep('multiple_choice')}
        answer=""
        onChange={change}
        disabled={false}
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'В Ханаан' }));
    expect(change).toHaveBeenCalledWith('canaan');
  });
  test('disabled options cannot change an accepted answer', async () => {
    const change = jest.fn();
    await render(
      <MultipleChoiceExercise
        step={getStep('multiple_choice')}
        answer="canaan"
        onChange={change}
        disabled
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'В Египет' }));
    expect(change).not.toHaveBeenCalled();
  });
  test.each([
    'story',
    'info',
    'multiple_choice',
    'word_bank',
    'text_input',
    'order_items',
    'match_pairs',
  ] as const)('renderer supports %s', async (type) => {
    await render(<LessonStepRenderer step={getStep(type)} answer="" onChange={jest.fn()} />);
    if (type === 'text_input')
      expect(screen.getByLabelText('Какое новое имя Бог дал Авраму?')).toBeTruthy();
    else if (type === 'story') expect(screen.getByText(/Бог призывает Аврама/)).toBeTruthy();
    else if (type === 'info') expect(screen.getByText(/Ур находился/)).toBeTruthy();
    else expect(screen.getAllByRole('button').length).toBeGreaterThan(1);
  });
});
