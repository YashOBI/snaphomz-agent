'use client'

import { RoundedButton } from 'components/common/buttons/RoundedButton'
import { useAtom } from 'jotai'
import { useAuthApi } from 'lib/api/auth'
import Image from 'next/image'
import React, { useState } from 'react'
import { agentReadWriteAtom } from 'store/atoms/agent-atom'

type NavsideRightProps = {
  hasbutton?: boolean
}

const NavRightSide: React.FC<NavsideRightProps> = ({ hasbutton = true }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false)
  const { LogoutAction } = useAuthApi()

  const handleMouseEnter = () => setDropdownVisible(true)
  const handleMouseLeave = () => setDropdownVisible(false)

  const [agentState, setAgentState] = useAtom(agentReadWriteAtom)

  const handleSwitchAgentType = () => {
    const newAgentType =
      agentState?.user?.agentType === 'buyer_agent'
        ? 'seller_agent'
        : 'buyer_agent'

    // Update the agentType in the state
    setAgentState({
      ...agentState,
      user: agentState.user
        ? { ...agentState.user, agentType: newAgentType }
        : undefined,
    })
  }

  return (
    <section className="items-center flex gap-4 justify-end">
      {hasbutton ? (
        <>
          <RoundedButton
            variant="secondary"
            className="border-2 border-black bg-transparent text-black font-bold py-2"
            label={
              agentState?.user?.agentType === 'buyer_agent'
                ? 'Switch to Seller'
                : 'Switch to Buyer'
            }
            onClick={handleSwitchAgentType}
          />
        </>
      ) : (
        <Image
          height={30}
          width={30}
          src="/assets/images/icons/notification.svg"
          alt="Dropdown Arrow"
          className=""
        />
      )}

      <div className="rounded-full h-10 w-10 items-center justify-center flex bg-black">
        {agentState?.user?.firstName ? (
          <p className="text-sm text-white uppercase">
            {agentState?.user?.firstName[0]}
            {agentState?.user?.lastName[0]}
          </p>
        ) : (
          <p className="text-sm text-white uppercase">NA</p>
        )}
      </div>
      <section
        className="relative flex items-center gap-2 cursor-pointer"
        onMouseEnter={handleMouseEnter}>
        <p className="text-sm text-black capitalize font-medium">
          {agentState?.user?.firstName}
        </p>
        <Image
          height={13}
          width={13}
          src="/assets/images/icons/dropdownArrow.svg"
          alt="Dropdown Arrow"
          className=""
        />
        {isDropdownVisible && (
          <div
            className="absolute top-full mt-6 right-0 bg-white border border-gray-200 shadow-lg rounded-lg z-50 w-56"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <ul className="flex flex-col">
              <li className="px-7 py-4 hover:bg-gray-100 cursor-pointer">
                Profile
              </li>
              <li className="px-7 py-4 hover:bg-gray-100 cursor-pointer">
                Settings
              </li>
              <li
                className="px-7 py-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => LogoutAction()}>
                Logout
              </li>
            </ul>
          </div>
        )}
      </section>
    </section>
  )
}

export default NavRightSide
