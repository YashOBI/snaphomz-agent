'use client'

import { RoundedButton } from 'components/common/buttons/RoundedButton'
import { PropertyCard } from 'components/common/PropertyCard'
import PropertyDetails from 'components/common/PropertyDetails'
import React from 'react'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { claimPropertyAtom } from 'hooks/claimPropertyAtom'

const ListingProcess = () => {
  const router = useRouter()
  const [currentProperty] = useAtom(claimPropertyAtom)

  return (
    <section className="min-h-full flex-col justify-center flex h-[calc(100vh-100px)] bg-[#F7F2EB] px-14 rounded-t-lg pt-20">
      <section className="flex items-center gap-x-24 ">
        <PropertyCard property={currentProperty}>
          <PropertyDetails
            noOfBeds={currentProperty.numBedroom}
            noOfBaths={currentProperty.numBathroom}
            lotSizeValue={currentProperty.lotSizeValue}
            lotSizeUnit={currentProperty.lotSizeUnit}
          />
        </PropertyCard>
        <section className="">
          <h1 className="text-4xl font-medium mb-8">Verify Ownership</h1>
          <p className="text-xl font-medium">
            Proceed to have full control of this property here
          </p>
        </section>
      </section>
      <section className="flex items-center justify-between mt-20">
        <section>
          <RoundedButton
            label="Cancel"
            onClick={() => router.push('/listing')}
            variant="primary"
            className="py-2 text-black bg-transparent border border-solid border-black px-14"
          />
        </section>
        <section className="flex items-center gap-x-4">
          <RoundedButton
            label="Later"
            onClick={() => router.push('/listing')}
            variant="primary"
            className="py-2 text-black bg-transparent border-0 px-14"
          />

          <RoundedButton
            label="Start"
            onClick={() => router.push('/listing/listing-details')}
            variant="primary"
            className="py-2 text-white bg-black border border-solid border-black px-14"
          />
        </section>
      </section>
    </section>
  )
}

export default ListingProcess
