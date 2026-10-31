import { useSoundEffects } from '../../providers/SoundProvider';
import { useState } from 'react';
import { router } from 'expo-router';
import { evaluateAnswer, isAnswerReady, type Answer } from '../../entities/lesson/evaluate';
import type { Lesson } from '../../entities/lesson/schema';
import { useProgress } from '../learning-progress/store';
import { answerFeedback } from '../../shared/lib/haptics';
export function useLessonPlayer(lesson: Lesson) {
  const playSound = useSoundEffects();
  const progress = useProgress((s) => s.lessonProgress[lesson.id]);
  const record = useProgress((s) => s.answer);
  const advance = useProgress((s) => s.advance);
  const finish = useProgress((s) => s.finish);
  const [answer, setAnswer] = useState<Answer>('');
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const index = Math.min(progress?.currentStepIndex ?? 0, lesson.steps.length - 1);
  const step = lesson.steps[index];
  const informational = step.type === 'story' || step.type === 'info';
  const accepted = feedback === true;
  function next() {
    setAnswer('');
    setFeedback(null);
    if (index === lesson.steps.length - 1) {
      finish(lesson.id, lesson.xpReward);
      playSound('complete');
      router.replace({ pathname: '/lesson/complete', params: { lessonId: lesson.id } });
    } else advance(lesson.id, lesson.steps.length, index);
  }
  function submit() {
    if (informational || accepted) {
      next();
      return;
    }
    const correct = evaluateAnswer(step, answer);
    record(lesson.id, step.id, correct);
    setFeedback(correct);
    answerFeedback(correct);
    playSound(correct ? 'correct' : 'incorrect');
  }
  function retry() {
    setFeedback(null);
    setAnswer('');
  }
  return {
    index,
    step,
    answer,
    setAnswer,
    feedback,
    accepted,
    informational,
    submit,
    retry,
    next,
    ready: isAnswerReady(step, answer),
  };
}
