import { getDefaultConfig } from 'expo/metro-config'

const config = getDefaultConfig(__dirname)
module.exports = {
  ...config,
  transformer: {
    ...config.transformer,
    minifierPath: require.resolve('metro-minify-terser'),
    minifierConfig: {},
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    sourceExts: [...(config?.resolver?.sourceExts || []), 'svg', 'mjs', 'json'],
  },
}
