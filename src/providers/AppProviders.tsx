import { SoundProvider } from './SoundProvider';
import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useProgress } from '../features/learning-progress/store';
import { AppText, LoadingState } from '../shared/ui';
import { colors, spacing } from '../shared/theme';
export function AppProviders({ children }: PropsWithChildren) {
  const hydrated = useProgress((s) => s.hydrated);
  const error = useProgress((s) => s.storageError);
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {hydrated ? (
          <>
            {error && (
              <AppText
                accessibilityRole="alert"
                style={{ padding: spacing.md, color: colors.warning }}
              >
                Не удалось сохранить или восстановить прогресс. Проверьте доступное место и
                настройки хранения.
              </AppText>
            )}
            <SoundProvider>{children}</SoundProvider>
          </>
        ) : (
          <LoadingState />
        )}
      </View>
    </SafeAreaProvider>
  );
}
