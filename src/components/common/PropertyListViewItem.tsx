'use client'

import { Property } from 'app/listing/page'
import Image from 'next/image'
import React from 'react'
import { formatNumber } from 'utils/mathutilities'
import { cn } from 'utils/styleUtilities'
import { RoundedButton } from './buttons/RoundedButton'

type IPropertyListViewItemProps = {
  property: Property
  badgeStatus?: string
  openProperty: () => void
  deleteProperty: () => void
  editProperty: () => void
}

const PropertyListViewItem: React.FC<IPropertyListViewItemProps> = ({
  property,
  badgeStatus,
  openProperty,
  deleteProperty,
  editProperty
}) => {
  const badgeColor =
    badgeStatus?.toLocaleLowerCase() === 'pending'
      ? '#FF8700'
      : badgeStatus?.toLocaleLowerCase() === 'now showing'
        ? '#ACF337'
        : '#F7F2EB'
  return (
    <section className="flex items-center justify-between border-b h-32 pb-8 border-solid border-[#7C7C7C] flex-wrap overflow-hidden">
      <section className="flex items-center md:w-1/2 mb-5 gap-4">
        <div className="rounded-md overflow-hidden">
          {
             property?.images.length > 0 &&
             <Image
             src={property?.images[0]?.url}
             alt={property?.propertyName}
             height={100}
             width={100}
             className="object-contain"
           />
          }
         
        </div>
        <section className="w-4/5">
          <div
            className={cn(
              `bg-[${badgeColor}] inline-block px-7 py-1 rounded-full mb-2`
            )}>
            <p className="font-medium text-xs">{badgeStatus}</p>
          </div>
          <h2 className="font-bold text-black text-base">
            {property?.propertyAddressDetails?.formattedAddress}
          </h2>
        </section>
      </section>
      <section className="flex items-center gap-12">
        <h1 className="font-bold text-2xl">
          {formatNumber(property?.price?.amount || 0)}
        </h1>
        <RoundedButton
          variant="secondary"
          label="Open"
          onClick={openProperty}
          className="px-12 py-1.5 border border-solid border-black bg-white text-black"
        />
        <RoundedButton
          variant="secondary"
          label="Edit"
          onClick={editProperty}
          className="px-12 py-1.5 bg-[#D9D9D9] text-black"
        />
        <Image
          onClick={deleteProperty}
          src="/assets/images/icons/deleteIcon.png"
          alt="Property name"
          className="object-contain cursor-pointer "
          height={20}
          width={20}
        />
      </section>
    </section>
  )
}

export { PropertyListViewItem }
