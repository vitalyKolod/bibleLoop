import { Pressable, View } from 'react-native';
import { ChevronRight, Check, Lock } from 'lucide-react-native';
import type { CourseModule } from '../../entities/course/types';
import { AppText, ProgressBar } from '../../shared/ui';
import { colors, radius, spacing, shadows } from '../../shared/theme';
import { tapFeedback } from '../../shared/lib/haptics';
import { ModuleArtwork } from '../mascot';
export function LessonCard({
  module,
  onPress,
  completed,
  progress = 0,
}: {
  module: CourseModule;
  onPress: () => void;
  completed: boolean;
  progress?: number;
}) {
  const locked = module.status === 'locked';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${module.title}. ${locked ? 'Скоро' : completed ? 'Пройдено. Повторить' : 'Открыть урок'}`}
      accessibilityState={{ disabled: locked }}
      disabled={locked}
      onPress={() => {
        tapFeedback();
        onPress();
      }}
      style={({ pressed }) => [
        {
          marginLeft:
            module.id === 'abraham' || module.id === 'david' || module.id === 'acts'
              ? spacing.xl
              : 0,
          borderWidth: 1,
          borderColor: locked ? colors.border : colors.primaryGold,
          borderRadius: radius.xxl,
          padding: spacing.md,
          backgroundColor: locked ? colors.backgroundElevated : colors.goldTint,
          gap: spacing.md,
          flexDirection: 'row',
          alignItems: 'center',
          ...(locked ? {} : shadows.gold),
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <ModuleArtwork module={module.id} muted={locked} />
      <View style={{ flex: 1, gap: spacing.xs }}>
        <AppText style={{ fontSize: 19, fontWeight: '700' }}>{module.title}</AppText>
        <AppText style={{ color: colors.textSecondary, fontSize: 12, lineHeight: 18 }}>
          {module.subtitle}
        </AppText>
        <AppText
          style={{
            color: locked ? colors.textMuted : colors.primaryGold,
            fontSize: 10,
            lineHeight: 16,
            letterSpacing: 1,
          }}
        >
          {locked ? 'ВПЕРЕДИ · СКОРО' : completed ? 'ПРОЙДЕНО · ПОВТОРИТЬ' : 'ВАШ СЛЕДУЮЩИЙ ШАГ'}
        </AppText>
        {!locked && (
          <View style={{ height: 4, marginTop: spacing.xs }}>
            <ProgressBar value={completed ? 1 : progress} />
          </View>
        )}
      </View>
      {locked ? (
        <Lock size={16} color={colors.textMuted} />
      ) : completed ? (
        <Check size={20} color={colors.primaryGold} />
      ) : (
        <ChevronRight size={20} color={colors.primaryGold} />
      )}
    </Pressable>
  );
}
