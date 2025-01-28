import Image from 'next/image'

interface OnboardingStepsCounterProps {
  currentPage: number
}

export default function OnboardingStepsCounter({
  currentPage
}: OnboardingStepsCounterProps) {
  return (
    <section className="flex justify-between mb-24">
      <p className="text-[#535353] text-base font-light">
        STEP {currentPage} OF 3
      </p>
      <div className="flex items-center gap-1">
        <p className="text-[black] text-base font-light">Having trouble?</p>
        <p className="text-[#FF8700] text-base font-semibold">Get help</p>
        <div>
          <Image
            src="/assets/images/icons/arrow-right.svg"
            alt="right-arrow"
            className="object-contain"
            height={8}
            width={16}
          />
        </div>
      </div>
    </section>
  )
}
