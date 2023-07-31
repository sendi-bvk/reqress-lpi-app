import { StackNavigationOptions, TransitionPresets } from '@react-navigation/stack'

export const options: StackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
}
