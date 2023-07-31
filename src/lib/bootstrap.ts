import {
  useFonts as useRoboto,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import * as ExpoSplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'

import { delay } from '@lib/delay'
import { useMinimalLoadTime } from '@lib/minLoadTime'
import { useHydrateSession } from '@lib/session'

const logger = console

const isLoggingEnabled = false

export const useBootstrap = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [process, setProcess] = useState<string[]>([])

  const load = useCallback(
    (success: boolean, name: string) => {
      if (success && !process.includes(name)) {
        setProcess((prev) => prev.concat([name]))
        let log = `${name} loaded`
        if (name === 'start') log = 'initializing'
        if (name === 'end') log = 'all done'

        if (isLoggingEnabled) logger.log({ log })
      }
    },
    [process, setProcess]
  )

  const start = useCallback(async () => {
    await ExpoSplashScreen.hideAsync()
    load(true, 'start')
  }, [load])

  const [roboto] = useRoboto({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  })

  const session = useHydrateSession()

  const minLoadTime = useMinimalLoadTime(1000)

  useEffect(() => {
    if (process.includes('start')) {
      load(roboto, 'roboto')
      load(session, 'session')
      load(minLoadTime, 'min load time')
      load(process.length === 4, 'end')

      if (process.includes('end')) {
        delay(500)
          .then(() => setIsLoading(false))
          .catch(() => {})
      }
    }
  }, [roboto, process, session, load, minLoadTime])

  return { isLoading, start }
}
