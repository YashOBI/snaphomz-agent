'use client'

import { Property } from 'app/listing/page'
import Image from 'next/image'
import React, { ReactElement } from 'react'
import { formatNumber } from 'utils/mathutilities'
import { shortenAddress } from 'utils/stringsUtilities'
import { cn } from 'utils/styleUtilities'

type IPropertyCardProps = {
  children?: ReactElement
  badgeStatus?: string
  property: any
  className?: string
}

const PropertyCard: React.FC<IPropertyCardProps> = ({
  badgeStatus,
  children,
  property,
  className
}) => {
  const badgeColor =
    badgeStatus?.toLocaleLowerCase() === 'pending'
      ? 'bg-[#FF8700]'
      : badgeStatus?.toLocaleLowerCase() === 'now showing'
        ? 'bg-[#ACF337]'
        : 'bg-[#F7F2EB]'

  return (
    <section className={cn('w-[26rem] rounded-2xl overflow-hidden', className)}>
      <section className="h-[12rem] overflow-hidden relative w-full">
        {badgeStatus ? (
          <div
            className={cn(
              `absolute top-6 left-5 ${badgeColor} px-7 py-1 rounded-full z-10`
            )}>
            <p className="font-bold text-sm">{badgeStatus}</p>
          </div>
        ) : null}

        <img
         
          src={property?.media?.photosList[0]?.midRes  }
          alt={shortenAddress(property?.propertyName || 'Property Image')}
          className="object-cover"
        
          // height={220}
          // width={464}
        />
      </section>
      <section className="bg-[#0A0A0A] px-8 pt-4 pb-8 rounded-b-2xl ">
        <h2 className="text-[#F7F2EB] font-semibold text-[1.8rem]">
          {formatNumber(property?.listPriceLow || 0)}
        </h2>
        <div className="h-16 mb-2">
          <p className="text-lg font-normal mt-4 text-[#F7F2EB]">
            {shortenAddress(property?.address?.unparsedAddress)}
          </p>
        </div>

        {children}
      </section>
    </section>
  )
}

export { PropertyCard }
