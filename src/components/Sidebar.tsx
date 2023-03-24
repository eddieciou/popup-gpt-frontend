import React, { useEffect } from 'react'
import { useMessage } from '../contexts/Message.context'
import { TUser } from '../types/commons.type'
import { getRooms } from '../services/appApi.service'

const Sidebar = () => {
  const { socket, members, setMembers, rooms, setRooms, setCurrentRoom } = useMessage()

  useEffect(() => {
    getRooms().then((result: Array<string>) => {
      setRooms(result)
      setCurrentRoom(result[0])
      socket?.emit('join-room', result[0])
    })
    socket?.emit('new-user')
  }, [])

  useEffect(() => {
    socket?.off('new-user').on('new-user', (payload: Array<TUser>) => {
      setMembers(payload)
    })
  }, [members])

  return (
    <div className='h-full'>
      <h2 className='py-3 text-3xl font-bold'>Available rooms</h2>
      <div className='scrollbar-hide h-[30vh] overflow-y-scroll'>
        {rooms.map((room, index) => (
          <div
            key={index}
            className={`cursor-pointer border border-gray-300 p-3 hover:bg-gray-100 ${
              rooms.length - 1 !== index && 'border-b-0'
            }`}
          >
            {room}
          </div>
        ))}
      </div>
      <h2 className='py-3 text-3xl font-bold'>Members</h2>
      <div className='scrollbar-hide h-[47vh] overflow-y-scroll'>
        {members.map((member, index) => (
          <div
            key={member._id}
            className={`cursor-pointer border border-gray-300 p-3 hover:bg-gray-100 ${
              members.length - 1 !== index && 'border-b-0'
            } `}
          >
            {member.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
