import { View } from 'react-native';
import { Image } from 'expo-image';
import { ArtworkMotion } from './ArtworkMotion';
import { mascotAssets } from './assets';
export type MascotState = keyof typeof mascotAssets;
export function Mascot({ state = 'idle', size = 132 }: { state?: MascotState; size?: number }) {
  return (
    <View accessibilityLabel={`Проводник: ${state}`} style={{ width: size, height: size }}>
      <ArtworkMotion state={state}>
        <Image
          source={mascotAssets[state]}
          style={{ width: '100%', height: '100%' }}
          contentFit="contain"
          transition={120}
          accessible={false}
        />
      </ArtworkMotion>
    </View>
  );
}
