import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { QueryClientProvider } from '@tanstack/react-query'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { LogBox, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'

import { Snackbars } from '@components/Snackbars'
import { Splash } from '@components/Splash'
import { queryClient } from '@lib/queryClient'
import RootStack from '@stacks/Root'
import { colors } from '@themes/colors'

const theme = {
  ...DefaultTheme,
  colors,
}

SplashScreen.preventAutoHideAsync()
  .then((result) => result)
  .catch(() => null)

export const App = () => {
  const navigationRef = useNavigationContainerRef()

  useEffect(() => {
    LogBox.ignoreLogs(['AxiosError', 'VirtualizedLists'])
  }, [])

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={styles.gestureHandlerRootView}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer ref={navigationRef}>
            <Splash>
              <PaperProvider theme={theme}>
                <Snackbars>
                  <RootStack />
                </Snackbars>
              </PaperProvider>
            </Splash>
          </NavigationContainer>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  gestureHandlerRootView: { display: 'flex', flex: 1 },
})
