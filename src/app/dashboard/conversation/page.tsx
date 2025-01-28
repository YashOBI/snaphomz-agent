'use client'

import { Button } from 'components/common/buttons/Button'
import { SearchInput } from 'components/common/inputs/SearchInput'
import ConversationTab from 'components/dashboard/conversation/conversation-tab'
import Conversations from 'components/dashboard/conversation/conversations'
import { MessageFileSelect } from 'components/messages/MessageFileSelect'
import { MessageItem } from 'components/messages/MessageItem'
import { PropertyTransactionItem } from 'components/overview/PropertyTransactionItem'
import React from 'react'
import { getRandomColor } from 'utils/randomColor'
import { cn } from 'utils/styleUtilities'

const Messages = () => {
  return <ConversationTab/>
}

export default Messages
