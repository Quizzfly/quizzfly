import type { BaseResponse } from '@/types/api'

interface LoginResponse {
  user_id: string
  access_token: string
  refresh_token: string
  token_expires: number
}
export const loginApi = async (
  email: string,
  password: string,
): Promise<BaseResponse<LoginResponse>> => {
  return $api(
    '/auth/login',
    {
      method: 'POST',
      body: {
        email,
        password,
      },
    },
    false,
  )
}

interface RegisterBody {
  email: string
  password: string
  name: string
  confirm_password: string
}

export const registerApi = async (data: RegisterBody): Promise<any> => {
  return $api('/auth/register', { body: data, method: 'POST' }, false)
}

export const confirmEmailApi = async (token: string): Promise<any> => {
  return $api('/users/confirm', { query: { token: token } })
}

export const resetPasswordApi = async (data: any): Promise<any> => {
  return $api('/users/confirm', {
    method: 'POST',
    body: { data },
  })
}

export const forgotPasswordApi = async (email: string): Promise<any> => {
  return $api('/auth/forgot-password', {
    method: 'POST',
    body: { email },
  })
}

interface ChangePasswordPayload {
  old_password: string
  new_password: string
  confirm_new_password: string
}
export const changePasswordApi = async (payload: ChangePasswordPayload): Promise<any> => {
  return $api('/users/change-password', {
    method: 'POST',
    body: payload,
  })
}

interface ProfileBody {
  first_name: string
  last_name: string
}

export const updateProfileApi = async (payload: ProfileBody): Promise<any> => {
  return $api('/users/info', {
    method: 'POST',
    body: payload,
  })
}
