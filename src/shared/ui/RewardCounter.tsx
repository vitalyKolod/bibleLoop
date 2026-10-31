import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { colors } from '../theme';
export function RewardCounter({ value }: { value: number }) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? value : 0);
  useEffect(() => {
    if (reduced) return;
    let tick = 0;
    const timer = setInterval(() => {
      tick += 1;
      setShown(Math.round(value * Math.min(tick / 16, 1)));
      if (tick >= 16) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [value, reduced]);
  return (
    <Text
      accessibilityLabel={`Награда: ${value} XP`}
      style={{ fontSize: 48, lineHeight: 56, fontWeight: '800', color: colors.primaryGold }}
    >
      +{reduced ? value : shown} XP
    </Text>
  );
}
