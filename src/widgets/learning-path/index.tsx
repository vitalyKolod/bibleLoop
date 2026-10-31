import { View } from 'react-native';
import { router } from 'expo-router';
import { getLesson } from '../../content/lessons/abraham';
import { greatStory } from '../../content/courses/great-story';
import { useProgress } from '../../features/learning-progress/store';
import { colors, spacing } from '../../shared/theme';
import { LessonCard } from './LessonCard';
export function LearningPath() {
  const completed = useProgress((s) => s.completedLessonIds);
  const progress = useProgress((s) => s.lessonProgress);
  return (
    <View style={{ gap: spacing.lg }}>
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: 46,
          top: 35,
          bottom: 35,
          borderLeftWidth: 1,
          borderColor: colors.goldBorder,
          borderStyle: 'dashed',
        }}
      />
      {greatStory.modules.map((module) => (
        <LessonCard
          key={module.id}
          module={module}
          progress={
            module.lessonId
              ? (progress[module.lessonId]?.currentStepIndex ?? 0) /
                (getLesson(module.lessonId)?.steps.length ?? 1)
              : 0
          }
          completed={Boolean(module.lessonId && completed.includes(module.lessonId))}
          onPress={() => {
            if (module.lessonId)
              router.push({
                pathname: '/lesson/[lessonId]',
                params: { lessonId: module.lessonId },
              });
          }}
        />
      ))}
    </View>
  );
}
