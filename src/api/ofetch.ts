import { ofetch, type $Fetch, type FetchOptions, type FetchContext } from 'ofetch'
import { useAuthStore } from '@/stores/auth'
import { config } from './config'

async function refreshToken() {
  const authStore = useAuthStore()
  try {
    const response = await ofetch(`${config.baseURL}/${config.path.refreshToken}`, {
      retry: false,
      method: 'POST',
      body: {
        refreshToken: localStorage.getItem(config.key.refreshToken),
      },
    })
    authStore.token.access = response.access.token
    authStore.token.refresh = response.refresh.token
    localStorage.setItem(config.key.accessToken, authStore.token.access)
    localStorage.setItem(config.key.refreshToken, authStore.token.refresh)
    return true
  } catch (error) {
    console.error('Failed to refresh token', error)
    return false
  }
}

async function handleUnauthorizedError(error: FetchContext): Promise<any> {
  const authStore = useAuthStore()
  if ((error.options as any).retried) {
    authStore.logout()
  } else if (error.response && error.options.retryStatusCodes?.includes(error.response.status)) {
    const isSuccess = await refreshToken()
    if (isSuccess) {
      // Retry the request with the new token
      const newOptions = {
        ...error.options,
        headers: {
          ...error.options.headers,
          Authorization: `Bearer ${authStore.token.access}`,
        },
        retried: true,
      }
      return newOptions
    } else {
      authStore.logout()
    }
  }
}

function isAllowRefreshToken(error: FetchContext) {
  return (
    error.response &&
    config.retryStatusCodes.includes(error.response.status) &&
    !error.response?.url.includes('/login')
  )
}

export const fetchInstance: $Fetch = ofetch.create({
  baseURL: config.baseURL,
  retry: 1,
  retryStatusCodes: config.retryStatusCodes,
  async onResponseError(error) {
    console.error('[Ofetch]: Error:', error)
    if (isAllowRefreshToken(error)) {
      error.options = await handleUnauthorizedError(error)
    }
  },
})

function createFetchOptions(options: FetchOptions, isAuthHeader: boolean) {
  const { token } = useAuthStore()
  // set header need
  // options.headers = {
  //   'Allow-Control-Allow-Origin': '*',
  //   'Content-Type': 'application/json',
  //   ...options.headers,
  // }
  if (isAuthHeader) {
    return {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token.access}`,
      },
    }
  }
  return options
}

export function $api(endpoint: string, options: FetchOptions, isAuthHeader: boolean = true) {
  return fetchInstance(endpoint, createFetchOptions(options, isAuthHeader))
}
