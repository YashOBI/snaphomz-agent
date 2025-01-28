import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { urlAtom, useGetPresignedUrl } from './useGetPresignedUrl'
import { atomWithMutation } from 'jotai-tanstack-query'
import { Client } from 'lib/baseUrlClient'
import { pickErrorMessage, pickResult } from 'lib/client'
import { useAtom } from 'jotai'
import { showToast } from 'utils/toastHelper'
import { useRouter } from 'next/navigation'

interface CoOwner {
  name?: string
  email?: string
}
type IApiFormat = {
  propertyOwnershipDetails: {
    nameOnProperty: string
    email: string
    coOwners: CoOwner[]
  }
  proofOfOwnership: {
    name: string
    url: string
    thumbNail: string
    documentType: string
  }[]
  additionalDocuments: {
    name: string
    url: string
    thumbNail: string
    documentType: string
  }[]
  propertyId: string
}

const verifyOwnership = atomWithMutation(() => ({
  mutationKey: ['verify-ownership'],
  mutationFn: async (value: IApiFormat) => {
    return await Client.post(
      `property/verify/property/ownership/${value.propertyId}`,
      {
        body: JSON.stringify(value)
      }
    ).then(pickResult, pickErrorMessage)
  }
}))

// Validation schema
const coOwnerSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'The name is too short.')
    .max(55, 'The name is too long.')
    .matches(/^[a-zA-Z\s-]+$/, 'The name contains special characters.')
    .required('The name is required.'),
  email: yup
    .string()
    .email('The email must be a valid email address.')
    .required('The email is required.')
})
const schema = yup.object().shape({
  name_on_property: yup
    .string()
    .min(3, 'The name is too short.')
    .max(55, 'The name is too long.')
    .matches(/^[a-zA-Z\s-]+$/, 'The name contains special characters.')
    .required('The name is required.'),
  email: yup
    .string()
    .email('The email must be a valid email address.')
    .required('The email is required.'),
  coOwners: yup.array().of(coOwnerSchema)
})

// Define the form values type
type IOwnershipDetailsProps = {
  name_on_property: string
  email: string
  coOwners: CoOwner[]
}

export const useVerifyOwnership = (id: string) => {
  const router = useRouter()
  const [_, seturlAtom] = useAtom(urlAtom)
  const [{ mutateAsync, data, isPending }] = useAtom(verifyOwnership)
  const {
    presignedUrls,
    loading,
    presignedUrlStatus,
    uploadUrlStatus,
    uploadedUrls,
    getURLs,
    uploadToPresignedUrl
  } = useGetPresignedUrl()
  const [files, setFiles] = useState<File[] | null>([])
  const [keys, setKeys] = useState<string[] | null>([])
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name_on_property: '',
      email: '',
      coOwners: [{ name: '', email: '' }]
    },
    mode: 'onBlur'
  })

  const fileNames = files.map((file) => file.name)

  const onSubmit = async (data: IOwnershipDetailsProps) => {
    if (files) {
      seturlAtom(fileNames)
      await getURLs()
    }
  }

  const verify = async () => {
    if (presignedUrls?.data && files.length > 0) {
      console.log({ presignedUrls })

      for (const file of files) {
        const presignedFile = presignedUrls.data.successfullFiles.find(
          (f) => f.filename === file.name
        )
        if (presignedFile && presignedFile.uploadUrl) {
          await uploadToPresignedUrl({
            file,
            presignedUrl: presignedFile.uploadUrl
          })
          setKeys((prev) => [...prev, presignedFile.key])
        }
      }

      const proofOfOwnership =
        files.map((file: File) => {
          return {
            name: file.name,
            url: URL.createObjectURL(file),
            thumbNail: '',
            documentType: file.type
          }
        }) || []

      const additionalDocuments =
        files.map((file: File) => {
          return {
            name: file.name,
            url: URL.createObjectURL(file),
            thumbNail: '',
            documentType: file.type
          }
        }) || []

      mutateAsync({
        propertyOwnershipDetails: {
          nameOnProperty: getValues('name_on_property'),
          email: getValues('email'),
          coOwners: getValues('coOwners')
        },
        proofOfOwnership,
        additionalDocuments,
        propertyId: id
      })
    }
  }

  useEffect(() => {
    verify()
  }, [presignedUrls])

  useEffect(() => {
    if (data) {
      showToast('success', data.message, {
        className: 'bg-green-500'
      })

      router.push('/listing/pending-verification')
      reset()
    }
  }, [data])

  return {
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    isValid,
    setFiles,
    files,
    presignedUrls,
    isLoading: loading || isPending,
    presignedUrlStatus,

    uploadUrlStatus,
    uploadedUrls,
    getURLs,
    fileNames
  }
}
