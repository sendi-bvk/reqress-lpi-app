import { StackNavigationOptions, TransitionPresets } from '@react-navigation/stack'

import { HeaderButton } from '@components/HeaderButton'

export const options: StackNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  title: 'Tambah Pengguna',
  headerRight: HeaderButton,
}
