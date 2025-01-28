'use client'

import Image from 'next/image'
import React from 'react'
import { formatNumber } from 'utils/mathutilities'
import { RoundedButton } from './buttons/RoundedButton'
import ProfileCircle from './ProfileCircle'
import { IBuyerOffer } from 'interfaces/buyerOffer'

type IBuyerOfferCardProps = IBuyerOffer & {
  openComment?: () => void
  loading?: boolean
}

const BuyerOfferCard: React.FC<IBuyerOfferCardProps> = ({
  buyer,
  offerPrice,
  financeType,
  downPayment,
  onClick,
  openComment,
  handleAcceptOffer,
  loading
}) => {
  return (
    <section className="bg-[#F8F8F8] rounded-2xl px-6 pt-6 pb-2 w-full">
      <section className="flex items-center justify-between mb-6">
        <div className="py-1 px-4 flex items-center justify-center bg-[#FFB576] text-black text-xs font-bold rounded-full">
          New
        </div>
        <div className="flex items-center gap-2">
          <Image
            className=" cursor-pointer"
            onClick={openComment}
            src="/assets/images/icons/chatIcon.svg"
            alt="chat"
            height={24}
            width={24}
          />
          <Image
            src="/assets/images/icons/starIconOrange.svg"
            alt="star"
            height={20}
            width={20}
          />
        </div>
      </section>
      <ProfileCircle
        placeholder={`${buyer?.firstName[0]?.toUpperCase() || 'X'}${buyer?.lastName[0]?.toUpperCase() || 'X'}`}
      />
      <section className="w-4/5 mb-4">
        <h2 className="font-bold text-xl">{buyer?.fullname}</h2>
        <p className="text-md text-[#707070]">{buyer?.email}</p>
        <p className="text-md text-[#707070]">
          Mobile: {buyer?.mobile?.number_body}
        </p>
      </section>
      <p className="text-md text-[#707070] font-medium">Offer Price</p>
      <h1 className="font-bold text-2xl mb-6">
        {formatNumber(offerPrice?.amount)}
      </h1>

      <section className="flex items-center justify-between mb-6">
        <section className="">
          <p className="text-md text-[#777777] font-medium">Finance Type</p>
          <p className="text-lg text-black font-medium capitalize">
            {financeType}
          </p>
        </section>
        <section className="">
          <p className="text-md text-[#777777] font-medium">Down Payment</p>
          <p className="text-lg text-black font-medium">
            {formatNumber(downPayment?.amount)}
          </p>
        </section>
      </section>
      <section className="flex items-center justify-between mb-6">
        <RoundedButton
          variant="secondary"
          onClick={handleAcceptOffer}
          loading={loading}
          label="Accept Offer"
          className="py-2 text-black border border-solid border-black px-6"
        />
        <RoundedButton
          variant="secondary"
          onClick={onClick}
          label="View Offer"
          className="py-2 text-white bg-black px-6"
        />
      </section>
    </section>
  )
}

export { BuyerOfferCard }
