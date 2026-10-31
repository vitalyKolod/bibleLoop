import type { ExpoConfig } from 'expo/config';
import branding from './src/shared/config/branding.json';
const config: ExpoConfig = {
  name: branding.displayName,
  slug: branding.slug,
  scheme: branding.scheme,
  version: branding.version,
  orientation: 'portrait',
  userInterfaceStyle: 'dark',
  ios: { supportsTablet: false, bundleIdentifier: branding.iosBundleIdentifier },
  android: { package: branding.androidPackage },
  web: { bundler: 'metro', output: 'single' },
  plugins: [
    'expo-router',
    'expo-image',
    'expo-asset',
    [
      'expo-audio',
      { microphonePermission: false, recordAudioAndroid: false, enableBackgroundPlayback: false },
    ],
  ],
};
export default config;
