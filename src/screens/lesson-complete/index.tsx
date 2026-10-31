import { RewardCounter } from '../../shared/ui/RewardCounter';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getLesson } from '../../content/lessons/abraham';
import { useProgress } from '../../features/learning-progress/store';
import {
  AppScreen,
  AppText,
  Card,
  EmptyState,
  PrimaryButton,
  SecondaryButton,
  SectionHeader,
  StreakBadge,
  styles,
} from '../../shared/ui';
import { colors, spacing } from '../../shared/theme';
import { View } from 'react-native';
import { Mascot } from '../../widgets/mascot';
export function LessonCompleteScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const lesson = getLesson(lessonId);
  const result = useProgress((s) => s.lessonProgress[lessonId]);
  const streak = useProgress((s) => s.streak);
  if (!lesson || !result?.completed)
    return (
      <AppScreen>
        <EmptyState title="Путь ещё продолжается" description="Сначала завершите урок." />
        <PrimaryButton label="НА ГЛАВНУЮ" onPress={() => router.replace('/')} />
      </AppScreen>
    );
  return (
    <AppScreen>
      <Animated.View
        entering={FadeInDown.duration(400)}
        style={{ alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md }}
      >
        <View style={{ width: 220, height: 200, alignItems: 'center', justifyContent: 'center' }}>
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              width: 190,
              height: 190,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: colors.borderGold,
              backgroundColor: colors.goldTint,
              opacity: 0.5,
            }}
          />
          <AppText
            style={{ position: 'absolute', top: 6, color: colors.primaryGold, letterSpacing: 30 }}
          >
            ✦ · ✧
          </AppText>
          <Mascot state="celebrate" size={150} />
        </View>
        <SectionHeader eyebrow="ЕЩЁ ОДНО ОТКРЫТИЕ" title="Урок завершён!" />
        <AppText style={styles.muted}>{lesson.title}</AppText>
        <RewardCounter value={result.earnedXp} />
      </Animated.View>
      <Card style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ gap: spacing.xs }}>
          <AppText style={{ fontSize: 24, fontWeight: '700' }}>
            {result.correctAnswers} / {result.answeredQuestions}
          </AppText>
          <AppText style={{ color: colors.textSecondary, fontSize: 12 }}>
            Верно с первой попытки
          </AppText>
        </View>
        <View style={{ gap: spacing.xs, alignItems: 'center' }}>
          <StreakBadge value={streak} />
          <AppText style={{ color: colors.textSecondary, fontSize: 12 }}>Дней подряд</AppText>
        </View>
      </Card>
      <PrimaryButton label="ПРОДОЛЖИТЬ ПУТЬ" onPress={() => router.dismissTo('/')} />
      <SecondaryButton label="ПОВТОРИТЬ ОШИБКИ · СКОРО" disabled onPress={() => {}} />
      <AppText style={styles.muted}>Вы можете повторить весь урок с его страницы.</AppText>
    </AppScreen>
  );
}
