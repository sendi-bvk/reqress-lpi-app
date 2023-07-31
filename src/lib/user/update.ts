import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { api } from '@lib/api'
import { useSnackbarStore } from '@lib/snackbar'

export type UpdateUserParams = {
  id: string
  name: string
  job: string
}

export type UpdateUserResponse = {
  name: string
  job: string
  updatedAt: string
}

export const useUpdateUser = () => {
  const show = useSnackbarStore((state) => state.show)

  return useMutation({
    mutationFn: async (params: UpdateUserParams) => {
      const result = await api.put<UpdateUserParams, AxiosResponse<UpdateUserResponse>>(
        `users/${params.id}?delay=3`,
        params
      )
      return result
    },
    retry: false,
    onSuccess: (_data, variables) => {
      show({
        title: `${variables.name} Berhasil di Ubah`,
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
