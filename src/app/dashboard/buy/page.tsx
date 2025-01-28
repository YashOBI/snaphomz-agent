'use client'

import { useMutation } from '@tanstack/react-query'
import { Button } from 'components/common/buttons/Button'
import { RoundedButton } from 'components/common/buttons/RoundedButton'
import { SearchInput } from 'components/common/inputs/SearchInput'
import LoadingState from 'components/common/LoadingState'
import { PropertyCard } from 'components/common/PropertyCard'
import { PropertyListViewItem } from 'components/common/PropertyListViewItem'
import {
  deleteProperty,
  useAllBuyerAgentProperties
} from 'hooks/usePropertyOffer'
import { IFormattedProperty } from 'interfaces/formattedProperty'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { showToast } from 'utils/toastHelper'
import { EmptyPlaceholder } from 'components/common/EmptyPlaceholder'
import Modal from 'components/common/Modal'
import RemoveProperty from 'components/dashboard/sell/RemoveProperty'
import { useAtom } from 'jotai'
import { agentReadWriteAtom } from 'store/atoms/agent-atom'

const Buy = () => {
  const router = useRouter()
  const [agentState] = useAtom(agentReadWriteAtom)
  const { data, error, isLoading } = useAllBuyerAgentProperties(agentState)
  const [currentView, setCurrentView] = useState<'list' | 'grid'>('grid')
  const [selectedProperty, setSelectedProperty] =
    useState<IFormattedProperty | null>(null)
  const [removePropertyModal, setRemovePropertyModal] = useState(false)

  console.log(data)
  const handlePropertyClick = (property: IFormattedProperty) => {
    router.push(`/dashboard/buy/${property._id}`)
  }

  const handlePropertyEdit = (property: IFormattedProperty) => {
    router.push(`/property/${property._id}`)
  }

  const handleModal = () => {
    setRemovePropertyModal(!removePropertyModal)
  }
  const useDeleteProperty = () => {
    const mutation = useMutation({
      mutationFn: deleteProperty,
      mutationKey: ['DELETE_PROPERTY'],
      onSuccess: (data) => {
        showToast('success', data.message)
        setRemovePropertyModal(false)
      },
      onError: (error) => {
        showToast('error', 'Failed to delete the property')
      }
    })

    return mutation
  }
  const {
    mutate: deletePropertyMutate,
    status: deleteStatus,
    data: deletePropertyData
  } = useDeleteProperty()

  const handleRemoveProperty = (property: IFormattedProperty) => {
    setSelectedProperty(property)
    setRemovePropertyModal(true)
  }

  const confirmRemoveProperty = () => {
    if (selectedProperty) {
      deletePropertyMutate(selectedProperty._id)
    }
  }

  const filteredProperties =
    data?.filter((item) => !item.isDeleted) || []
  const hasProperties = filteredProperties.length > 0

  return (
    <section className="py-10 px-14 pt-32">
      <section className="flex items-center gap-8 justify-end mb-24">
        <section className="flex items-center gap-8">
          <Image
            onClick={() => setCurrentView('grid')}
            height={24}
            width={24}
            src="/assets/images/icons/gridIcon.svg"
            alt="Grid Icon"
            className="cursor-pointer object-contain"
          />
          <Image
            onClick={() => setCurrentView('list')}
            height={24}
            width={24}
            src="/assets/images/icons/listIcon.svg"
            alt="List Icon"
            className="cursor-pointer object-contain"
          />
        </section>
      </section>
      <section className="w-2/5 mb-5">
        <SearchInput placeholder="search property" />
      </section>
      {isLoading ? (
        <LoadingState keyType="svg" />
      ) : hasProperties ? (
        <>
          {currentView === 'grid' ? (
            <section className="grid grid-cols-3 gap-4 place-items-center gap-y-14">
              {data?.map((property) => (
                  <div
                    key={property?._id}
                    className="transition ease-in duration-700 w-[95%]">
                    <PropertyCard
                      badgeStatus={property.listing?.customStatus}
                      property={property?.listing}
                      className="w-full">
                      <section className="flex items-center gap-4 mt-7">
                        <RoundedButton
                          label="Open"
                          onClick={() => handlePropertyClick(property)}
                          variant="primary"
                          className="w-[30%] py-2"
                        />
                        <RoundedButton
                          label="Edit"
                          onClick={() => handlePropertyEdit(property)}
                          variant="secondary"
                          className="w-[30%] py-2 border-white/[.34]"
                        />
                        <RoundedButton
                          label="Remove"
                          onClick={() => handleRemoveProperty(property)}
                          variant="secondary"
                          className="w-[30%] py-2"
                        />
                      </section>
                    </PropertyCard>
                  </div>
                ))}
              <Modal isOpen={removePropertyModal} closeModal={handleModal}>
                <RemoveProperty
                  closeModal={handleModal}
                  deleteProperty={confirmRemoveProperty}
                />
              </Modal>
            </section>
          ) : (
            <section className="flex flex-col gap-y-6">
              {data?.map((property) => (
                  <div
                    key={property?._id}
                    className="transition ease-in duration-700">
                      {property?._id}
                    <PropertyListViewItem
                      openProperty={() => handlePropertyClick(property)}
                      editProperty={() => handlePropertyEdit(property)}
                      deleteProperty={() => handleRemoveProperty(property)}
                      badgeStatus={property.currentStatus}
                      property={property}
                    />
                  </div>
                ))}
            </section>
          )}
        </>
      ) : (
        <EmptyPlaceholder
          EmptyPlaceHolderImage="/assets/images/icons/overview.svg"
          title="Properties"
          description="There are currently no properties available for sale"
        />
      )}
    </section>
  )
}

export default Buy
