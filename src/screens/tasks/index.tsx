import { View } from 'react-native';
import { router } from 'expo-router';
import { BookOpen, Check, Flame, Quote } from 'lucide-react-native';
import {
  AppScreen,
  AppText,
  Card,
  PrimaryButton,
  ProgressBar,
  SectionHeader,
  styles,
} from '../../shared/ui';
import { colors, radius, spacing } from '../../shared/theme';
import { useProgress } from '../../features/learning-progress/store';
import { abrahamLesson } from '../../content/lessons/abraham';
import { ModuleArtwork } from '../../widgets/mascot';
export function TasksScreen() {
  const progress = useProgress((s) => s.lessonProgress[abrahamLesson.id]);
  const streak = useProgress((s) => s.streak);
  const finished = Boolean(progress?.completed);
  const answered = progress?.answeredQuestions ?? 0;
  return (
    <AppScreen>
      <SectionHeader eyebrow="МАЛЕНЬКИЕ ШАГИ. БОЛЬШОЙ СМЫСЛ." title="Сегодня на пути" />
      <Card>
        <AppText style={styles.eyebrow}>ТЕКУЩИЙ МОДУЛЬ</AppText>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.lg }}>
          <ModuleArtwork module="abraham" />
          <View style={{ flex: 1 }}>
            <AppText style={{ fontSize: 24, fontWeight: '700' }}>Авраам</AppText>
            <AppText style={styles.muted}>Вера и обещание</AppText>
          </View>
        </View>
        <View style={{ height: 8 }}>
          <ProgressBar
            value={finished ? 1 : (progress?.currentStepIndex ?? 0) / abrahamLesson.steps.length}
          />
        </View>
        <PrimaryButton
          label={finished ? 'ПОВТОРИТЬ ИСТОРИЮ' : 'К УРОКУ'}
          onPress={() =>
            router.push({ pathname: '/lesson/[lessonId]', params: { lessonId: abrahamLesson.id } })
          }
        />
      </Card>
      <View style={{ gap: spacing.md }}>
        <AppText style={{ fontSize: 22, fontWeight: '700' }}>Практика в уроке</AppText>
        {[
          {
            title: 'Пройдите историю',
            detail: finished ? 'Урок завершён' : '6 минут · 50 XP за первое прохождение',
            done: finished,
          },
          {
            title: 'Ответьте на 3 вопроса',
            detail: `${Math.min(answered, 3)} / 3 в текущем прохождении`,
            done: answered >= 3,
          },
        ].map((task) => (
          <Card
            key={task.title}
            style={{ flexDirection: 'row', alignItems: 'center', padding: spacing.lg }}
          >
            <BookOpen color={colors.primaryGold} size={24} />
            <View style={{ flex: 1 }}>
              <AppText style={{ fontWeight: '600' }}>{task.title}</AppText>
              <AppText style={{ fontSize: 12, color: colors.textSecondary }}>{task.detail}</AppText>
            </View>
            {task.done && <Check color={colors.primaryGold} size={20} />}
          </Card>
        ))}
      </View>
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
          <Flame size={32} color={colors.primaryGold} />
          <View style={{ flex: 1 }}>
            <AppText style={{ fontWeight: '700' }}>Возвращайтесь к истории</AppText>
            <AppText style={styles.muted}>Ваша серия: {streak}</AppText>
          </View>
        </View>
        <AppText style={{ fontSize: 12, color: colors.textSecondary }}>
          Завершайте урок каждый день, чтобы продолжить серию.
        </AppText>
      </Card>
      <Card style={{ borderColor: colors.goldBorder, borderRadius: radius.hero }}>
        <Quote color={colors.primaryGold} size={28} />
        <AppText style={styles.eyebrow}>СЛОВО НА СЕГОДНЯ</AppText>
        <AppText>«Слово Твоё — светильник ноге моей и свет стезе моей».</AppText>
        <AppText style={{ color: colors.secondaryBlue, fontSize: 12 }}>Псалом 118:105</AppText>
      </Card>
    </AppScreen>
  );
}
