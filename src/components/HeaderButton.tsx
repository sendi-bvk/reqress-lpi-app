import FontAwesome from '@expo/vector-icons/FontAwesome'
import { StackNavigationOptions } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'

import { useLogOut } from '@lib/session'
import { colors } from '@themes/colors'

const icon = () => <FontAwesome color={colors.white_100} size={18} name="power-off" />

export const HeaderButton: StackNavigationOptions['headerRight'] = () => {
  const loggingOut = useLogOut()
  return <IconButton mode="contained" icon={icon} onPress={loggingOut} style={styles.button} />
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    marginRight: 12,
  },
})
