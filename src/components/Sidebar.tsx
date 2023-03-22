import React from 'react'

const Sidebar = () => {
  const rooms = ['general', 'tech', 'finance', 'crypto']

  return (
    <div className='h-full'>
      <h2 className='py-3 text-3xl font-bold'>Available rooms</h2>
      <div className='border border-gray-300'>
        {rooms.map((room, index) => (
          <div
            key={index}
            className={`${rooms.length - 1 !== index && 'border-b'} border-gray-300 p-3`}
          >
            {room}
          </div>
        ))}
      </div>
      <h2 className='py-3 text-3xl font-bold'>Members</h2>
    </div>
  )
}

export default Sidebar
