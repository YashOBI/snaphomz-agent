'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RoundedButton } from 'components/common/buttons/RoundedButton'
import { DocumentCard } from 'components/common/DocumentCard'
import { EmptyPlaceholder } from 'components/common/EmptyPlaceholder'
import { RoundedButtonFileUpload } from 'components/common/inputs/RoundedButtonFileUpload'
import LoadingState from 'components/common/LoadingState'
import { PropertyTransactionItem } from 'components/overview/PropertyTransactionItem'
import {
  deletePropertyDocument,
  useAllDocumentsOfAProperty
} from 'hooks/usePropertyDocuments'
import { useUpdatePropertyDocument } from 'hooks/useUpdateProperty'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { formatDate } from 'utils/dateutilities'
import { downloadDocument } from 'utils/downloadFunction'
import { showToast } from 'utils/toastHelper'

const Agreement = () => {
  const params = useParams()
  const queryClient = useQueryClient()
  const id = params?.id

  const [selectedDocument, setSelectedDocument] = useState(null)
  const [activeDocument, setActiveDocument] = useState<string | null>(null)

  const {
    data: propertyDocuments,
    isLoading,
    error
  } = useAllDocumentsOfAProperty(id as string)

  const { setFile, postUpdateLoading } = useUpdatePropertyDocument(id as string)

  const result = propertyDocuments?.data?.result

  const loading = isLoading || postUpdateLoading

  const handleFileChange = (file: File) => {
    setFile(file)
  }
  const handleDocumentClick = (document) => {
    setSelectedDocument(document)
  }
  const useDeletePropertyDocument = () => {
    const mutation = useMutation({
      mutationFn: deletePropertyDocument,
      mutationKey: ['DELETE_PROPERTY_DOCUMENT'],
      onSuccess: (data) => {
        showToast('success', data.message)
        queryClient.refetchQueries({
          queryKey: ['GET_DOCUMENTS_OF_PROPERTY'],
          exact: true
        })
      }
    })

    return mutation
  }
  const {
    mutate: deletePropertyDocumentMutate,
    status,
    data: deletePropertyData
  } = useDeletePropertyDocument()

  const handleDocumentDelete = (document) => {
    setSelectedDocument(document)
    deletePropertyDocumentMutate(document?._id)
  }
  return (
    <section className="pb-6">
      <PropertyTransactionItem />
      <section className="w-full flex items-center justify-end my-10 gap-7">
        <RoundedButtonFileUpload setFile={handleFileChange} />
        <RoundedButton
          label="Docusign"
          onClick={() => {}}
          variant="primary"
          className="bg-black text-white py-2 text-sm"
        />
      </section>
      {loading ? (
        <LoadingState keyType="svg" />
      ) : (
        <section className="flex flex-wrap items-center gap-10">
          {result != null && result.length > 0 ? (
            result?.map((propertyDocument) => {
              const { month, day, year, time } = formatDate(
                propertyDocument.updatedAt
              )
              return (
                <DocumentCard
                  key={propertyDocument?._id}
                  downloadDocument={() =>
                    downloadDocument(
                      propertyDocument.url,
                      propertyDocument.name
                    )
                  }
                  title={propertyDocument.name}
                  updatedDate={`Updated ${month} ${day}, ${year} ${time}`}
                  onClick={() => {
                    handleDocumentClick(propertyDocument)
                  }}
                  documentUrl={selectedDocument?.url}
                  handleDocumentDelete={() =>
                    handleDocumentDelete(propertyDocument)
                  }
                  isOpen={activeDocument === propertyDocument._id}
                  setActiveDocument={() =>
                    setActiveDocument(
                      activeDocument === propertyDocument._id
                        ? null
                        : propertyDocument._id
                    )
                  }
                />
              )
            })
          ) : (
            <EmptyPlaceholder
              EmptyPlaceHolderImage="/assets/images/icons/agreements.svg"
              title="Agreements"
              description="No agreements yet"
            />
          )}
        </section>
      )}
    </section>
  )
}

export default Agreement
