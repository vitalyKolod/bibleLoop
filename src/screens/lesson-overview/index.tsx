import { View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Clock3, Check, ChevronRight, Lock } from 'lucide-react-native';
import { getLesson } from '../../content/lessons/abraham';
import { useProgress } from '../../features/learning-progress/store';
import {
  AppScreen,
  AppText,
  Card,
  EmptyState,
  IconButton,
  PrimaryButton,
  SectionHeader,
  XPBadge,
  styles,
} from '../../shared/ui';
import { colors, spacing } from '../../shared/theme';
import { CharacterArtwork } from '../../widgets/mascot';
export function LessonOverviewScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const lesson = getLesson(lessonId);
  const progress = useProgress((s) => s.lessonProgress[lessonId]);
  const start = useProgress((s) => s.start);
  if (!lesson)
    return (
      <AppScreen>
        <EmptyState title="Урок не найден" description="Вернитесь к карте обучения." />
        <PrimaryButton label="НА ГЛАВНУЮ" onPress={() => router.replace('/')} />
      </AppScreen>
    );
  const inProgress = progress && !progress.completed;
  function begin() {
    start(lessonId);
    router.push({ pathname: '/lesson/play', params: { lessonId } });
  }
  return (
    <AppScreen>
      <IconButton
        label="Назад"
        onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
      >
        <ArrowLeft color={colors.textPrimary} />
      </IconButton>
      <AppText style={styles.eyebrow}>ГЛАВА 02 · АВРААМ</AppText>
      <CharacterArtwork character="abraham" state="thinking" />
      <SectionHeader eyebrow="БОЛЬШАЯ ИСТОРИЯ · УРОК 01" title={lesson.title} />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.lg }}>
        <Clock3 size={18} color={colors.textSecondary} />
        <AppText style={styles.muted}>~{lesson.estimatedMinutes} минут</AppText>
        <XPBadge value={lesson.xpReward} />
      </View>
      <AppText style={styles.muted}>{lesson.description}</AppText>
      <View style={{ gap: spacing.md }}>
        <AppText style={{ fontWeight: '700', fontSize: 20 }}>Внутри истории</AppText>
        {lesson.steps.map((step, index) => {
          const current = progress?.completed ? -1 : (progress?.currentStepIndex ?? 0);
          const completed = Boolean(progress?.completed) || index < current;
          const active = index === current;
          return (
            <Card
              key={step.id}
              style={{
                padding: spacing.md,
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: active ? colors.primaryGold : colors.border,
              }}
            >
              <AppText
                style={{
                  color: active ? colors.primaryGold : colors.textMuted,
                  fontSize: 20,
                  fontWeight: '700',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </AppText>
              <View style={{ flex: 1 }}>
                <AppText style={{ fontSize: 14, lineHeight: 20, fontWeight: '600' }}>
                  {step.title ?? ('prompt' in step ? step.prompt : '')}
                </AppText>
                <AppText style={{ fontSize: 11, color: colors.textSecondary }}>
                  {step.reference}
                </AppText>
              </View>
              {completed ? (
                <Check size={18} color={colors.primaryGold} />
              ) : active ? (
                <ChevronRight size={18} color={colors.primaryGold} />
              ) : (
                <Lock size={14} color={colors.textMuted} />
              )}
            </Card>
          );
        })}
      </View>
      {inProgress && (
        <AppText style={styles.muted}>
          Сохранён шаг {progress.currentStepIndex + 1} из {lesson.steps.length}.
        </AppText>
      )}
      <PrimaryButton
        label={
          inProgress ? 'ПРОДОЛЖИТЬ УРОК' : progress?.completed ? 'ПОВТОРИТЬ УРОК' : 'НАЧАТЬ УРОК'
        }
        onPress={begin}
      />
      {progress?.completed && (
        <AppText style={styles.muted}>
          Повторение закрепляет знания. XP за урок начисляются один раз.
        </AppText>
      )}
    </AppScreen>
  );
}
