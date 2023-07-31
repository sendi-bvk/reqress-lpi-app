import { create, StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type Data = {
  title: string
  type?: 'info' | 'error' | 'success'
  duration?: number
  actionTitle?: string
  actionHandler?: any
}

type States = {
  visible: boolean
  data?: Data
}

export const initialState: States = {
  visible: false,
  data: undefined,
}

type Actions = {
  show: (data?: Data) => void
  hide: () => void
  reset: () => void
}

export type SnackbarStore = States & Actions

export type StoreInitializer = StateCreator<SnackbarStore, [['zustand/immer', never]]>

const snackbarStore: StoreInitializer = (set) => {
  return {
    ...initialState,
    show: (data) => {
      set({ visible: true, data })
    },
    hide: () => {
      set({ visible: false })
    },
    reset: () => {
      set(initialState)
    },
  }
}

export const useSnackbarStore = create<SnackbarStore>()(immer(snackbarStore))
