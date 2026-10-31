import { useId, type PropsWithChildren } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Rect,
  Circle,
  Path,
  G,
} from 'react-native-svg';
import { Image } from 'expo-image';
import { ArtworkMotion } from './ArtworkMotion';
import { abrahamAssets } from './assets';
import { colors, radius } from '../theme';
export { Mascot } from './Mascot';
export type CharacterId = 'abraham' | 'moses' | 'david' | 'jesus' | 'paul';
export type CharacterState = keyof typeof abrahamAssets;
// Asset replacement boundary: screens use semantic names, never filenames.
function Scene({
  module = 'abraham',
  character = false,
  muted = false,
}: {
  module?: string;
  character?: boolean;
  muted?: boolean;
}) {
  const id = useId().replace(/:/g, '');
  const gold = muted ? colors.textMuted : colors.primaryGold;
  return (
    <Svg width="100%" height="100%" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={colors.backgroundElevated} />
          <Stop offset="1" stopColor={muted ? colors.surface : colors.artworkDusk} />
        </LinearGradient>
        <RadialGradient id={`${id}light`}>
          <Stop offset="0" stopColor={gold} stopOpacity="0.28" />
          <Stop offset="1" stopColor={gold} stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Rect width="320" height="200" fill={`url(#${id}sky)`} />
      <Circle cx="200" cy="105" r="105" fill={`url(#${id}light)`} />
      {[
        [28, 32],
        [67, 61],
        [112, 24],
        [164, 47],
        [232, 28],
        [281, 62],
        [301, 19],
      ].map(([x, y], i) => (
        <Circle
          key={i}
          cx={x}
          cy={y}
          r={i % 2 ? 1 : 1.8}
          fill={colors.artworkIvory}
          opacity="0.6"
        />
      ))}
      <Path
        d="M0 148 L45 106 L86 138 L145 94 L211 147 L271 112 L320 144 V200 H0Z"
        fill={colors.surfaceElevated}
      />
      <Path d="M0 175 Q85 136 162 173 Q245 136 320 161 V200 H0Z" fill={colors.backgroundElevated} />
      <Path
        d="M166 200 Q240 169 186 158"
        stroke={gold}
        strokeWidth="2"
        opacity="0.25"
        fill="none"
      />
      {module === 'abraham' && !character && (
        <G>
          <Path d="M103 164 L166 84 L228 164Z" fill={colors.artworkGold} />
          <Path d="M166 84 L154 164 H184Z" fill={colors.artworkIvory} />
          <Path d="M166 84 L228 164 H185Z" fill={colors.artworkBrown} />
          <Path d="M95 166 H236" stroke={gold} strokeWidth="2" />
        </G>
      )}
      {module === 'creation' && (
        <G>
          <Circle cx="171" cy="105" r="48" fill={colors.secondaryBlue} opacity="0.5" />

          <Path
            d="M137 78 L158 73 L178 87 L166 107 L181 128 L162 146 L143 124 L150 103 L129 96Z"
            fill={colors.artworkIvory}
            opacity="0.55"
          />
          <Path d="M117 125 Q160 155 210 92" stroke={gold} strokeWidth="2" fill="none" />
        </G>
      )}
      {module === 'exodus' && (
        <G>
          <Path
            d="M75 166 Q126 148 127 87 Q153 118 143 156 M245 166 Q194 148 193 87 Q167 118 177 156"
            fill={colors.secondaryBlue}
            opacity="0.65"
          />
          <Path
            d="M83 161 Q137 142 127 87 M237 161 Q183 142 193 87"
            stroke={colors.artworkIvory}
            strokeWidth="3"
            fill="none"
          />
        </G>
      )}
      {module === 'david' && (
        <G>
          <Path d="M121 101 L134 142 H189 L201 101 L179 119 L161 90 L143 119Z" fill={gold} />
          <Path d="M133 150 H189" stroke={gold} strokeWidth="4" />
        </G>
      )}
      {module === 'jesus' && (
        <Path d="M167 79 V158 M140 106 H194" stroke={gold} strokeWidth="10" strokeLinecap="round" />
      )}
      {module === 'acts' && (
        <G fill={gold} opacity="0.8">
          <Rect x="112" y="125" width="96" height="40" />
          <Rect x="127" y="103" width="23" height="62" />
          <Rect x="172" y="95" width="23" height="70" />
          <Path d="M169 95 Q184 72 198 95Z" />
          <Path d="M124 103 L138 82 L153 103Z" />
        </G>
      )}
      {character && (
        <G>
          <EllipsePlaceholder />
          <Path
            d="M213 98 Q189 113 182 179 H244 Q238 128 225 99Z"
            fill={colors.artworkBrown}
            stroke={gold}
            strokeWidth="1"
          />
          <Path d="M206 105 L198 176 H227 L220 108Z" fill={colors.artworkGold} />
          <Circle cx="214" cy="80" r="17" fill={colors.artworkIvory} />
          <Path
            d="M194 90 Q189 53 217 56 Q240 62 235 110 L222 98 L214 66Z"
            fill={colors.artworkIvory}
          />
          <Path
            d="M251 178 V109 Q251 96 260 99"
            stroke={gold}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d="M230 121 L251 132"
            stroke={colors.artworkGold}
            strokeWidth="11"
            strokeLinecap="round"
          />
        </G>
      )}
    </Svg>
  );
}
function EllipsePlaceholder() {
  return <Circle cx="214" cy="178" r="31" fill={colors.background} opacity="0.3" />;
}
export function ModuleArtwork({
  module,
  large = false,
  muted = false,
}: {
  module: string;
  large?: boolean;
  muted?: boolean;
}) {
  return (
    <View
      accessibilityLabel={`Иллюстрация: ${module}`}
      style={[
        art.module,
        large && art.story,
        { borderColor: muted ? colors.border : colors.borderGold },
      ]}
    >
      <Scene module={module} muted={muted} />
    </View>
  );
}
export function CharacterArtwork({
  character,
  state = 'idle',
}: {
  character: CharacterId;
  state?: CharacterState;
}) {
  return (
    <View accessibilityLabel={`${character}: ${state}`} style={art.story}>
      {character === 'abraham' ? (
        <>
          <Scene module="atmosphere" />
          <View style={art.character}>
            <ArtworkMotion state={state}>
              <Image
                source={abrahamAssets[state]}
                style={{ width: '100%', height: '100%' }}
                contentFit="contain"
                contentPosition="bottom center"
                transition={160}
                accessible={false}
              />
            </ArtworkMotion>
          </View>
        </>
      ) : (
        <Scene character module={character} />
      )}
      <View
        pointerEvents="none"
        style={{ position: 'absolute', left: 20, top: 34, width: 150, gap: 8 }}
      >
        <Text style={{ color: colors.primaryGold, fontSize: 10, letterSpacing: 2 }}>
          ИСТОРИЯ ДОВЕРИЯ
        </Text>
        <Text
          style={{ color: colors.textPrimary, fontSize: 24, lineHeight: 29, fontWeight: '700' }}
        >
          Под небом обещаний
        </Text>
        <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Ханаан · Бытие 12–17</Text>
      </View>
    </View>
  );
}
export function StoryArtwork() {
  return <CharacterArtwork character="abraham" state="speaking" />;
}
export function AtmosphericBackground({ children }: PropsWithChildren) {
  return (
    <View style={art.atmosphere}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <Scene module="atmosphere" />
      </View>
      {children}
    </View>
  );
}
const art = StyleSheet.create({
  module: { width: 78, height: 78, borderRadius: radius.full, borderWidth: 1, overflow: 'hidden' },
  story: {
    width: '100%',
    height: 190,
    borderRadius: radius.hero,
    borderWidth: 1,
    borderColor: colors.borderGold,
    overflow: 'hidden',
  },
  character: { position: 'absolute', right: 0, top: 4, bottom: 0, width: '52%' },
  atmosphere: { overflow: 'hidden', borderRadius: radius.hero },
});
