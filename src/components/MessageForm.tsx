import React, { FormEvent } from 'react'
import { BsFillSendFill } from 'react-icons/bs'

const MessageForm = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className='flex h-full flex-col justify-center gap-6'>
      <div className='h-[80vh] border border-gray-300'></div>
      <form className='flex gap-4' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Your message'
          className='w-11/12 border border-gray-300 p-2 focus:outline-none'
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
