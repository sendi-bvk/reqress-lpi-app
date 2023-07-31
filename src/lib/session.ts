import { useQueryClient } from '@tanstack/react-query'
import { useState, useEffect, useCallback } from 'react'
import { create, StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { secureStorage } from '@lib/storage'

type States = {
  accessToken: string | null
  isFromRegister: boolean
  isFirstLogIn: boolean
  isFirstLogOut: boolean
}

export const initialStates: States = {
  accessToken: null,
  isFromRegister: false,
  isFirstLogIn: false,
  isFirstLogOut: false,
}

type Actions = {
  loggingIn: (token: string) => void
  loggingOut: () => void
}

type SessionStore = States & Actions

export type SessionStoreInitializer = StateCreator<
  SessionStore,
  [['zustand/persist', unknown], ['zustand/immer', never]]
>

const sessionStore: SessionStoreInitializer = (set) => {
  return {
    ...initialStates,
    saveAccessToken: (value: string | null) => {
      set({ accessToken: value })
    },
    loggingIn: (value: string) => {
      set({ accessToken: value })
    },
    loggingOut: () => {
      set({ accessToken: null })
    },
  }
}

export const useSessionStore = create<SessionStore>()(
  persist(immer(sessionStore), {
    name: 'session-storage',
    storage: createJSONStorage(() => secureStorage),
  })
)

export const useHydrateSession = () => {
  const [hydrated, setHydrated] = useState(useSessionStore.persist.hasHydrated)

  useEffect(() => {
    const unsubHydrate = useSessionStore.persist.onHydrate(() => setHydrated(false))
    const unsubFinishHydration = useSessionStore.persist.onFinishHydration(() => setHydrated(true))

    setHydrated(useSessionStore.persist.hasHydrated())

    return () => {
      unsubHydrate()
      unsubFinishHydration()
    }
  }, [])

  return hydrated
}

export const useLogOut = () => {
  const loggingOut = useSessionStore((state) => state.loggingOut)
  const client = useQueryClient()
  return useCallback(() => {
    client.clear()
    loggingOut()
  }, [loggingOut, client])
}
