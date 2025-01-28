'use client'

import { BuyerOfferCard } from 'components/common/BuyerOfferCard'
import { SearchInput } from 'components/common/inputs/SearchInput'
import { PropertyTransactionItem } from 'components/overview/PropertyTransactionItem'
import {
  useAcceptPropertyOffer,
  useAllPropertyOffers
} from 'hooks/usePropertyOffer'
import { IBuyer } from 'interfaces/buyerOffer'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { propertyOfferAtom } from 'store/atoms/atoms'
import { useParams, useRouter } from 'next/navigation'
import { Drawer } from 'components/common/Drawer'
import { RoundedButton } from 'components/common/buttons/RoundedButton'
import { MessageItem } from 'components/messages/MessageItem'
import { EmptyPlaceholder } from 'components/common/EmptyPlaceholder'

const Offers = () => {
  const router = useRouter()
  const params = useParams()
  const id = params?.id
  const [{ mutateAcceptPropertyOffer, status }] = useAcceptPropertyOffer()
  const handleAcceptPropertyOffer = (offerId) => {
    const body = {
      header: ' ',
      body: ' ',
      offerId: offerId,
      response: true,
      notifyOtherParties: true
    }

    mutateAcceptPropertyOffer({
      body: body
    })
  }
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [offer, setOffer] = useState(null)
  const { data, isLoading, error } = useAllPropertyOffers(id as string)

  const result = data?.data?.result
  const [selectedOffer, setSelectedOffer] = useAtom(propertyOfferAtom)
  const handleOfferClick = (offer: IBuyer) => {
    setSelectedOffer(offer)
    router.push(`/offers/${offer._id}`)
  }
  return (
    <>
      <section className="pb-24">
        <PropertyTransactionItem />
        {result?.length > 0 ? (
          <>
            <h2 className="text-xl font-bold my-6">Offers</h2>
            <section className="bg-white rounded-md px-4 py-6">
              <section className="w-2/5 mb-5">
                <SearchInput />
              </section>

              <section className="grid grid-cols-3 flex-wrap gap-5 items-center">
                {result?.map((offer, index) => (
                  <BuyerOfferCard
                    onClick={() => handleOfferClick(offer)}
                    key={offer.id + index.toString()}
                    openComment={() => {
                      setIsDrawerOpen((prev) => !prev)
                      setOffer(offer)
                    }}
                    buyer={offer.buyer}
                    offerPrice={offer.offerPrice}
                    financeType={offer.financeType}
                    downPayment={offer.downPayment}
                    handleAcceptOffer={() =>
                      handleAcceptPropertyOffer(offer._id)
                    }
                    loading={status === 'pending'}
                  />
                ))}
              </section>
            </section>
          </>
        ) : (
          <EmptyPlaceholder
            EmptyPlaceHolderImage="/assets/images/icons/offers.svg"
            title="Offer"
            description="No offers yet."
          />
        )}
      </section>
      <Drawer
        buyerName={offer?.buyer?.fullname}
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        bottom={
          <section className="absolute bg-white h-30 w-full z-30 bottom-0 pb-5 overflow-hidden ">
            <section className="rounded-sm  h-full">
              <section className="w-full">
                <textarea
                  name=""
                  className="resize-none w-full bg-transparent px-4 py-2 placeholder-shown:border-transparent disabled:border-0 disabled:bg-transparent border-none border-transparent focus:border-transparent focus:ring-0 focus:outline-none"
                />
              </section>
              <section className="flex justify-end items-center">
                <RoundedButton
                  label="Send"
                  onClick={() => {}}
                  variant="primary"
                  className="py-2 px-7 bg-black text-white"
                />
              </section>
            </section>
          </section>
        }>
        <MessageItem
          text="right now, if you can"
          time={'2:30pm'}
          isFromLoggedInUser={true}
          childStyle="bg-transparent"
        />
        <MessageItem
          text={`Hello John, I missed out on a few documents, so I attached it
                right now, if you can sign on it right away, I will really
                appreciate that you know.`}
          time={'2:30pm'}
          isFromLoggedInUser={false}
          parentStyle="rounded-md"
        />
        <MessageItem
          text={`Hello John, I missed out on a few documents, so I attached it
                right now, if you can sign on it right away, I will really
                appreciate that you know.`}
          time={'2:30pm'}
          isFromLoggedInUser={true}
          childStyle="bg-transparent"
        />
        <MessageItem
          text="right now, if you can"
          time={'2:30pm'}
          isFromLoggedInUser={true}
          childStyle="bg-transparent"
        />
        <MessageItem
          text={`Hello John, I missed out on a few documents, so I attached it
                right now, if you can sign on it right away, I will really
                appreciate that you know.`}
          time={'2:30pm'}
          isFromLoggedInUser={false}
          parentStyle="rounded-md"
        />
        <MessageItem
          text={`Hello John, I missed out on a few documents, so I attached it
                right now, if you can sign on it right away, I will really
                appreciate that you know.`}
          time={'2:30pm'}
          isFromLoggedInUser={true}
          childStyle="bg-transparent"
        />{' '}
        <MessageItem
          text="right now, if you can"
          time={'2:30pm'}
          isFromLoggedInUser={true}
          childStyle="bg-transparent"
        />
        <MessageItem
          text={`Hello John, I missed out on a few documents, so I attached it
                right now, if you can sign on it right away, I will really
                appreciate that you know.`}
          time={'2:30pm'}
          isFromLoggedInUser={false}
          parentStyle="rounded-md"
        />
        <MessageItem
          text={`Hello John, I missed out on a few documents, so I attached it
                right now, if you can sign on it right away, I will really
                appreciate that you know.`}
          time={'2:30pm'}
          isFromLoggedInUser={true}
          childStyle="bg-transparent"
        />
        <MessageItem
          text="right now, if you can"
          time={'2:30pm'}
          isFromLoggedInUser={true}
          childStyle="bg-transparent"
        />
        <MessageItem
          text={`Hello John, I missed out on a few documents, so I attached it
                right now, if you can sign on it right away, I will really
                appreciate that you know.`}
          time={'2:30pm'}
          isFromLoggedInUser={false}
          parentStyle="rounded-md"
        />
        <MessageItem
          text={`Hello John, I missed out on a few documents, so I attached it
                right now, if you can sign on it right away, I will really
                appreciate that you know.`}
          time={'2:30pm'}
          isFromLoggedInUser={true}
          childStyle="bg-transparent"
        />{' '}
        <MessageItem
          text="right now, if you can"
          time={'2:30pm'}
          isFromLoggedInUser={true}
          childStyle="bg-transparent"
        />
        <MessageItem
          text={`Hello John, I missed out on a few documents, so I attached it
                right now, if you can sign on it right away, I will really
                appreciate that you know.`}
          time={'2:30pm'}
          isFromLoggedInUser={false}
        />
        <MessageItem
          text={`Hello John, I missed out on a few documents, so I attached it
                right now, if you can sign on it right away, I will really
                appreciate that you know.`}
          time={'2:30pm'}
          isFromLoggedInUser={true}
          childStyle="bg-transparent"
        />
        <MessageItem
          text="right now, if you can"
          time={'2:30pm'}
          isFromLoggedInUser={true}
          childStyle="bg-transparent"
        />
        <MessageItem
          text={`Hello John, I missed out on a few documents, so I attached it
                right now, if you can sign on it right away, I will really
                appreciate that you know.`}
          time={'2:30pm'}
          isFromLoggedInUser={false}
        />
        <MessageItem
          text={`Hello John, I missed out on a few documents, so I attached it
                right now, if you can sign on it right away, I will really
                appreciate that you know.`}
          time={'2:30pm'}
          isFromLoggedInUser={true}
          childStyle="bg-transparent"
        />
        <MessageItem
          text="right now, if you can"
          time={'2:30pm'}
          isFromLoggedInUser={true}
          childStyle="bg-transparent"
        />
        <MessageItem
          text={`Hello John, I missed out on a few documents, so I attached it
                right now, if you can sign on it right away, I will really
                appreciate that you know.`}
          time={'2:30pm'}
          isFromLoggedInUser={false}
        />
        <MessageItem
          text={`Hello John, I missed out on a few documents, so I attached it
                right now, if you can sign on it right away, I will really
                appreciate that you know.`}
          time={'2:30pm'}
          isFromLoggedInUser={true}
          childStyle="bg-transparent"
        />
      </Drawer>
    </>
  )
}

export default Offers
