export type TUser = {
  _id: string
  name: string
  email: string
  picture: string
  newMessage: object
  status: string
}

export type TMessageByDay = {
  _id: string
  content: string
  date: string
  from: TUser
  time: string
  to: string
}

export type TMessages = {
  _id: string
  messagesByDate: Array<TMessageByDay>
}

export type TNewMessage = {
  [room: string]: number
}
