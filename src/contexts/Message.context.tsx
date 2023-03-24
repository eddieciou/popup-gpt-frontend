import React, { createContext, useContext, useMemo, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { TUser } from '../types/commons.type'

const SOCKET_URL = 'http://192.168.0.102:5001'

type TMessageContext = {
  rooms: Array<string> | []
  setRooms: (room: Array<string> | []) => void
  currentRoom: string
  setCurrentRoom: (currentRoom: string) => void
  members: Array<TUser> | []
  setMembers: (members: Array<TUser> | []) => void
  messages: Array<object> | []
  setMessages: (messages: Array<object> | []) => void
  privateMemberMessage: object
  setPrivateMemberMessage: (privateMemberMessage: object) => void
  newMessages: object
  setNewMessages: (newMessages: object) => void
  socket: Socket | null
}

const MessageContext = createContext<TMessageContext>({
  rooms: [],
  setRooms: () => null,
  currentRoom: '',
  setCurrentRoom: () => null,
  members: [],
  setMembers: () => null,
  messages: [],
  setMessages: () => null,
  privateMemberMessage: {},
  setPrivateMemberMessage: () => null,
  newMessages: {},
  setNewMessages: () => null,
  socket: null,
})

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [rooms, setRooms] = useState<Array<string> | []>([])
  const [currentRoom, setCurrentRoom] = useState('')
  const [members, setMembers] = useState<Array<TUser> | []>([])
  const [messages, setMessages] = useState<Array<object> | []>([])
  const [privateMemberMessage, setPrivateMemberMessage] = useState<object>({})
  const [newMessages, setNewMessages] = useState<object>({})

  const socket = io(SOCKET_URL)

  const value = useMemo(
    () => ({
      socket,
      rooms,
      currentRoom,
      members,
      messages,
      privateMemberMessage,
      newMessages,
      setRooms,
      setCurrentRoom,
      setMembers,
      setMessages,
      setPrivateMemberMessage,
      setNewMessages,
    }),
    [rooms, currentRoom, members, messages, privateMemberMessage, newMessages],
  )

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
}

export const useMessage = () => useContext(MessageContext)