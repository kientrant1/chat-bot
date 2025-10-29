import ClientGuard from '@/components/authen/ClientGuard'
import ChatContainer from '@/components/ChatContainer'

export default function Home() {
  return (
    <ClientGuard requireAuth={true}>
      <ChatContainer />
    </ClientGuard>
  )
}
