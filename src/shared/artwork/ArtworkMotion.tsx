import { useCallback, type PropsWithChildren } from 'react';
import { AppState } from 'react-native';
import { useFocusEffect } from 'expo-router';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
export function ArtworkMotion({ children, state }: PropsWithChildren<{ state: string }>) {
  const reduced = useReducedMotion();
  const y = useSharedValue(0);
  const angle = useSharedValue(0);
  useFocusEffect(
    useCallback(() => {
      const stop = () => {
        cancelAnimation(y);
        cancelAnimation(angle);
        y.set(0);
        angle.set(0);
      };
      const start = () => {
        stop();
        if (reduced) return;
        if (state === 'correct' || state === 'celebrate') {
          y.set(withSequence(withTiming(-7, { duration: 200 }), withTiming(0, { duration: 320 })));
          angle.set(
            withSequence(
              withTiming(-3, { duration: 180 }),
              withTiming(2, { duration: 200 }),
              withTiming(0, { duration: 220 }),
            ),
          );
        } else if (state === 'wrong') {
          angle.set(
            withSequence(
              withTiming(-2, { duration: 100 }),
              withTiming(2, { duration: 140 }),
              withTiming(0, { duration: 160 }),
            ),
          );
        } else {
          // Three slow cycles, then rest. No continuous motion during reading.
          y.set(
            withRepeat(
              withSequence(
                withTiming(-3, { duration: 1800, easing: Easing.inOut(Easing.sin) }),
                withTiming(0, { duration: 1800, easing: Easing.inOut(Easing.sin) }),
              ),
              3,
            ),
          );
        }
      };
      if (AppState.currentState === 'active') start();
      const listener = AppState.addEventListener('change', (value) => {
        if (value === 'active') start();
        else stop();
      });
      return () => {
        listener.remove();
        stop();
      };
    }, [state, reduced, y, angle]),
  );
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }, { rotate: `${angle.value}deg` }],
  }));
  return (
    <Animated.View style={[{ width: '100%', height: '100%' }, style]}>{children}</Animated.View>
  );
}
