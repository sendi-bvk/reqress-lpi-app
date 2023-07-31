import { create, StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { secureStorage } from '@lib/storage'

type States = {
  isSplashScreenVisible: boolean
}

export const initialStates: States = {
  isSplashScreenVisible: true,
}

type Actions = {
  setIsSplashScreenVisible: (value: boolean) => void
}

type UiStore = States & Actions

export type UiStoreInitializer = StateCreator<
  UiStore,
  [['zustand/persist', unknown], ['zustand/immer', never]]
>

const uiStore: UiStoreInitializer = (set) => {
  return {
    ...initialStates,
    setIsSplashScreenVisible: (value) => set({ isSplashScreenVisible: value }),
  }
}

export const useUiStore = create<UiStore>()(
  persist(immer(uiStore), {
    name: 'ui-storage',
    storage: createJSONStorage(() => secureStorage),
  })
)
