'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'components/common/buttons/Button'
import { RoundedButton } from 'components/common/buttons/RoundedButton'
import { DocumentCard } from 'components/common/DocumentCard'
import { EmptyPlaceholder } from 'components/common/EmptyPlaceholder'
import { RoundedButtonFileUpload } from 'components/common/inputs/RoundedButtonFileUpload'
import { SearchInput } from 'components/common/inputs/SearchInput'
import LoadingState from 'components/common/LoadingState'
import Modal from 'components/common/Modal'
import AISummaryCardOutput from 'components/dashboard/AISummaryCard'
import { PropertyTransactionItem } from 'components/overview/PropertyTransactionItem'
import { fetchAiSummary } from 'hooks/useAIsummary'
import { useAllDocumentsOfAProperty } from 'hooks/usePropertyDocuments'
import { useUpdatePropertyDocument } from 'hooks/useUpdateProperty'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { formatDate } from 'utils/dateutilities'
import { downloadDocument } from 'utils/downloadFunction'
import { deletePropertyDocument } from 'hooks/usePropertyDocuments'
import { showToast } from 'utils/toastHelper'

const Documents = () => {
  const params = useParams()
  const queryClient = useQueryClient()
  const id = params?.id

  const [isOpen, setIsOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  const { data: propertyDocuments, isLoading } = useAllDocumentsOfAProperty(
    id as string
  )
  const result = propertyDocuments?.data?.result
  const handleDocumentClick = (document) => {
    setSelectedDocument(document)
  }

  // useEffect(() => {
  //   if (selectedDocument) {
  //     console.log(selectedDocument)
  //   }
  // }, [selectedDocument])

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

  const [aiSummaryData, setAiSummaryData] = useState<string>('')
  const [isAiSummaryLoading, setIsAiSummaryLoading] = useState<boolean>(false)

  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false)

  const handleSummarizeClick = async () => {
    console.log('function is loading')
    if (!selectedDocument) {
      console.error('No document selected.')
      return
    }
    setIsAiSummaryLoading(true)
    console.log(isAiSummaryLoading)

    try {
      const summary = await fetchAiSummary(selectedDocument.url)
      if (summary) {
        setAiSummaryData(summary.data.text)
        setIsSummaryModalOpen(true)
      }
    } catch (error) {
      console.error('Error fetching AI summary:', error)
    } finally {
      setIsAiSummaryLoading(false)
    }
  }
  const { setFile, postUpdateLoading } = useUpdatePropertyDocument(id as string)
  const handleFileChange = (file: File) => {
    setFile(file)
  }
  const loading = isLoading || postUpdateLoading
  const [activeDocument, setActiveDocument] = useState<string | null>(null)
  return (
    <section className="pb-6">
      <PropertyTransactionItem />

      <>
        <section className="flex items-center justify-between mt-6">
          <section className="w-2/5">
            <SearchInput />
          </section>
        </section>
        <section className="flex items-center justify-between mb-2">
          <Button
            className="bg-black flex items-center justify-center gap-3 w-1/5"
            onClick={handleSummarizeClick}
            loading={isAiSummaryLoading}>
            <p className="text-md text-white ">Summarize</p>
            <Image
              src="/assets/images/icons/starIcon.svg"
              alt="Star"
              height={21}
              width={20}
            />
          </Button>
          <section className="w-full flex items-center justify-end my-10 gap-7">
            <RoundedButtonFileUpload setFile={handleFileChange} />
            <RoundedButton
              label="DocuSign"
              onClick={() => {}}
              variant="primary"
              className="bg-black text-white py-2 text-sm"
            />
          </section>
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
                const isSelected =
                  selectedDocument?._id === propertyDocument?._id
                return (
                  <DocumentCard
                    className={isSelected ? 'bg-white' : 'bg-inherit'}
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
                    handleDocumentDelete={() =>
                      handleDocumentDelete(propertyDocument)
                    }
                    documentUrl={propertyDocument.url}
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
                EmptyPlaceHolderImage="/assets/images/icons/documents.svg"
                title="Documents"
                description="No Documents yet"
              />
            )}
          </section>
        )}
      </>
      {selectedDocument && (
        <AISummaryCardOutput
          isOpen={isSummaryModalOpen}
          onClose={() => setIsSummaryModalOpen(false)}
          isLoading={isAiSummaryLoading}
          summary={aiSummaryData}
          documentName={'documentName'}
        />
      )}
    </section>
  )
}

export default Documents
