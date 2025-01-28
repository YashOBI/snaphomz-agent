import { IFormattedProperty } from './formattedProperty'

export interface IBuyerOffer {
  agentApproval?: boolean
  agentApprovalDate?: null
  apprasalContingency?: boolean
  buyer?: IBuyer
  buyerAgent?: IPropertyAgent
  closeEscrow?: false
  createdAt?: string
  currentStatus?: string
  documents?: []
  _id?: string
  downPayment?: IPrice
  financeContingency?: IContingency
  financeType?: string
  inspectionContingency?: IContingency
  loanAmount?: IPrice
  offerCreator?: string
  offerPrice?: IPrice
  offerType?: string
  property?: IFormattedProperty
  status?: Status[]
  seller?: IBuyer
  sellerAgent?: IPropertyAgent
  submitWithOutAgentApproval?: boolean
  updatedAt?: string
  onClick?: () => void
  handleAcceptOffer?: () => void
}

export interface IBuyer {
  account_type: string
  createdAt: string
  email: string
  emailVerified: boolean
  firstName: string
  fullname: string
  lastName: string
  mobile: IMobile
  preApproval: boolean
  preApprovalDocument: {
    url: string
    expiryDate: string
  }
  propertyPreference: {
    financialProcess: string
    onboardingCompleted: boolean
    preApprovalAffiliates: boolean
    propertyType: string
    spendAmount: {
      max: number
      min: number
    }
    workWithLender: boolean
  }

  stripe_customer_id: string
  token_expiry_time: string
  updatedAt: string
  verification_code: string
  __v: number
  _id: string
}

interface IMobile {
  number_body: string
  mobile_extension: string
  raw_mobile: string
  _id: string
}

interface IPrice {
  amount: number
  currency: string
}
interface IContingency {
  amount: string
  unit: string
}
interface IPropertyAgent {
  completedOnboarding: boolean
  connectedUsers: string[]
  createdAt: string
  email: string
  emailVerified: boolean
  firstName: string
  fullname: string
  lastName: string
  licence_number: string
  mobile: IMobile
  region: string
  token_expiry_time: string | null
  updatedAt: string
  verification_code: string
  __v: number
  _id: string
}

interface Status {
  status: string
  eventTime: string
  _id: string
}
