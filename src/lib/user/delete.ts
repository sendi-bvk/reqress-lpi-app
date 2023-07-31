import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { api } from '@lib/api'
import { useSnackbarStore } from '@lib/snackbar'

export type DeleteUserParams = {
  id: string
}

export type DeleteUserResponse = any

export const useDeleteUser = () => {
  const show = useSnackbarStore((state) => state.show)

  return useMutation({
    mutationFn: async (params: DeleteUserParams) => {
      const result = await api.delete<DeleteUserParams, AxiosResponse<DeleteUserResponse>>(
        `users/${params.id}?delay=3`
      )
      return result
    },
    retry: false,
    onSuccess: () => {},
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
