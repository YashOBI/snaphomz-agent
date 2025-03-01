import axios from 'axios'
import { useAtom } from 'jotai'
import { atomWithMutation } from 'jotai-tanstack-query'
import { Client } from 'lib/baseUrlClient'
import { pickErrorMessage, pickResult } from 'lib/client'
import { generateSHAString } from 'lib/helpers/generateSHAString'
import { deleteStorageCookie, getStoredCookie, storeCookie } from 'lib/storage'
import { useRouter } from 'next/navigation'

import React, { useEffect } from 'react'
import {
  AGENTS_BACKEND_SERVICE,
  AGENT_BACKEND_SERVICE,
  AUTH_TOKEN,
  FIT_FOR_PURPOSE,
  SECURE_LOGIN_KEY
} from 'shared/constants/env'
import { agentReadWriteAtom, initialState } from 'store/atoms/agent-atom'
import { showToast } from 'utils/toastHelper'

export type LoginFormValues = {
  email?: string
  password?: string
}

const loginAgent = atomWithMutation(() => ({
  mutationKey: ['login-mutation'],
  mutationFn: async (data: LoginFormValues) => {
    try {

      // return await Client.post(`auth/agent/login`, {
      //   body: convertedString
      // }).then(pickResult, pickErrorMessage)

      const prudding = generateSHAString(data.email)
      storeCookie({ key: SECURE_LOGIN_KEY, value: prudding })

      const response = await axios.post(AGENTS_BACKEND_SERVICE, {
        query: `
     mutation LoginAgent($input: LoginAgentDto!) {
    login(input: $input) {
      access_token,
      refresh_token,
      firstName,
      lastName,
      email,
      id,
      agentType,
     licenseNumber,
    phoneNumber
    }
  }`,
        variables:
        {
          input:
          {
            ...data
          }
        }
      });
      if (response?.data?.errors) throw response?.data?.errors;
      return response.data
    } catch (error) {
      console.log(error)
      throw error;  // Rethrowing the error to handle it in the mutation
    }
  }
}))

export const useAuthApi = () => {
  const router = useRouter()
  const [{ mutate, status, data }] = useAtom(loginAgent)
  const [_, setAgentState] = useAtom(agentReadWriteAtom)

  const handleLogin = React.useCallback(async (data: LoginFormValues) => {
    mutate(data)
  }, [])

  useEffect(() => {
    if (status === 'success') {
      const newAgent = {
        is_authenticated: true,
        user: {
          ...data.data.login
        }
      }
      delete newAgent.user['access_token'];
      delete newAgent.user['refresh_token']
      const secure = getStoredCookie(SECURE_LOGIN_KEY)
      if (secure !== undefined) {
        const secureLogin = generateSHAString(
          data.data.login.email ?? 'secure@ocreal_agent'
        )
        storeCookie({ key: SECURE_LOGIN_KEY, value: secureLogin })
        showToast('success', data.message, {
          className: 'bg-green-500'
        })
        storeCookie({ key: AUTH_TOKEN, value: data?.data?.login?.access_token})
        void setAgentState(newAgent)
        void router.push('/dashboard/sell')
      } else {
        console.log('it returned undefined')
      }
    }
  }, [status])

  const LogoutAction = async () => {
    //   const response = (await client.get('api/auth/logout')).data

    //   toast.success(response?.message)

    setTimeout(() => {
      void setAgentState(initialState)
      deleteStorageCookie({ key: FIT_FOR_PURPOSE })
      deleteStorageCookie({ key: AUTH_TOKEN })
      deleteStorageCookie({ key: SECURE_LOGIN_KEY })
      router.refresh()
      void router.replace('/')
    }, 400)

    return
  }

  return {
    status,
    handleLogin,
    data,
    LogoutAction
  }
}
