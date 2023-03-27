import React, { createRef, FormEvent, useEffect, useState } from 'react'
import { BsFillSendFill } from 'react-icons/bs'
import { useMessage } from '../contexts/Message.context'
import { useAuth } from '../contexts/Auth.context'

const MessageForm = () => {
  const [message, setMessage] = useState('')

  const { user } = useAuth()
  const { socket, currentRoom, messages, setMessages } = useMessage()
  const messageEndRef = createRef<HTMLDivElement>()

  const getFormattedDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    let month = (1 + date.getMonth()).toString()
    month = month.length > 1 ? month : '0' + month
    let day = date.getDate().toString()
    day = day.length > 1 ? day : '0' + day

    return `${month}/${day}/${year}`
  }

  const todayDate = getFormattedDate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!message) return
    const today = new Date()
    const minutes =
      today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes().toString()
    const time = `${today.getHours()}:${minutes}`
    socket?.emit('message-room', currentRoom, message, user, time, todayDate)
    setMessage('')
  }

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    socket?.on('room-messages', (roomMessages) => {
      setMessages(roomMessages)
    })
    socket?.emit('join-room', currentRoom)

    return () => {
      socket?.off('room-messages')
    }
  }, [currentRoom])

  return (
    <div className='flex h-full flex-col justify-center gap-6'>
      <div className='h-[80vh] overflow-y-scroll border border-gray-300 scrollbar-thin scrollbar-track-blue-100 scrollbar-thumb-blue-700'>
        {messages.map(({ _id: date, messagesByDate }) => (
          <div key={date}>
            <p className='text-center text-gray-500'>{date}</p>
            <div className='flex flex-col gap-2 px-5 pb-4'>
              {messagesByDate.map(({ content, time, _id, from: sender }) => (
                <div
                  key={_id}
                  className={`flex ${sender._id === user?._id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      flex min-w-[20vh] max-w-md flex-col gap-2 rounded-md p-3
                      ${sender._id === user?._id ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                  >
                    <div className='flex items-center gap-2 font-bold'>
                      <img src={sender.picture} className='h-10 w-10 rounded-full object-cover' />
                      <p>{sender._id === user?._id ? '自己' : sender.name}</p>
                    </div>
                    <div>{content}</div>
                    <div className='text-xs'>{time}</div>
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
          </div>
        ))}
      </div>
      <form className='flex gap-4' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Your message'
          className='w-11/12 border border-gray-300 p-2 focus:outline-none'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type='submit'
          className='flex h-full w-1/12 items-center justify-center rounded-md bg-orange-500 focus:outline-none hover:bg-orange-400'
        >
          <BsFillSendFill className='text-white' size='25' />
        </button>
      </form>
    </div>
  )
}

export default MessageForm
