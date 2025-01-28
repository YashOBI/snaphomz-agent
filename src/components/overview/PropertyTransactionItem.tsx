'use client'

import { useSingleProperty } from 'hooks/usePropertyOffer'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'
import { formatDate } from 'utils/dateutilities'
import { formatNumber } from 'utils/mathutilities'
import { shortenAddress } from 'utils/stringsUtilities'
import { cn } from 'utils/styleUtilities'

type IPropertyTransactionItemProps = {
  showTransactionInformation?: boolean
  className?: string
}

const PropertyTransactionItem: React.FC<IPropertyTransactionItemProps> = ({
  showTransactionInformation = true,
  className
}) => {
  const params = useParams()
  const id = params?.id

  const { data: singlePropertyData, isLoading: singlePropertyLoading } =
    useSingleProperty(id as string)
  const selectedProperty = singlePropertyData?.data?.property
  const { month, day, year } = selectedProperty?.createdAt
    ? formatDate(selectedProperty?.createdAt)
    : { month: '--', day: '--', year: '--' }

  return (
    <section className="flex-wrap flex items-start bg-[#0A0A0A] rounded-xl py-3 px-5 w-full gap-12">
      <section className={cn('flex items-start gap-x-12 w-1/2', className)}>
        {selectedProperty?.images?.length > 0 ? (
          <section className="rounded-lg h-24 overflow-hidden relative w-1/2">
            <Image
              src={selectedProperty?.images[0]?.url}
              alt={shortenAddress(selectedProperty?.propertyName)}
              className="rounded-lg object-cover"
              fill
            />
          </section>
        ) : (
          <div className="text-white flex items-center justify-center h-24 w-full">
            No image available
          </div>
        )}
        <section className="w-1/2">
          <h2 className="font-light text-white text-md pt-5">
            {selectedProperty?.propertyAddressDetails?.formattedAddress}
          </h2>
          {/* <h3 className="text-[#BABABA] text-base">Tennessee(TN), 38004</h3> */}
        </section>
      </section>
      {showTransactionInformation ? (
        <section className="px-6 xl:w-2/5 items-center justify-end flex">
          <section className="flex items-center w-full gap-x-12 justify-end pt-5">
            <section className="">
              <h2 className="font-bold text-white text-md">
                {formatNumber(selectedProperty?.price?.amount)}
              </h2>
              <h3 className="text-[#BABABA] text-base">Property value</h3>
            </section>
            <section className="">
              <h2 className="font-bold text-white text-md ">{`${day} ${month} ${year}`}</h2>
              <h3 className="text-[#BABABA] text-base">Date of exchange</h3>
            </section>
          </section>
        </section>
      ) : null}
    </section>
  )
}

export { PropertyTransactionItem }
