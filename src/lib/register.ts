import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { api } from '@lib/api'

import { useSessionStore } from './session'
import { useSnackbarStore } from './snackbar'

export type RegisterParams = {
  username: string
  password: string
  email: string
}

export type RegisterResponse = {
  token: string
}

export const useRegister = () => {
  const loggingIn = useSessionStore((state) => state.loggingIn)

  const show = useSnackbarStore((state) => state.show)

  return useMutation({
    mutationFn: async (params: RegisterParams) => {
      const { email, password, username } = params
      const result = await api.post<RegisterParams, AxiosResponse<RegisterResponse>>(
        'register?delay=3',
        {
          email,
          password,
          username,
        }
      )
      return result
    },
    retry: false,
    onSuccess: (result) => {
      loggingIn(result.data.token)
    },
    onError: (e) => {
      const error = e as AxiosError
      if (error?.isAxiosError) {
        const message = (error.response?.data as any)?.error
        show({
          title: message || 'Terjadi Kesalahan',
          type: 'error',
          actionTitle: 'OK',
        })
      }
    },
  })
}
