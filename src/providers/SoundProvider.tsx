import { createContext, useContext, useEffect, useMemo, type PropsWithChildren } from 'react';
import { AppState } from 'react-native';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { usePreferences } from '../features/preferences/store';
import { createSoundController, type SoundName } from '../shared/audio/controller';
const SoundContext = createContext<(name: SoundName) => void>(() => {});
export const useSoundEffects = () => useContext(SoundContext);
export function SoundProvider({ children }: PropsWithChildren) {
  const correct = useAudioPlayer(require('../../assets/sounds/correct.wav'));
  const incorrect = useAudioPlayer(require('../../assets/sounds/incorrect.wav'));
  const complete = useAudioPlayer(require('../../assets/sounds/complete.wav'));
  const enabled = usePreferences((s) => s.soundEnabled);
  const controller = useMemo(
    () =>
      createSoundController(
        { correct, incorrect, complete },
        () =>
          usePreferences.persist.hasHydrated() &&
          usePreferences.getState().soundEnabled &&
          AppState.currentState === 'active',
      ),
    [correct, incorrect, complete],
  );
  useEffect(() => {
    void setAudioModeAsync({
      playsInSilentMode: false,
      shouldPlayInBackground: false,
      interruptionMode: 'mixWithOthers',
    }).catch(() => {});
    const subscription = AppState.addEventListener('change', (state) => {
      if (state !== 'active') controller.stop();
    });
    return () => {
      subscription.remove();
      controller.stop();
    };
  }, [controller, correct, incorrect, complete]);
  useEffect(() => {
    if (!enabled) controller.stop();
  }, [enabled, controller]);
  return <SoundContext.Provider value={controller.play}>{children}</SoundContext.Provider>;
}
