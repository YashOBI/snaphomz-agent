'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavLinks from 'app/ui/dashboard/nav-links'
import NavRightSide from 'app/ui/dashboard/nav-right'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      className={`w-full py-6 flex items-center justify-between h-[100px] fixed top-0 z-10 px-12 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <Link href="/" className="block w-64">
        <Image
          src="/assets/images/snaphomz-logo.svg"
          alt="logo"
          height={60}
          width={180}
        />
      </Link>
      <section className="md:w-9/12 flex items-center justify-end">
        <section className="mr-12 flex items-center">
          <NavLinks />
        </section>
        <NavRightSide />
      </section>
    </nav>
  )
}

export { Navbar }
