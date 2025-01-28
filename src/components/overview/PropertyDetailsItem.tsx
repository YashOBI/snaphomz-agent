'use client'

import { RoundedButton } from 'components/common/buttons/RoundedButton'
import CircularProgressBar from 'components/common/CircularProgressBar'
import Modal from 'components/common/Modal'
import Publish from 'components/dashboard/Publish'
import { useSingleProperty } from 'hooks/usePropertyOffer'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { propertyDetailsAtom } from 'store/atoms/atoms'
import { formatNumber } from 'utils/mathutilities'
import { shortenAddress } from 'utils/stringsUtilities'

const PropertyDetailsItem = () => {
  const router = useRouter()
  const params = useParams()
  const id = params?.id

  const { data: singlePropertyData, isLoading: singlePropertyLoading } =
    useSingleProperty(id as string)
  const selectedProperty = singlePropertyData?.data?.property
  const handleEditPropertyClick = () => {
    router.push(`/property/${id}`)
  }

  const [isOpen, setIsOpen] = useState(false)

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <section className="flex-wrap flex items-center bg-[#0A0A0A] rounded-xl py-6 px-5 w-full gap-12">
      <section className="rounded-lg h-[12rem] overflow-hidden relative w-[30%]">
        {selectedProperty?.images?.length > 0 ? (
          <Image
            // src="/assets/images/property.png"
            // alt="Property name"
            src={selectedProperty?.images[0]?.url}
            alt={shortenAddress(selectedProperty?.propertyName)}
            // height={250}
            // width={250}
            fill
            className="rounded-md object-cover"
          />
        ) : (
          <div className="text-white flex items-center justify-center h-full w-full">
            No image available
          </div>
        )}
      </section>
      <section className="px-6 md:w-3/5">
        <section className="flex items-center justify-between">
          <section className="w-3/5">
            <h2 className="font-light text-white text-md w-11/12">
              {selectedProperty?.propertyAddressDetails?.formattedAddress}
            </h2>
            {/* <h3 className="text-[#BABABA] text-base">
              {selectedProperty?.propertyAddressDetails?.province} (
              {selectedProperty?.propertyAddressDetails?.state}),{' '}
              {selectedProperty?.propertyAddressDetails?.postalCode}
            </h3> */}
            <h1 className="text-white font-bold text-xl">
              {formatNumber(selectedProperty?.price?.amount || 0)}
            </h1>
          </section>
          <section className="">
            <CircularProgressBar
              size={100}
              strokeWidth={8}
              percentage={12}
              backgroundColor="#CBCBCB"
              progressColor="white"
            />
          </section>
        </section>
        <section className="flex items-center gap-4 mt-7">
          <Link
            href={`/listing/listing-preview/${selectedProperty?._id}`}
            className="w-1/5">
            <RoundedButton
              label="Preview"
              onClick={() => {}}
              className="w-full py-2"
              variant="primary"
            />
          </Link>
          <RoundedButton
            label="Edit"
            onClick={() => handleEditPropertyClick()}
            variant="danger"
            className="w-1/5 py-2"
          />
          <RoundedButton
            label="Publish"
            onClick={() => {
              handleModal()
            }}
            variant="danger"
            className="w-1/5 py-2"
          />
          <RoundedButton
            label="Share"
            onClick={() => {}}
            variant="danger"
            className="w-1/5 py-2"
          />
          <Modal isOpen={isOpen} closeModal={handleModal}>
            <Publish closeModal={handleModal} />
          </Modal>
        </section>
      </section>
    </section>
  )
}

export { PropertyDetailsItem }
