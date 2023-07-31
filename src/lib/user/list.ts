import { GetNextPageParamFunction, useInfiniteQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { api } from '@lib/api'

interface ListUserResponse {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: User[]
}

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

type ListUserParams = any

export const getNextPageParam: GetNextPageParamFunction<
  unknown,
  AxiosResponse<ListUserResponse, any>
> = (lastPage) => {
  const currentPage = lastPage.data.page
  const nextPage = currentPage + 1
  const totalPage = lastPage.data.total_pages
  return currentPage === totalPage ? undefined : nextPage
}

export const useListUser = () => {
  return useInfiniteQuery({
    queryKey: ['user'],
    initialPageParam: 1,
    getNextPageParam,
    queryFn: async ({ pageParam }) => {
      const result = await api.get<ListUserParams, AxiosResponse<ListUserResponse>>(
        `users?delay=1&page=${pageParam}`
      )
      return result
    },
    retry: false,
  })
}
