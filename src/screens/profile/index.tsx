import { View, Switch } from 'react-native';
import { Volume2, VolumeX } from 'lucide-react-native';
import { usePreferences } from '../../features/preferences/store';
import { useProgress } from '../../features/learning-progress/store';
import { useSoundEffects } from '../../providers/SoundProvider';
import {
  AppScreen,
  AppText,
  Card,
  SectionHeader,
  SecondaryButton,
  XPBadge,
  StreakBadge,
  styles,
} from '../../shared/ui';
import { colors, spacing } from '../../shared/theme';
export function ProfileScreen() {
  const enabled = usePreferences((s) => s.soundEnabled);
  const setEnabled = usePreferences((s) => s.setSoundEnabled);
  const xp = useProgress((s) => s.totalXp);
  const streak = useProgress((s) => s.streak);
  const play = useSoundEffects();
  return (
    <AppScreen>
      <SectionHeader eyebrow="ВАШ BIBLELOOP" title="В своём ритме" />
      <View style={{ flexDirection: 'row', gap: spacing.sm }}>
        <XPBadge value={xp} />
        <StreakBadge value={streak} />
      </View>
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
          {enabled ? <Volume2 color={colors.primaryGold} /> : <VolumeX color={colors.textMuted} />}
          <View style={{ flex: 1 }}>
            <AppText style={{ fontWeight: '700' }}>Звуки приложения</AppText>
            <AppText style={{ color: colors.textSecondary, fontSize: 12 }}>
              Ответы и завершение урока
            </AppText>
          </View>
          <Switch
            accessibilityLabel="Звуки приложения"
            value={enabled}
            onValueChange={setEnabled}
            trackColor={{ false: colors.border, true: colors.goldBorder }}
            thumbColor={enabled ? colors.primaryGold : colors.textSecondary}
          />
        </View>
        <SecondaryButton
          label="ПОСЛУШАТЬ ЗВУК"
          disabled={!enabled}
          onPress={() => play('correct')}
        />
        <AppText style={{ color: colors.textMuted, fontSize: 12 }}>
          Звуки учитывают беззвучный режим телефона. Настройка сохраняется на этом устройстве.
        </AppText>
      </Card>
      <AppText style={styles.muted}>
        XP, серия дней и результаты уроков сохраняются на этом устройстве.
      </AppText>
    </AppScreen>
  );
}
