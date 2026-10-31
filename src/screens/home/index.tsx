import { View, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { BookOpen, UserRound, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppScreen, AppText, IconButton, StreakBadge, XPBadge, styles } from '../../shared/ui';
import { branding } from '../../shared/config/branding';
import { colors, radius, spacing } from '../../shared/theme';
import { useProgress } from '../../features/learning-progress/store';
import { LearningPath } from '../../widgets/learning-path';
import { Mascot } from '../../widgets/mascot';
export function HomeScreen() {
  const xp = useProgress((s) => s.totalXp);
  const streak = useProgress((s) => s.streak);
  return (
    <AppScreen>
      <View style={home.header}>
        <View style={home.brand}>
          <BookOpen size={25} color={colors.primaryGold} />
          <AppText style={home.name}>{branding.displayName}</AppText>
        </View>
        <View style={home.stats}>
          <StreakBadge value={streak} />
          <XPBadge value={xp} />
          <IconButton label="Профиль" onPress={() => router.push('/profile')}>
            <UserRound size={18} color={colors.textSecondary} />
          </IconButton>
        </View>
      </View>
      <LinearGradient
        colors={[colors.surfaceElevated, colors.backgroundElevated]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={home.hero}
      >
        <View pointerEvents="none" style={home.glow} />
        <AppText style={home.particles}>✦ · ✧</AppText>
        <AppText style={styles.eyebrow}>ОТКРОЙТЕ БОЛЬШЕ</AppText>
        <View style={home.heroRow}>
          <View style={{ flex: 1 }}>
            <AppText style={home.title}>{'Большая история.\nШаг за шагом.'}</AppText>
            <AppText style={home.subtitle}>
              Откройте смысл знакомых историй и увидьте, как всё связано.
            </AppText>
          </View>
          <View style={home.mascot}>
            <Mascot state="happy" size={116} />
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Продолжить путь Авраама"
          onPress={() =>
            router.push({
              pathname: '/lesson/[lessonId]',
              params: { lessonId: 'abraham-covenant-01' },
            })
          }
          style={home.heroFooter}
        >
          <AppText style={home.invitation}>6 минут — и история станет понятнее.</AppText>
          <ArrowRight size={16} color={colors.primaryGold} />
        </Pressable>
      </LinearGradient>
      <View style={home.section}>
        <View>
          <AppText style={styles.eyebrow}>ВАШ ПУТЬ</AppText>
          <AppText style={home.sectionTitle}>От начала к надежде</AppText>
        </View>
        <AppText style={home.chapter}>6 глав</AppText>
      </View>
      <LearningPath />
      <AppText style={home.note}>
        Каждая история — часть чего-то большего. Новые главы появятся в следующих обновлениях.
      </AppText>
    </AppScreen>
  );
}
const home = StyleSheet.create({
  glow: {
    position: 'absolute',
    right: -30,
    top: 15,
    width: 175,
    height: 175,
    borderRadius: 100,
    backgroundColor: colors.primaryGold,
    opacity: 0.045,
  },
  particles: {
    position: 'absolute',
    right: 22,
    top: 12,
    color: colors.primaryGold,
    opacity: 0.55,
    fontSize: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  name: { fontSize: 20, fontWeight: '800', letterSpacing: -0.8 },
  stats: { flexDirection: 'row', gap: spacing.xs, alignItems: 'center' },
  hero: {
    padding: spacing.xl,
    borderRadius: radius.hero,
    borderWidth: 1,
    borderColor: colors.borderGold,
    overflow: 'hidden',
    gap: spacing.md,
  },
  heroRow: { flexDirection: 'row', alignItems: 'center' },
  mascot: { width: 116, marginRight: -spacing.md },
  title: { fontSize: 27, lineHeight: 31, letterSpacing: -0.8, fontWeight: '800' },
  subtitle: { fontSize: 13, lineHeight: 20, color: colors.textSecondary, marginTop: spacing.md },
  heroFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  invitation: { flex: 1, fontSize: 11, color: colors.primaryGold },
  section: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 22, fontWeight: '700', marginTop: spacing.xs },
  chapter: { color: colors.textMuted, fontSize: 12 },
  note: {
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
    color: colors.textMuted,
    paddingHorizontal: spacing.lg,
  },
});
