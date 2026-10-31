import { useEffect, type PropsWithChildren } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type TextProps,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Flame, Sparkles, Check, Circle, ChevronRight, X } from 'lucide-react-native';
import { colors, motion, radius, spacing, typography, shadows } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Mascot } from '../artwork/Mascot';
import { tapFeedback } from '../lib/haptics';
export function AppText({ style, ...props }: TextProps) {
  return <Text {...props} style={[styles.text, style]} />;
}
export function AppScreen({ children, scroll = true }: PropsWithChildren<{ scroll?: boolean }>) {
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right', 'bottom']}>
      {scroll ? (
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.content, styles.fill]}>{children}</View>
      )}
    </SafeAreaView>
  );
}
type ButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  secondary?: boolean;
  accessibilityLabel?: string;
};
export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  secondary = false,
  accessibilityLabel,
}: ButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={() => {
          tapFeedback();
          onPress();
        }}
        onPressIn={() => {
          scale.set(withTiming(0.98, { duration: motion.fast }));
        }}
        onPressOut={() => {
          scale.set(withTiming(1, { duration: motion.fast }));
        }}
        style={[
          styles.button,
          secondary ? styles.secondary : styles.primary,
          disabled && styles.disabled,
        ]}
      >
        {!secondary && (
          <LinearGradient
            pointerEvents="none"
            colors={[colors.primaryGoldStrong, colors.primaryGold]}
            style={[StyleSheet.absoluteFill, { borderRadius: radius.lg }]}
          />
        )}
        <AppText
          style={[styles.buttonText, { color: secondary ? colors.textPrimary : colors.background }]}
        >
          {label}
        </AppText>
        {!secondary && <ChevronRight size={20} color={colors.background} />}
      </Pressable>
    </Animated.View>
  );
}
export function SecondaryButton(props: Omit<ButtonProps, 'secondary'>) {
  return <PrimaryButton {...props} secondary />;
}
export function IconButton({
  label,
  onPress,
  children,
}: PropsWithChildren<{ label: string; onPress: () => void }>) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
    >
      {children}
    </Pressable>
  );
}
export function Card({ children, style }: PropsWithChildren<{ style?: ViewStyle }>) {
  return <View style={[styles.card, style]}>{children}</View>;
}
export function ProgressBar({ value }: { value: number }) {
  const width = useSharedValue(value);
  useEffect(() => {
    width.set(withTiming(Math.max(0, Math.min(1, value)), { duration: motion.normal }));
  }, [value, width]);
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value * 100}%` as `${number}%`,
  }));
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(value * 100) }}
      style={styles.progress}
    >
      <Animated.View style={[styles.progressFill, animatedStyle]} />
    </View>
  );
}
export type OptionState = 'default' | 'selected' | 'correct' | 'incorrect';
export function ExerciseOption({
  label,
  onPress,
  state = 'default',
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  state?: OptionState;
  disabled?: boolean;
}) {
  const accent =
    state === 'correct'
      ? colors.success
      : state === 'incorrect'
        ? colors.error
        : state === 'selected'
          ? colors.primaryGold
          : colors.border;
  const selectionScale = useSharedValue(1);
  useEffect(() => {
    selectionScale.set(withTiming(state === 'default' ? 1 : 0.99, { duration: motion.fast }));
  }, [state, selectionScale]);
  const selectionStyle = useAnimatedStyle(() => ({ transform: [{ scale: selectionScale.value }] }));
  return (
    <Animated.View style={selectionStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: state !== 'default', disabled }}
        disabled={disabled}
        onPress={() => {
          tapFeedback();
          onPress();
        }}
        style={({ pressed }) => [
          styles.option,
          {
            borderColor: accent,
            backgroundColor:
              state === 'correct'
                ? colors.successTint
                : state === 'incorrect'
                  ? colors.errorTint
                  : state === 'selected'
                    ? colors.goldTint
                    : colors.backgroundElevated,
          },
          state === 'selected' && shadows.gold,
          pressed && styles.pressed,
        ]}
      >
        {state === 'default' ? (
          <Circle size={20} color={colors.textMuted} />
        ) : (
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: radius.full,
              backgroundColor: accent,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {state === 'incorrect' ? (
              <X size={15} color={colors.background} />
            ) : (
              <Check size={15} color={colors.background} />
            )}
          </View>
        )}
        <AppText style={{ flex: 1, fontWeight: '600', color: colors.textPrimary }}>{label}</AppText>
      </Pressable>
    </Animated.View>
  );
}
export function FeedbackCard({
  correct,
  explanation,
  reference,
}: {
  correct: boolean;
  explanation?: string;
  reference?: string;
}) {
  return (
    <Card
      style={{
        borderColor: correct ? colors.success : colors.error,
        backgroundColor: correct ? colors.successTint : colors.errorTint,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
        <Mascot state={correct ? 'correct' : 'wrong'} size={58} />
        <AppText
          accessibilityRole="alert"
          style={{
            color: correct ? colors.success : colors.error,
            fontWeight: '700',
            fontSize: typography.title,
          }}
        >
          {correct ? '✓ Верно!' : 'Попробуем ещё раз'}
        </AppText>
      </View>
      <AppText>{explanation ?? 'Обратите внимание на детали истории.'}</AppText>
      {reference && <AppText style={styles.muted}>{reference}</AppText>}
    </Card>
  );
}
export function XPBadge({ value }: { value: number }) {
  return (
    <View style={styles.badge}>
      <Sparkles size={16} color={colors.primaryGold} />
      <AppText style={styles.badgeText}>{value} XP</AppText>
    </View>
  );
}
export function StreakBadge({ value }: { value: number }) {
  return (
    <View style={styles.badge}>
      <Flame size={16} color={colors.primaryGold} />
      <AppText style={styles.badgeText}>{value}</AppText>
    </View>
  );
}
export function SectionHeader({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return (
    <View style={{ gap: spacing.sm }}>
      {eyebrow && <AppText style={styles.eyebrow}>{eyebrow}</AppText>}
      <AppText accessibilityRole="header" style={styles.heading}>
        {title}
      </AppText>
    </View>
  );
}
export function LoadingState() {
  return (
    <AppScreen>
      <ActivityIndicator color={colors.primaryGold} />
      <AppText>Загружаем ваш путь…</AppText>
    </AppScreen>
  );
}
export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card>
      <SectionHeader title={title} eyebrow="ВПЕРЕДИ ЕЩЁ МНОГО ОТКРЫТИЙ" />
      <AppText style={styles.muted}>{description}</AppText>
    </Card>
  );
}
export const styles = StyleSheet.create({
  text: { color: colors.textPrimary, fontSize: typography.body, lineHeight: 24 },
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    maxWidth: 430,
    alignSelf: 'center',
  },
  content: { padding: spacing.xl, gap: spacing.xl, flexGrow: 1 },
  fill: { flex: 1 },
  heading: { fontSize: typography.heading, lineHeight: 36, fontWeight: '700', letterSpacing: -0.7 },
  eyebrow: {
    fontSize: typography.small,
    color: colors.primaryGold,
    letterSpacing: 2,
    fontWeight: '700',
  },
  muted: { color: colors.textSecondary },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: radius.xxl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  button: {
    minHeight: 56,
    padding: spacing.lg,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
  },
  primary: { backgroundColor: colors.primaryGold, borderColor: colors.primaryGold },
  secondary: { backgroundColor: colors.surface, borderColor: colors.border },
  buttonText: { fontWeight: '700', fontSize: 14, letterSpacing: 0.8 },
  disabled: { opacity: 0.45 },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.75 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
  },
  badgeText: { fontSize: typography.small, fontWeight: '700', color: colors.primaryGold },
  progress: {
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceElevated,
    overflow: 'hidden',
    flex: 1,
  },
  progressFill: { height: '100%', backgroundColor: colors.primaryGold, borderRadius: radius.full },
  option: {
    minHeight: 56,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
});
