import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { atom, useAtom } from 'jotai'
import { atomWithMutation, atomWithQuery } from 'jotai-tanstack-query'
import { Client } from 'lib/baseUrlClient'
import { pickErrorMessage, pickResult } from 'lib/client'

export const urlAtom = atom([''])

const presignedUrlAtom = atomWithQuery((get) => ({
  queryKey: ['presigned-image-url', get(urlAtom)],
  queryFn: async ({ queryKey: [, fileNames] }) => {
    return await Client.get(
      `file/upload-url?files=${fileNames.toString()}`
    ).then(pickResult, pickErrorMessage)
  },
  enabled: false
}))

const uploadToPresignedUrlAtom = atomWithMutation(() => ({
  mutationKey: ['upload-presigned-url'],
  mutationFn: async ({
    file,
    presignedUrl
  }: {
    file: File
    presignedUrl: string
  }) => {
    const response = await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type
      }
    })

    return response.data
  }
}))

export const useGetPresignedUrl = () => {
  const [
    { data: presignedUrls, status: presignedUrlStatus, refetch: getURLs }
  ] = useAtom(presignedUrlAtom)

  const [
    {
      data: uploadedUrls,
      status: uploadUrlStatus,
      isPending: isUploadPending,
      mutateAsync: uploadToPresignedUrl
    }
  ] = useAtom(uploadToPresignedUrlAtom)

  return {
    presignedUrls,
    presignedUrlStatus,
    uploadUrlStatus,
    uploadedUrls,
    getURLs,
    uploadToPresignedUrl,
    loading: isUploadPending
  }
}

{
  /* 


 const uploadToPresignedUrl = async (
    file: File, 
    presignedUrl: string,
    key: string
  ) => {
    try {
      const data = await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!
          )
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: percentCompleted,
          }))
        },
      })

      if (data.status === 200) {
        setFileKeys((prev) => [...prev, key])
        setUploadResults((prev) => ({ ...prev, [file.name]: 'Success' }))
      }
    } catch (error: any) {
      setUploadResults((prev) => ({
        ...prev,
        [file.name]: `Failed: ${error.message}`,
      }))
    }
  }

*/
}
