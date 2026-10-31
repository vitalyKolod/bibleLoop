import { useLocalSearchParams, router } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { getLesson } from '../../content/lessons/abraham';
import type { Lesson } from '../../entities/lesson/schema';
import { useProgress } from '../../features/learning-progress/store';
import { useLessonPlayer } from '../../features/lesson-player/useLessonPlayer';
import { LessonStepRenderer } from '../../features/lesson-player/LessonStepRenderer';
import {
  AppScreen,
  AppText,
  EmptyState,
  FeedbackCard,
  PrimaryButton,
  SecondaryButton,
  styles,
} from '../../shared/ui';
import { colors, spacing } from '../../shared/theme';
import { Mascot } from '../../widgets/mascot';
import { LessonHeader } from '../../widgets/lesson-header';
function Player({ lesson }: { lesson: Lesson }) {
  const player = useLessonPlayer(lesson);
  const offset = useSharedValue(0);
  const animated = useAnimatedStyle(() => ({ transform: [{ translateX: offset.value }] }));
  useEffect(() => {
    if (player.feedback === false)
      offset.set(
        withSequence(
          withTiming(-5, { duration: 60 }),
          withTiming(5, { duration: 60 }),
          withTiming(0, { duration: 60 }),
        ),
      );
  }, [player.feedback, offset]);
  return (
    <AppScreen scroll={false}>
      <LessonHeader
        index={player.index}
        count={lesson.steps.length}
        onExit={() =>
          router.canGoBack()
            ? router.back()
            : router.replace({ pathname: '/lesson/[lessonId]', params: { lessonId: lesson.id } })
        }
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, gap: spacing.lg }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ gap: spacing.xxl, paddingBottom: spacing.xxl }}
        >
          {!player.informational && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ gap: spacing.xs }}>
                <AppText style={styles.eyebrow}>ПРОВЕРЬТЕ СЕБЯ</AppText>
                <AppText style={{ color: colors.textSecondary, fontSize: 12 }}>
                  {lesson.title}
                </AppText>
              </View>
              <Mascot
                size={60}
                state={
                  player.feedback === true
                    ? 'correct'
                    : player.feedback === false
                      ? 'wrong'
                      : 'thinking'
                }
              />
            </View>
          )}
          <AppText accessibilityRole="header" style={styles.heading}>
            {player.step.title ?? ('prompt' in player.step ? player.step.prompt : 'История')}
          </AppText>
          <Animated.View key={player.step.id} entering={FadeInDown.duration(220)} style={animated}>
            <LessonStepRenderer
              key={player.step.id}
              step={player.step}
              answer={player.answer}
              onChange={player.setAnswer}
              disabled={player.feedback !== null}
              feedback={player.feedback}
            />
          </Animated.View>
          {player.informational && player.step.reference && (
            <AppText style={styles.muted}>{player.step.reference}</AppText>
          )}
        </ScrollView>
        <View style={{ gap: spacing.md }}>
          {player.feedback !== null && (
            <Animated.View entering={FadeInDown.duration(240)}>
              <FeedbackCard
                correct={player.feedback}
                explanation={player.step.explanation}
                reference={player.step.reference}
              />
            </Animated.View>
          )}
          {player.feedback === false ? (
            <>
              <PrimaryButton label="ПОПРОБОВАТЬ ЕЩЁ" onPress={player.retry} />
              <SecondaryButton label="ПРОДОЛЖИТЬ С ОБЪЯСНЕНИЕМ" onPress={player.next} />
            </>
          ) : (
            <PrimaryButton
              label={player.informational || player.accepted ? 'ПРОДОЛЖИТЬ' : 'ПРОВЕРИТЬ'}
              disabled={!player.informational && !player.accepted && !player.ready}
              onPress={player.submit}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}
export function LessonPlayerScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const lesson = getLesson(lessonId);
  const progress = useProgress((s) => s.lessonProgress[lessonId]);
  if (!lesson || !progress)
    return (
      <AppScreen>
        <EmptyState title="Урок не запущен" description="Выберите урок на главной, чтобы начать." />
        <PrimaryButton label="НА ГЛАВНУЮ" onPress={() => router.replace('/')} />
      </AppScreen>
    );
  return <Player lesson={lesson} />;
}
