import { useSingleProperty } from 'hooks/usePropertyOffer'
import { useParams } from 'next/navigation'

export type SideNavItemProps = {
  Title: string
  Icon: string
  alt: string

  link: string
}

export const useSideNavItems = () => {
  const params = useParams()
  const propertyId = params?.id as string
  const id = params?.id
  const {
    data: singlePropertyData,
    isLoading: singlePropertyLoading,
    refetch: refetchSinglePropertyData
  } = useSingleProperty(id as string)
  const selectedProperty = singlePropertyData?.data?.property

  const sideNavItems: SideNavItemProps[] = [
    {
      Title: 'Overview',
      Icon: '/assets/images/icons/overview.svg',
      alt: 'overview image',

      link: `/dashboard/sell/${selectedProperty?._id}`
    },
    {
      Title: 'Transaction',
      Icon: '/assets/images/icons/transaction.svg',
      alt: 'tranasaction image',

      link: `/dashboard/sell/${selectedProperty?._id}/transaction`
    },
    {
      Title: 'Analytics',
      Icon: '/assets/images/icons/analytics.svg',
      alt: 'analytics image',

      link: `/dashboard/sell/${selectedProperty?._id}/analytics`
    },
    {
      Title: 'Agreements',
      Icon: '/assets/images/icons/agreements.svg',
      alt: 'agreements image',

      link: `/dashboard/sell/${selectedProperty?._id}/agreement`
    },
    {
      Title: 'Documents',
      Icon: '/assets/images/icons/documents.svg',
      alt: 'documents image',

      link: `/dashboard/sell/${selectedProperty?._id}/document`
    },
    {
      Title: 'Offers',
      Icon: '/assets/images/icons/offers.svg',
      alt: 'offer image',

      link: `/dashboard/sell/${selectedProperty?._id}/offers`
    },
    {
      Title: 'Conversation',
      Icon: '/assets/images/icons/conversation.svg',
      alt: 'conversation image',

      link: `/dashboard/sell/${selectedProperty?._id}/messages`
    },
    {
      Title: 'Tour',
      Icon: '/assets/images/icons/calendar.svg',
      alt: 'Calendar image',

      link: `/dashboard/sell/${selectedProperty?._id}/upcomingTour`
    }
  ]

  return sideNavItems
}
