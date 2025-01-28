import { RoundedButton } from 'components/common/buttons/RoundedButton'
import { PropertyTransactionItem } from 'components/overview/PropertyTransactionItem'
import React from 'react'
import { formatNumber } from 'utils/mathutilities'

type ButtonType = 'submit' | 'reset' | 'button'
interface summaryTermsCardProps {
  offerPrice: number
  loanAmount: number
  financeType: string
  downPayment: number
  financeContingency: number
  financeContingencyunit: string
  apprasalContingency: boolean
  inspectionContingency: number
  inspectionContingencyunit: string
  closeEscrow: boolean
  label: string
  submitLabel: string
  buttonType: ButtonType
  onClickCancel: () => void
  onClickSubmit: () => void
  loading: boolean
}
const SummaryTermsCard: React.FC<summaryTermsCardProps> = ({
  offerPrice,
  loanAmount,
  financeType,
  downPayment,
  financeContingency,
  financeContingencyunit,
  apprasalContingency,
  inspectionContingency,
  inspectionContingencyunit,
  closeEscrow,
  label,
  submitLabel,
  buttonType,
  onClickCancel,
  onClickSubmit,
  loading
}) => {
  return (
    <section className="w-4/12">
      <PropertyTransactionItem
        className="w-full"
        showTransactionInformation={false}
      />
      <p className="font-bold text-2xl mt-6">Summary of Terms</p>
      <section className="bg-[#F8F8F8] grid grid-cols-2 py-4 px-6 gap-10 rounded-lg mt-10">
        <section className="">
          <h3 className="text-[#777777] text-sm font-medium">Offer Price</h3>
          <h3 className="text-black text-xl font-medium">
            {formatNumber(offerPrice)}
          </h3>
        </section>
        <section className="">
          <h3 className="text-[#777777] text-sm font-medium">Loan Amount</h3>
          <h3 className="text-black text-base font-medium">
            {formatNumber(loanAmount)}
          </h3>
        </section>

        <section className="">
          <h3 className="text-[#777777] text-sm font-medium">Finance Type</h3>
          <h3 className="text-black text-base font-medium">{financeType}</h3>
        </section>
        <section className="">
          <h3 className="text-[#777777] text-sm font-medium">Down Payment</h3>
          <h3 className="text-black text-base font-medium">
            {formatNumber(downPayment)}
          </h3>
        </section>
        <section className="">
          <h3 className="text-[#777777] text-sm font-medium">
            Finance Contingency
          </h3>
          <h3 className="text-black text-base font-medium">{`${financeContingency} ${financeContingencyunit}`}</h3>
        </section>
        <section className="">
          <h3 className="text-[#777777] text-sm font-medium">
            Appraisal Contingency
          </h3>
          <h3 className="text-black text-base font-medium">
            {apprasalContingency === true ? 'true' : 'waived'}
          </h3>
        </section>
        <section className="">
          <h3 className="text-[#777777] text-sm font-medium">
            Inspection Contingency
          </h3>
          <h3 className="text-black text-base font-medium">{`${inspectionContingency} ${inspectionContingencyunit}`}</h3>
        </section>
        <section className="">
          <h3 className="text-[#777777] text-sm font-medium">Close Escrow</h3>
          <h3 className="text-black text-base font-medium">
            {closeEscrow === true ? 'true' : 'waived'}
          </h3>
        </section>

        <section className="my-5 w-full">
          <RoundedButton
            label={label}
            onClick={onClickCancel}
            variant={'primary'}
            className="py-2 text-black border border-solid border-black w-full px-6"
          />
        </section>
        <section className="my-5 w-full">
          <RoundedButton
            label={submitLabel}
            type={buttonType}
            onClick={onClickSubmit}
            loading={loading}
            variant={'primary'}
            className="py-2 text-white bg-black px-6 w-full"
          />
        </section>
      </section>
    </section>
  )
}

export default SummaryTermsCard
