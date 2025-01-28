'use client'

import { RoundedButton } from 'components/common/buttons/RoundedButton'
import { PropertyCard } from 'components/common/PropertyCard'
import PropertyDetails from 'components/common/PropertyDetails'
import React from 'react'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { claimPropertyAtom } from 'hooks/claimPropertyAtom'
import Link from 'next/link'

const PendingVerification = () => {
  const router = useRouter()
  const [currentProperty] = useAtom(claimPropertyAtom)
  return (
    <section className="min-h-full flex-col justify-center flex h-[calc(100vh-100px)] bg-[#F7F2EB] px-14 rounded-t-lg">
      <section className="flex items-center gap-x-24">
        <PropertyCard property={currentProperty}>
          <PropertyDetails
            noOfBeds={currentProperty.numBedroom}
            noOfBaths={currentProperty.numBathroom}
            lotSizeValue={currentProperty.lotSizeValue}
            lotSizeUnit={currentProperty.lotSizeUnit}
          />
        </PropertyCard>
        <section className="">
          <h1 className="text-4xl font-medium mb-8">Verification Pending</h1>
          <p className="text-xl font-medium">
            Your property is undergoing verification
          </p>
        </section>
      </section>
      <section className="flex items-center justify-between mt-20">
        <section>
          <RoundedButton
            label="Back"
            onClick={() => router.push('/listing')}
            variant="primary"
            className="py-2 text-black bg-transparent border border-solid border-black px-14"
          />
        </section>
        <Link href={'/dashboard/sell'}>
          <RoundedButton
            label="Continue"
            variant="primary"
            className="py-2 text-white bg-black border border-solid border-black px-14"
          />
        </Link>
      </section>
    </section>
  )
}

export default PendingVerification
