import { View } from 'react-native';
import { X } from 'lucide-react-native';
import { AppText, IconButton, ProgressBar } from '../../shared/ui';
import { colors, spacing } from '../../shared/theme';
export function LessonHeader({
  index,
  count,
  onExit,
}: {
  index: number;
  count: number;
  onExit: () => void;
}) {
  return (
    <View style={{ gap: spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.lg }}>
        <IconButton label="Выйти из урока. Прогресс сохранится" onPress={onExit}>
          <X color={colors.textSecondary} size={22} />
        </IconButton>
        <ProgressBar value={index / count} />
      </View>
      <AppText style={{ color: colors.textSecondary, fontSize: 12, textAlign: 'right' }}>
        ШАГ {index + 1} / {count}
      </AppText>
    </View>
  );
}
