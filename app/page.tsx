import ServerGuard from '@/components/authen/ServerGuard'
import ChatContainerWrapper from '@/components/ChatContainerWrapper'

export default function Home() {
  return (
    <ServerGuard>
      <ChatContainerWrapper />
    </ServerGuard>
  )
}
