import type { Answer } from '../../entities/lesson/evaluate';
import type { LessonStep } from '../../entities/lesson/schema';
import {
  InfoStepView,
  MatchPairsExercise,
  MultipleChoiceExercise,
  OrderItemsExercise,
  StoryStepView,
  TextInputExercise,
  WordBankExercise,
} from './exercises';
export function LessonStepRenderer({
  step,
  answer,
  onChange,
  disabled = false,
  feedback = null,
}: {
  step: LessonStep;
  answer: Answer;
  onChange: (answer: Answer) => void;
  disabled?: boolean;
  feedback?: boolean | null;
}) {
  const props = { answer, onChange, disabled, feedback };
  switch (step.type) {
    case 'story':
      return <StoryStepView step={step} />;
    case 'info':
      return <InfoStepView step={step} />;
    case 'multiple_choice':
      return <MultipleChoiceExercise step={step} {...props} />;
    case 'word_bank':
      return <WordBankExercise step={step} {...props} />;
    case 'text_input':
      return <TextInputExercise step={step} {...props} />;
    case 'order_items':
      return <OrderItemsExercise step={step} {...props} />;
    case 'match_pairs':
      return <MatchPairsExercise step={step} {...props} />;
  }
}
