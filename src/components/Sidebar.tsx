import React, { useEffect } from 'react'
import { useMessage } from '../contexts/Message.context'
import { TUser } from '../types/commons.type'
import { getRooms } from '../services/appApi.service'
import { useAuth } from '../contexts/Auth.context'

const Sidebar = () => {
  const {
    socket,
    members,
    setMembers,
    rooms,
    setRooms,
    setCurrentRoom,
    setPrivateMemberMessage,
    currentRoom,
    privateMemberMessage,
    newMessages,
    setNewMessages,
  } = useMessage()

  const { user, setUser } = useAuth()

  useEffect(() => {
    getRooms().then((result: Array<string>) => {
      setRooms(result)
      setCurrentRoom(result[0])
      setNewMessages({ ...newMessages, [result[0]]: 0 })
      socket?.emit('join-room', result[0])
    })
    socket?.emit('new-user')
  }, [])

  useEffect(() => {
    socket?.off('new-user').on('new-user', (payload: Array<TUser>) => {
      setMembers(payload)
    })
  }, [members])

  const joinRoom = (room: string, isPublic = true) => {
    setCurrentRoom(room)
    if (isPublic) {
      setPrivateMemberMessage(null)
    }
    if (user) {
      setUser({ ...user, newMessages: { ...newMessages, [room]: 0 } })
    }
    setNewMessages({ ...newMessages, [room]: 0 })
  }

  useEffect(() => {
    socket?.on('notifications', (room: string) => {
      if (currentRoom !== room) {
        setNewMessages({ ...newMessages, [room]: newMessages[room] ? newMessages[room] + 1 : 1 })
        if (user) {
          setUser({
            ...user,
            newMessages: { ...newMessages, [room]: newMessages[room] ? newMessages[room] + 1 : 1 },
          })
        }
      }
    })
    return () => {
      socket?.off('notifications')
    }
  }, [currentRoom, newMessages])

  const orderIds = (id1: string, id2: string) => (id1 > id2 ? `${id1}-${id2}` : `${id2}-${id1}`)

  const handlePrivateMemberMessage = (member: TUser) => {
    setPrivateMemberMessage(member)
    const roomId = orderIds(user?._id || '', member._id)
    joinRoom(roomId, false)
  }

  const cleanMembers = members.filter((member) => member._id !== user?._id)

  return (
    <div className='h-full'>
      <h2 className='py-3 text-3xl font-bold'>Available rooms</h2>
      <div className='scrollbar-hide h-[30vh] overflow-y-scroll rounded-md'>
        {rooms.map((room, index) => (
          <div
            key={index}
            className={`flex cursor-pointer items-center justify-between border border-gray-300 p-3
            ${room !== currentRoom && 'hover:bg-gray-100'}
            ${index === 0 && 'rounded-t-md'}
            ${rooms.length - 1 !== index && 'border-b-0'}
            ${rooms.length - 1 === index && 'rounded-b-md'}
            ${room === currentRoom && 'bg-blue-600 text-white'}`}
            onClick={() => {
              joinRoom(room)
            }}
          >
            <div>{room}</div>
            {newMessages[room] !== 0 && newMessages[room] && (
              <div className='flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 p-2 font-bold text-white'>
                {newMessages[room]}
              </div>
            )}
          </div>
        ))}
      </div>
      <h2 className='py-3 text-3xl font-bold'>Members</h2>
      <div className='scrollbar-hide h-[47vh] overflow-y-scroll rounded-md'>
        {cleanMembers.map((member, index) => (
          <div
            key={member._id}
            className={`flex cursor-pointer items-center justify-between  border border-gray-300 p-3
            ${privateMemberMessage?._id === member._id && 'bg-blue-600 text-white'}
            ${privateMemberMessage?._id !== member._id && 'hover:bg-gray-100'}
            ${index === 0 && 'rounded-t-md'}
            ${cleanMembers.length - 1 !== index && 'border-b-0'}
            ${cleanMembers.length - 1 === index && 'rounded-b-md'}
            `}
            onClick={() => handlePrivateMemberMessage(member)}
          >
            <div className='flex items-center gap-5'>
              <div className='relative'>
                <img src={member.picture} className='h-10 w-10 rounded-full object-cover' />
                <div
                  className={`absolute bottom-0 left-1 h-2 w-2 rounded-full ${
                    member.status === 'online' ? 'bg-green-500' : 'bg-orange-500'
                  }`}
                />
              </div>
              <div>{member.name}</div>
            </div>
            {newMessages[orderIds(user?._id || '', member._id)] !== 0 &&
              newMessages[orderIds(user?._id || '', member._id)] && (
                <div className='flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 p-2 font-bold text-white'>
                  {newMessages[orderIds(user?._id || '', member._id)]}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
