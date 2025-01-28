'use client'

import { Provider } from 'jotai'
import { ReactNode } from 'react'
import queryClient from 'lib/querryClient'
import { QueryClientProvider } from '@tanstack/react-query'

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {' '}
      <Provider>{children}</Provider>
    </QueryClientProvider>
  )
}
