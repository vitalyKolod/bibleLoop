import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
export function tapFeedback() {
  if (Platform.OS !== 'web') void Haptics.selectionAsync().catch(() => {});
}
export function answerFeedback(correct: boolean) {
  if (Platform.OS !== 'web')
    void Haptics.notificationAsync(
      correct ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error,
    ).catch(() => {});
}
