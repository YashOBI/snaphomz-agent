import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithQuery } from 'jotai-tanstack-query'
import { Client } from 'lib/baseUrlClient'
import { pickErrorMessage, pickResult } from 'lib/client'
import atomWithDebounce from './useDebounce'

export const {
  isDebouncingAtom,
  debouncedValueAtom,
  clearTimeoutAtom,
  currentValueAtom
} = atomWithDebounce('')

const GET_PROPERTY_FROM_MLS_KEY = 'mls_properties_key'

const getProperties = atomWithQuery((get) => {
  const searchTerm = get(debouncedValueAtom)
  return {
    queryKey: [GET_PROPERTY_FROM_MLS_KEY, searchTerm],
    queryFn: async ({ queryKey: [, id] }) => {
      return await Client.get(`property/query/propeties-details/${id}`).then(
        pickResult,
        pickErrorMessage
      )
    },
    enabled: searchTerm.length > 3
  }
})

export const useMLSProperties = () => {
  const currentValue = useAtomValue(currentValueAtom)
  const setDebouncedValue = useSetAtom(debouncedValueAtom)
  const [{ data, refetch, isPending, isFetching }] = useAtom(getProperties)

  return {
    data,
    setSearchTerm: setDebouncedValue,
    searchTerm: currentValue,
    isPending,
    isFetching
  }
}
