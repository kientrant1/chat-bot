import ServerGuard from '@/components/authen/ServerGuard'
import ChatContainer from '@/components/ChatContainer'

export default function Home() {
  return (
    <ServerGuard>
      <ChatContainer />
    </ServerGuard>
  )
}
