import { ExpoConfig } from 'expo/config'

const config: ExpoConfig = {
  name: 'reqress-lpi-app',
  slug: 'reqress-lpi-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    resizeMode: 'contain',
    backgroundColor: '#0C517A',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'app.lpi.reqres',
  },
  android: {
    package: 'app.lpi.reqres',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  experiments: {
    tsconfigPaths: true,
  },
  extra: {
    eas: {
      projectId: 'ad6ee5d0-b194-4e38-98d7-ee9f07e3b4af',
    },
  },
  owner: 'esdebe',
}

export default config
