'use client'

import { RoundedButton } from 'components/common/buttons/RoundedButton'
import { CardItem } from 'components/common/CardItem'
import Checkbox from 'components/common/Checkbox'
import { CustomFileInputBuyer } from 'components/common/CustomFileInputBuyer'
import Dropdown from 'components/common/DropDown'
import BorderedTextArea from 'components/common/inputs/BorderedTextArea'
import { BorderedTextInput } from 'components/common/inputs/BorderedTextInput'
import { UpcomingTourCard } from 'components/common/UpcomingTourCard'
import { PropertyDetailsItem } from 'components/overview/PropertyDetailsItem'
import {
  useAcceptPropertyOffer,
  useAllPropertyOffers
} from 'hooks/usePropertyOffer'
import { useFetchAllTours } from 'hooks/useTours'
import { IBuyer } from 'interfaces/buyerOffer'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { propertyOfferAtom } from 'store/atoms/atoms'
import { formatDate } from 'utils/dateutilities'
import { shortenAddress } from 'utils/stringsUtilities'

interface TimeDropdownProps {
  value: string | null
  label: string
  labelClassName?: string
  inputClassName?: string
  onSelect: (selectedValue: string) => void
}

const generateTimeOptions = (): { label: string; value: string }[] => {
  const times = []
  const startTime = 9 // 9 AM
  const endTime = 18 // 6 PM (24-hour format)

  for (let hour = startTime; hour <= endTime; hour++) {
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hourIn12HourFormat = hour > 12 ? hour - 12 : hour
    const formattedTime = `${hourIn12HourFormat}:00 ${ampm}`
    times.push({
      label: formattedTime,
      value: formattedTime
    })
  }

  return times
}

type IPropertyInformationProps = {
  params: { slug: string }
}

const PropertyInformation: React.FC<IPropertyInformationProps> = () => {
  const timeOptions = generateTimeOptions()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [offer, setOffer] = useState(null)

  const router = useRouter()

  const params = useParams()
  const id = params?.id
  const { data, isLoading, error } = useAllPropertyOffers(id as string)
  const result = data?.data?.result
  const { data: tours } = useFetchAllTours()

  const [selectedOffer, setSelectedOffer] = useAtom(propertyOfferAtom)
  const handleOfferClick = (offer: IBuyer) => {
    setSelectedOffer(offer)
    if (router) {
      router.push(`/offers/${offer._id}`)
    }
  }

  const firstTour = tours?.data?.result?.[0]
  const { month, day } = firstTour?.eventDate?.[0]?.eventDate
    ? formatDate(firstTour?.eventDate?.[0]?.eventDate)
    : { month: '--', day: '--' }
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

  return (
    <>
      <section className={`w-full p-6 flex flex-col gap-12 h-full`}>
        <PropertyDetailsItem />
        <section className="grid grid-cols-2 gap-x-8 h-auto ">
          <section className="bg-white rounded-md p-6">
            <h2 className="text-lg text-black font-bold mb-6">Request Tour</h2>

            <BorderedTextInput
              labelClassName="mt-6"
              type="text"
              placeholder="Full name"
              inputClassName="bg-transparent rounded-l-none rounded-md "
              // error={errors.downPayment?.message}
              // defaultValue={singlePropertyOffer?.data?.downPayment?.amount}
              onChange={() => {}}
              value={null}
            />
            <div className="h-6" />

            <BorderedTextInput
              labelClassName="mt-6"
              type="number"
              placeholder="Phone"
              inputClassName="bg-transparent rounded-l-none rounded-md "
              // error={errors.downPayment?.message}
              // defaultValue={singlePropertyOffer?.data?.downPayment?.amount}
              onChange={() => {}}
              value={null}
            />
            <div className="h-6" />
            <div className=" h-36">
              <BorderedTextArea
                placeholder="Add a note"
                type="text"
                className="h-full"
                inputClassName="border border-solid border-[#D5D9DC] focus:border-[#FF8700] disabled:border-0 disabled:bg-[#ACACAC] rounded-md px-4 w-full h-full"
              />
            </div>
            <div className="h-6" />
            <Checkbox
              label={
                <p className="text-md text-black font-bold">
                  You agree to our Terms of Use.
                </p>
              }
              checked={false}
              onChange={() => {}}
            />
            <section className="flex items-center gap-x-8 mt-14">
              <RoundedButton
                label="Cancel"
                onClick={() => {}}
                className="w-full py-4 border border-solid border-black text-black font-bold"
                variant="danger"
              />
              <RoundedButton
                label="Request tour"
                onClick={() => {}}
                className="w-full py-4 bg-black text-white"
                variant="primary"
              />
            </section>
            {/* first page */}
            {/* <div className="grid grid-cols-3 gap-4 mb-8">
              <section className="rounded-2xl border-[#FF8700] border border-solid bg-[#FFF3E4] flex flex-col items-center gap-1 h-28 justify-center">
                <p className="text-[#454545] text-md uppercase text-center">
                  WED
                </p>
                <p className="font-bold text-7xl uppercase text-center text-black">
                  12
                </p>
              </section>
              <section className="rounded-2xl border-[#707070] border border-solid bg-white flex flex-col items-center gap-1 h-28 justify-center">
                <p className="text-[#454545] text-md uppercase text-center">
                  WED
                </p>
                <p className="font-bold text-7xl uppercase text-center text-[#818080]">
                  6
                </p>
              </section>
              <section className="rounded-2xl border-[#707070] border border-solid bg-white flex flex-col items-center gap-1 h-28 justify-center">
                <p className="text-[#454545] text-md uppercase text-center">
                  WED
                </p>
                <p className="font-bold text-7xl uppercase text-center text-[#818080]">
                  9
                </p>
              </section>
            </div>

            <Dropdown
              value={null}
              label="Property Status"
              labelClassName="mt-6 text-[#848484]"
              options={timeOptions}
              inputClassName="h-13 bg-[#F5F8FA] pl-9 bg-white border-black "
              onSelect={(selectedValue) => {}}
            />
            <Button
              className="w-full h-12 mt-6"
              onClick={() => {}}>
              <p className="text-white text-base">Next</p>
            </Button> */}
          </section>
          <UpcomingTourCard
            hasButton={false}
            tourDate={day}
            tourMonth={month}
            tourTime={firstTour?.eventDate?.[0]?.tourTime}
            address={shortenAddress(
              firstTour?.property?.propertyAddressDetails?.formattedAddress
            )}
            {...firstTour}
            className="w-full"
          />
        </section>
      </section>
      <section className="absolute top-0 left-0 right-0 bottom-0 z-50 bg-[#FAF9F5] overflow-hidden max-h-screen min-h-screen h-[100vh] ">
        <nav
          className={`w-full py-6 flex items-center justify-between h-[100px] px-12`}>
          <Link href="/" className="block w-64">
            <Image
              src="/assets/images/snaphomz-logo.svg"
              alt="logo"
              height={60}
              width={180}
            />
          </Link>
        </nav>
        <div className="w-full h-0.5 bg-[#EDEDED]">
          <div className="h-full w-1/5 bg-[#E8804C]"></div>
        </div>
        {/* 1st page */}
        {/* <section className="flex flex-col items-center gap-x-5 py-8 justify-between h-4/5">
          <div className='w-3/5 flex flex-col items-center h-4/5'>
          <h1 className="text-black text-3xl font-medium">Create Offer</h1>
          <p className="text-[#4D4D4D] text-lg mt-4 mb-14">
            Purchase Price Terms
          </p>
          <section className="grid grid-cols-2 w-2/5 gap-x-6 gap-y-20">
            <BorderedTextInput
              label="Purchase Price"
              labelClassName="text-base font-medium text-black"
              type="number"
              inputClassName="border-none"
              containerClass="border border-solid border-[#B2B2B2] bg-white rounded-md px-4"
              left={<p className="font-bold text-[#909090]">$</p>}
              onChange={() => {}}
              value={null}
            />
            <BorderedTextInput
              label="Initial Deposit"
              labelClassName="text-base font-medium text-black"
              type="number"
              inputClassName="border-none"
              containerClass="border border-solid border-[#B2B2B2] bg-white rounded-md px-4"
              left={<p className="font-bold text-[#909090]">$</p>}
              onChange={() => {}}
              value={null}
            />

            <BorderedTextInput
              label="Finance Type"
              labelClassName="text-base font-medium text-black"
              type="text"
              inputClassName="border-none"
              containerClass="border border-solid border-[#B2B2B2] bg-white rounded-md px-4"
              onChange={() => {}}
              value={null}
            />
            <BorderedTextInput
              label="Amount"
              labelClassName="text-base font-medium text-black"
              type="number"
              inputClassName="border-none"
              containerClass="border border-solid border-[#B2B2B2] bg-white rounded-md px-4"
              left={<p className="font-bold text-[#909090]">$</p>}
              onChange={() => {}}
              value={null}
            />
          </section>
          </div>
          <div className="flex items-center justify-between w-full px-12">
            <section className="flex items-center w-1/2">
              <RoundedButton
                label="Back"
                onClick={() => {}}
                variant="primary"
                className="w-[30%] py-3 bg-transparent border border-solid border-black"
              />
              <RoundedButton
                label="Discard & Exit"
                onClick={() => {}}
                variant="primary"
                className="w-[30%] py-3 bg-transparent text-[#E8804C]"
              />
            </section>
            <RoundedButton
                label="Save & Continue"
                onClick={() => {}}
                variant="primary"
                className="w-[10%] py-3 bg-black border border-solid border-black text-white"
              />
          </div>
        </section> */}

        {/* 2nd page */}
        {/* <section className="flex flex-col items-center gap-x-5 py-8 justify-between h-4/5 w-full">
          <div className="w-4/5 flex flex-col items-center h-4/5">
            <div className="w-full flex flex-col items-center h-4/5">
              <h1 className="text-black text-3xl font-medium">Create Offer</h1>
              <p className="text-[#4D4D4D] text-lg mt-4 mb-14">Contingencies</p>
              <section className="grid grid-cols-4 w-full gap-x-6 gap-y-20 mb-16">
                <section>
                  <p className="text-base font-medium text-black mb-4">
                    Finance Contingency
                  </p>
                  <section className="flex items-center bg-white border border-solid border-[#B2B2B2] h-14 rounded-md w-full">
                    <Dropdown
                      options={[
                        { label: 'loan', value: 'loan' },
                        { label: 'cash', value: 'cash' },
                        { label: 'contingent', value: 'contingent' },
                        { label: 'non-contingent', value: 'non-contingent' },
                        { label: 'FHA-VA loan', value: 'FHA-VA loan' }
                      ]}
                      inputClassName="h-full border-none bg-transparent text-capitalize"
                      onSelect={(selectedValue) => {}}
                      value={null}
                    />
                    <section className="w-0.5 h-3/5 bg-[#D1D9DE]" />
                    <BorderedTextInput
                      placeholder="0"
                      type="number"
                      inputClassName="border-none"
                      containerClass="border border-none rounded-none px-4"
                      onChange={() => {}}
                      value={null}
                    />
                  </section>
                </section>
                <section>
                  <p className="text-base font-medium text-black mb-4">
                    Appraisal Contingency
                  </p>
                  <section className="flex items-center bg-white border border-solid border-[#B2B2B2] h-14 rounded-md w-full">
                    <Dropdown
                      options={[
                        { label: 'loan', value: 'loan' },
                        { label: 'cash', value: 'cash' },
                        { label: 'contingent', value: 'contingent' },
                        { label: 'non-contingent', value: 'non-contingent' },
                        { label: 'FHA-VA loan', value: 'FHA-VA loan' }
                      ]}
                      inputClassName="h-full border-none bg-transparent text-capitalize"
                      onSelect={(selectedValue) => {}}
                      value={null}
                    />
                    <section className="w-0.5 h-3/5 bg-[#D1D9DE]" />
                    <BorderedTextInput
                      placeholder="0"
                      type="number"
                      inputClassName="border-none"
                      containerClass="border border-none rounded-none px-4"
                      onChange={() => {}}
                      value={null}
                    />
                  </section>
                </section>
                <section>
                  <p className="text-base font-medium text-black mb-4">
                    Inspection Contingency
                  </p>
                  <section className="flex items-center bg-white border border-solid border-[#B2B2B2] h-14 rounded-md w-full">
                    <Dropdown
                      options={[
                        { label: 'loan', value: 'loan' },
                        { label: 'cash', value: 'cash' },
                        { label: 'contingent', value: 'contingent' },
                        { label: 'non-contingent', value: 'non-contingent' },
                        { label: 'FHA-VA loan', value: 'FHA-VA loan' }
                      ]}
                      inputClassName="h-full border-none bg-transparent text-capitalize"
                      onSelect={(selectedValue) => {}}
                      value={null}
                    />
                    <section className="w-0.5 h-3/5 bg-[#D1D9DE]" />
                    <BorderedTextInput
                      placeholder="0"
                      type="number"
                      inputClassName="border-none"
                      containerClass="border border-none rounded-none px-4"
                      onChange={() => {}}
                      value={null}
                    />
                  </section>
                </section>
                <section>
                  <p className="text-base font-medium text-black mb-4">
                    Close Escrow
                  </p>
                  <section className="flex items-center bg-white border border-solid border-[#B2B2B2] h-14 rounded-md w-full">
                    <Dropdown
                      options={[
                        { label: 'loan', value: 'loan' },
                        { label: 'cash', value: 'cash' },
                        { label: 'contingent', value: 'contingent' },
                        { label: 'non-contingent', value: 'non-contingent' },
                        { label: 'FHA-VA loan', value: 'FHA-VA loan' }
                      ]}
                      inputClassName="h-full border-none bg-transparent text-capitalize"
                      onSelect={(selectedValue) => {}}
                      value={null}
                    />
                    <section className="w-0.5 h-3/5 bg-[#D1D9DE]" />
                    <BorderedTextInput
                      placeholder="0"
                      type="number"
                      inputClassName="border-none"
                      containerClass="border border-none rounded-none px-4"
                      onChange={() => {}}
                      value={null}
                    />
                  </section>
                </section>
              </section>
              <BorderedTextArea
              labelClassName='text-base font-medium text-black mb-4'
                label="Special Terms"
                placeholder="Add a note"
                type="text"
                className="h-full"
                inputClassName="border border-solid border-[#D5D9DC] focus:border-[#FF8700] disabled:border-0 disabled:bg-[#ACACAC] rounded-md px-4 w-full h-full bg-white"
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-full px-12">
            <section className="flex items-center w-1/2">
              <RoundedButton
                label="Back"
                onClick={() => {}}
                variant="primary"
                className="w-[30%] py-3 bg-transparent border border-solid border-black"
              />
              <RoundedButton
                label="Discard & Exit"
                onClick={() => {}}
                variant="primary"
                className="w-[30%] py-3 bg-transparent text-[#E8804C]"
              />
            </section>
            <RoundedButton
              label="Save & Continue"
              onClick={() => {}}
              variant="primary"
              className="w-[10%] py-3 bg-black border border-solid border-black text-white"
            />
          </div>
        </section> */}

        {/* 3RD ONE */}
        {/* <section className="flex flex-col items-center gap-x-5 py-8 justify-between h-4/5 w-full">
          <div className="w-4/5 flex flex-col items-center h-4/5">
            <div className="w-full flex flex-col items-center h-4/5">
              <h1 className="text-black text-3xl font-medium">Create Offer</h1>
              <p className="text-[#4D4D4D] text-lg mt-4 mb-14">Documents</p>
              <CustomFileInputBuyer handleFile={undefined} />
              <section className="grid grid-cols-2 mt-6 gap-7">
                <CardItem
                  title="Pre-Approval"
                  updatedDate="Updated Dec 18, 2023 03:02 PM"
                />
                <CardItem
                  title="Pre-Approval"
                  updatedDate="Updated Dec 18, 2023 03:02 PM"
                />
                <CardItem
                  title="Pre-Approval"
                  updatedDate="Updated Dec 18, 2023 03:02 PM"
                />
                <CardItem
                  title="Pre-Approval"
                  updatedDate="Updated Dec 18, 2023 03:02 PM"
                />
              </section>
            </div>
          </div>
          <div className="flex items-center justify-between w-full px-12">
            <section className="flex items-center w-1/2">
              <RoundedButton
                label="Back"
                onClick={() => {}}
                variant="primary"
                className="w-[30%] py-3 bg-transparent border border-solid border-black"
              />
              <RoundedButton
                label="Discard & Exit"
                onClick={() => {}}
                variant="primary"
                className="w-[30%] py-3 bg-transparent text-[#E8804C]"
              />
            </section>
            <RoundedButton
              label="Save & Continue"
              onClick={() => {}}
              variant="primary"
              className="w-[10%] py-3 bg-black border border-solid border-black text-white"
            />
          </div>
        </section> */}

        {/* 4th one */}
        <section className="flex flex-col items-center gap-x-5 py-8 justify-between h-4/5 w-full">
          <div className="w-4/5 flex flex-col items-center h-4/5">
            <div className="w-full flex flex-col items-center justify-center h-4/5">
              <h1 className="text-black text-3xl font-medium">Create Offer</h1>
              <p className="text-[#4D4D4D] text-lg mt-4 mb-14">
                Message to Agent
              </p>

              <BorderedTextArea
                placeholder="Add a note"
                type="text"
                className="h-full flex items-center justify-center "
                inputClassName="border border-solid border-[#D5D9DC] focus:border-[#FF8700] disabled:border-0 disabled:bg-[#ACACAC] rounded-md px-4 w-4/5 h-full"
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-full px-12">
            <section className="flex items-center w-1/2">
              <RoundedButton
                label="Back"
                onClick={() => {}}
                variant="primary"
                className="w-[30%] py-3 bg-transparent border border-solid border-black"
              />
              <RoundedButton
                label="Discard & Exit"
                onClick={() => {}}
                variant="primary"
                className="w-[30%] py-3 bg-transparent text-[#E8804C]"
              />
            </section>
            <RoundedButton
              label="Save & Continue"
              onClick={() => {}}
              variant="primary"
              className="w-[10%] py-3 bg-black border border-solid border-black text-white"
            />
          </div>
        </section>
      </section>
    </>
  )
}

export default PropertyInformation
