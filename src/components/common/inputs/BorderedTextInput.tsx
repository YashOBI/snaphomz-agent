import React, { ReactNode } from 'react'
import { cn } from 'utils/styleUtilities'

type ITextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  labelClassName?: string
  inputClassName?: string
  containerClass?: string
  right?: ReactNode
  left?: ReactNode
  error?: string
}

const BorderedTextInput: React.FC<ITextInputProps> = ({
  className,
  label,
  labelClassName,
  inputClassName,
  error,
  right,
  left,
  containerClass,
  ...props
}) => {
  return (
    <div className={cn('h-14 w-full', className)}>
      {label ? (
        <label
          className={cn(
            `mb-2 block text-sm font-normal text-[#848484]`,
            labelClassName
          )}>
          {label}
        </label>
      ) : null}
      <div className={cn('flex items-center w-full h-full', containerClass)}>
        {left ? left : null}
        <input
          {...props}
          className={cn(
            'peer h-full w-full border font-satoshi border-[#D5D9DC] bg-transparent text-sm font-normal text-[#0B1D2E] outline-none transition-all placeholder-shown:border-[#D5D9DC] focus:border-[#FF8700] disabled:border-0 disabled:bg-[#ACACAC] rounded-md px-4 items-center',
            inputClassName
          )}
        />
        {right ? right : null}
      </div>
      {error ? <p className="text-xs text-red-600 my-1">{error}</p> : null}
    </div>
  )
}

export { BorderedTextInput }
