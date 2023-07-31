import Axios from 'axios'

import { env } from '@config/env'

export const api = Axios.create({
  baseURL: env.baseApiURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 1000,
})
