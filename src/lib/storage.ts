import * as SecureStore from 'expo-secure-store'
import { StateStorage } from 'zustand/middleware'

export const secureStorage: StateStorage = {
  setItem: async (name, value) => SecureStore.setItemAsync(name, value),
  getItem: async (name) => (await SecureStore.getItemAsync(name)) || null,
  removeItem: async (name) => SecureStore.deleteItemAsync(name),
}
