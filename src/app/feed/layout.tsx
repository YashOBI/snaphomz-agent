import { Navbar } from 'app/ui/dashboard/nav-bar'
import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'OC-Snaphomz Agent Feed',
  description: 'OC-Snaphomz Estate Agent'
}

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="box-border bg-[#FAF9F5]">
      <Navbar />
      {children}
    </section>
  )
}
