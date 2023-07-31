import { configureFonts } from 'react-native-paper'

export const fontFamily = {
  roboto: {
    light: 'Roboto_300Light',
    regular: 'Roboto_400Regular',
    medium: 'Roboto_500Medium',
    bold: 'Roboto_700Bold',
  },
} as const

export const baseFont = {
  fontFamily: fontFamily.roboto.regular,
} as const

const baseVariants = configureFonts({ config: baseFont })

export const fontConfig = {
  fontFamily: fontFamily.roboto.regular,
} as const

export const fonts = configureFonts({
  config: {
    ...baseVariants,
  },
})
