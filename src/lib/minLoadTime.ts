import { useState, useEffect } from 'react'

import { delay } from '@lib/delay'

export const useMinimalLoadTime = (ms = 600) => {
  const [minLoad, setMinLoad] = useState(false)

  useEffect(() => {
    if (minLoad === false) {
      ;(async () => {
        await delay(ms)
        setMinLoad(true)
      })()
    }
  }, [minLoad, ms])

  return minLoad
}
