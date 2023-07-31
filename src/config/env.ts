const baseApiURL = process.env.EXPO_PUBLIC_BASE_API_URL || 'https://reqres.in/api'
const apiKey = process.env.EXPO_PUBLIC_API_KEY || ''

export const env = {
  baseApiURL,
  apiKey,
}
