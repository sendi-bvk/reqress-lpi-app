/* eslint-disable react-native/no-color-literals */
import React, { PropsWithChildren } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Snackbar, MD3Theme, MD3LightTheme } from 'react-native-paper'

import { useSnackbarStore } from '@lib/snackbar'
import { colors } from '@themes/colors'
import { fontFamily } from '@themes/fonts'

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

const internalStyles = StyleSheet.create({
  error: { backgroundColor: 'orange' },
  info: { backgroundColor: colors.primary },
  snackbar: { borderRadius: 10 },
  success: { backgroundColor: 'green' },
  title: { color: colors.white_100, fontFamily: fontFamily.roboto.light },
})

const theme: DeepPartial<MD3Theme> = {
  ...MD3LightTheme,
}

const Snackbars = ({ children }: PropsWithChildren<unknown>) => {
  const visible = useSnackbarStore((state) => state.visible)
  const hide = useSnackbarStore((state) => state.hide)
  const data = useSnackbarStore((state) => state.data)

  let action: any

  if (data?.actionTitle) {
    action = { label: data.actionTitle }
    if (data?.actionHandler) {
      action.onPress = data?.actionHandler
    }
  }

  return (
    <React.Fragment>
      {children}
      <Snackbar
        theme={theme}
        duration={data?.duration}
        visible={visible}
        onDismiss={hide}
        action={action}
        style={[
          internalStyles.snackbar,
          internalStyles.info,
          data?.type === 'info' && internalStyles.info,
          data?.type === 'error' && internalStyles.error,
          data?.type === 'success' && internalStyles.success,
        ]}
      >
        <Text style={internalStyles.title}>{data?.title}</Text>
      </Snackbar>
    </React.Fragment>
  )
}

export { Snackbars }
