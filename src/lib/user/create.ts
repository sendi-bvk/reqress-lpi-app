import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { api } from '@lib/api'
import { useSnackbarStore } from '@lib/snackbar'

export type CreateUserParams = {
  name: string
  job: string
}

export type CreateUserResponse = {
  name: string
  job: string
  id: string
  createdAt: string
}

export const useCreateUser = () => {
  const show = useSnackbarStore((state) => state.show)

  return useMutation({
    mutationFn: async (params: CreateUserParams) => {
      const result = await api.post<CreateUserParams, AxiosResponse<CreateUserResponse>>(
        'users?delay=3',
        params
      )
      return result
    },
    retry: false,
    onSuccess: (_data, variables) => {
      show({
        title: `${variables.name} Berhasil di tambahkan`,
        type: 'success',
        actionTitle: 'OK',
      })
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
