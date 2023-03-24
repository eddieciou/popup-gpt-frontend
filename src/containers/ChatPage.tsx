import React from 'react'
import Sidebar from '../components/Sidebar'
import MessageForm from '../components/MessageForm'
import { MessageProvider } from '../contexts/Message.context'

const ChatPage = () => {
  return (
    <MessageProvider>
      <div className='container mx-auto flex grow gap-10'>
        <div className='h-full w-1/3'>
          <Sidebar />
        </div>
        <div className='h-full w-2/3'>
          <MessageForm />
        </div>
      </div>
    </MessageProvider>
  )
}

export default ChatPage
