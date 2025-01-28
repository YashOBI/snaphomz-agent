'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import { Button } from 'components/common/buttons/Button'
import { useSideNavItems, SideNavItemProps } from './hook'
import { cn } from 'utils/styleUtilities'

const SideNav: React.FC = () => {
  const pathname = usePathname()
  const sideNavItems: SideNavItemProps[] = useSideNavItems()
  return (
    <section className="flex flex-col gap-y-4 w-full h-full border-r border-[#C2C2C2]">
      {sideNavItems.map((items, index) => {
        const isActive = pathname === items.link
        return (
          <Link
            key={index}
            href={items.link}
            className={cn(
              'flex w-10/12 md:justify-start rounded-lg capitalize',
              {
                'bg-[#FFD6C2]': isActive,
                'hover:bg-[#FFD6C2]': !isActive
              }
            )}>
            <Button
              className={cn(
                'gap-x-4 py-2 px-4 justify-start  bg-inherit w-full',
                {
                  'text-[#E14B00]': isActive,
                  'text-black': !isActive,
                  'hover:text-[#E14B00]': !isActive
                }
              )}>
              <div className="flex justify-center items-center bg-white rounded-full h-10 w-10 ">
                <Image
                  src={items.Icon}
                  alt={items.alt}
                  width={18}
                  height={20}
                />
              </div>
              <p className="font-normal text-base flex items-center capitalize">
                {items.Title}
              </p>
            </Button>
          </Link>
        )
      })}
    </section>
  )
}

export { SideNav }
