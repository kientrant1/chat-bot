'use client'

import { useSession } from 'next-auth/react'
import ChatContainer from './ChatContainer'

export default function ChatContainerWrapper() {
  const { data: session } = useSession()

  if (!session) return <></>

  return <ChatContainer userName={session?.user.name || 'User'} />
}
