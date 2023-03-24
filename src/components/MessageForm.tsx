import React, { FormEvent, useState } from 'react'
import { BsFillSendFill } from 'react-icons/bs'
import { useMessage } from '../contexts/Message.context'
import { useAuth } from '../contexts/Auth.context'

const MessageForm = () => {
  const [message, setMessage] = useState('')

  const { user } = useAuth()
  const { socket, currentRoom, messages, setMessages } = useMessage()

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

  socket?.off('room-messages').on('room-messages', (roomMessages) => {
    console.log(roomMessages)
    setMessages(roomMessages)
  })

  return (
    <div className='flex h-full flex-col justify-center gap-6'>
      <div className='h-[80vh] border border-gray-300'></div>
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
          className='flex h-full w-1/12 items-center justify-center rounded-md bg-orange-500 hover:bg-orange-400 focus:outline-none'
        >
          <BsFillSendFill className='text-white' size='25' />
        </button>
      </form>
    </div>
  )
}

export default MessageForm
