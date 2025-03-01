'use client'

import { useMutation } from '@tanstack/react-query'
import { Button } from 'components/common/buttons/Button'
import { RoundedButton } from 'components/common/buttons/RoundedButton'
import LoadingState from 'components/common/LoadingState'
import { PropertyCard } from 'components/common/PropertyCard'
import { PropertyListViewItem } from 'components/common/PropertyListViewItem'
import Publish from 'components/dashboard/Publish'
import RemoveProperty from 'components/dashboard/sell/RemoveProperty'
import { useAllAgentProperties, deleteProperty } from 'hooks/usePropertyOffer'
import { IFormattedProperty } from 'interfaces/formattedProperty'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { showToast } from 'utils/toastHelper'
import Modal from 'components/common/Modal'
import { useAtom } from 'jotai'
import { agentReadWriteAtom } from 'store/atoms/agent-atom'
import { EmptyPlaceholder } from 'components/common/EmptyPlaceholder'

const Sell = () => {
  const [agentState] = useAtom(agentReadWriteAtom)
  const router = useRouter()
  const {
    data,
    error,
    isLoading,
    refetch: refetchAllProperties
  } = useAllAgentProperties(agentState)
  const [currentView, setCurrentView] = useState<'list' | 'grid'>('grid')
  const [selectedProperty, setSelectedProperty] =
    useState<IFormattedProperty | null>(null)
  const [removePropertyModal, setRemovePropertyModal] = useState(false)

  const handleModal = () => {
    setRemovePropertyModal(!removePropertyModal)
  }

  const handlePropertyClick = (property: IFormattedProperty) => {
    router.push(`/dashboard/sell/${property._id}`)
  }

  const handlePropertyEdit = (property: IFormattedProperty) => {
    router.push(`/property/${property._id}`)
  }

  const useDeleteProperty = () => {
    const mutation = useMutation({
      mutationFn: deleteProperty,
      mutationKey: ['DELETE_PROPERTY'],
      onSuccess: (data) => {
        showToast('success', data.message)
        refetchAllProperties()
        setRemovePropertyModal(false)
      },
      onError: (error) => {
        showToast('error', 'Failed to delete the property')
      }
    })

    return mutation
  }

  console.log(data)
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

  return (
    <section className="py-10 px-14 pt-32">
      <section className="flex items-center gap-8 justify-end mb-24">
        <Button className="w-40 h-11" onClick={() => router.push('/listing')}>
          <p className="text-white text-base">Add New Listing</p>
        </Button>
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
      {isLoading ? (
        <LoadingState keyType="svg" />
      ) : data?.length > 0 ? (
        <>
          {currentView === 'grid' ? (
            <section className="grid grid-cols-3 gap-4 place-items-center gap-y-14">
              {data
                // .filter((item) => !item.isDeleted)
                .map((property) => (
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
              {data
                .filter((item) => !item.isDeleted)
                .map((property) => (
                  <div
                    key={property?._id}
                    className="transition ease-in duration-700">
                    {property?._id}
                    {/* <PropertyListViewItem
                      openProperty={() => handlePropertyClick(property)}
                      editProperty={() => handlePropertyEdit(property)}
                      deleteProperty={() => handleRemoveProperty(property)}
                      badgeStatus={property.currentStatus}
                      property={property}
                    /> */}
                  </div>
                ))}
            </section>
          )}
        </>
      )
       : (
        <EmptyPlaceholder
          EmptyPlaceHolderImage="/assets/images/icons/overview.svg"
          title="Properties"
          description="There are currently no properties available for sale"
        />
       )
      }
    </section>
  )
}

export default Sell
