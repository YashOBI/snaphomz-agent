'use client'

import { Button } from 'components/common/buttons/Button'
import SearchComponent from 'components/common/SearchComponent'
import { claimPropertyAtom } from 'hooks/claimPropertyAtom'
import { createProperty } from 'hooks/useCreateProperty'
import { useMLSProperties } from 'hooks/useMLSProperties'
import { IProperty, PropertyAddressDetails } from 'interfaces'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { showToast } from 'utils/toastHelper'

export type Property = IProperty & {
  propertyAddressDetails?: PropertyAddressDetails
  images?: {
    url: string
  }[]
  videos?: {
    url: string
  }[]
  propertyDocument?: string[]
  propertyName?: string
  longitude?: number
  latitude?: number
  price?: {
    amount: number
    currency: string
  }
  propertyType?: string
  propertyDescription?: string
  lotSizeValue?: string
  lotSizeUnit?: string
  numBathroom?: string
  numBedroom?: string
  yearBuild?: number
}

const EmptyListingDashboard = () => {
  const router = useRouter()
  const [selectedItem, setSelectedItem] = useState<Property | null>(null)
  const [showDropdown, setShowDropdown] = useState(true)
  const [showButton, setShowButton] = useState(false)
  const [{ mutate, status, data: createdProperty }] = useAtom(createProperty)
  const { data, setSearchTerm, searchTerm, isPending, isFetching } =
    useMLSProperties()
  const [_, setPropertyToStorage] = useAtom(claimPropertyAtom)

  useEffect(() => {
    if (status === 'success') {
      showToast('success', createdProperty.data.message, {
        className: 'bg-green-500'
      })

      setPropertyToStorage(createdProperty?.data?.data.property)
      router.push('/listing/listing-process')
    }
  }, [status])

  const onPressItem = (item: Property) => {
    setSelectedItem(item)
    setSearchTerm(item.propertyAddressDetails?.formattedAddress || '')
    setShowDropdown(false)
    setShowButton(true)
  }

  const handleSubmit = () => {
    if (selectedItem) {
      mutate(selectedItem)
    }
  }

  return (
    <section className="flex-col items-center justify-center flex min-h-[calc(100vh-100px)]">
      <h1 className="text-4xl font-semibold text-center mb-14">
        Listing Dashboard
      </h1>

      <SearchComponent
        onSearch={setSearchTerm}
        inputSearchString={searchTerm}
        loading={isFetching}
      />
      <div className="relative w-3/5">
        {showDropdown && data?.data?.result && (
          <div className="absolute max-h-56 overflow-auto top-full left-0 w-full border-b border-r border-l border-solid border-[#D5D9DC] rounded-b-md bg-transparent z-10 shadow-md">
            {data?.data?.result
              .filter((item) =>
                item.propertyAddressDetails?.formattedAddress
                  ?.toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((item, index) => (
                <div
                  onClick={() => onPressItem(item)}
                  key={index}
                  className="p-2 cursor-pointer text-left hover:bg-gray-100">
                  {item.propertyAddressDetails?.formattedAddress}
                </div>
              ))}
          </div>
        )}
      </div>
      {showButton && (
        <Button
          className="text-white bg-black font-medium text-base mt-6 w-44"
          type="submit"
          disabled={!selectedItem}
          onClick={() => handleSubmit()}>
          Claim home
        </Button>
      )}
    </section>
  )
}

export default EmptyListingDashboard
