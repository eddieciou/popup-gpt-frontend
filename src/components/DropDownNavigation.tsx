import React, { useState } from 'react'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { RiLogoutBoxFill } from 'react-icons/ri'
import { useAuth } from '../contexts/Auth.context'
import { useNavigate } from 'react-router-dom'

interface IDropDownNavigationProps {
  title: string
}

const DropDownNavigation = ({ title }: IDropDownNavigationProps) => {
  const [dropDown, setDropDown] = useState(false)

  const { setUser } = useAuth()
  const navigate = useNavigate()

  return (
    <button
      className='relative flex items-center gap-1'
      onBlur={() => setDropDown(false)}
      onClick={() => setDropDown(!dropDown)}
    >
      <p>{title}</p>
      <span className=''>{dropDown ? <AiFillCaretUp /> : <AiFillCaretDown />}</span>
      <div
        className={`absolute top-full right-0 mt-1 grid w-max min-w-full gap-2 rounded-md bg-gray-200 p-2 text-left ${
          !dropDown && 'hidden'
        }`}
      >
        <div
          className='flex items-center justify-center gap-2 p-2 font-bold text-red-600 hover:text-white'
          onClick={() => {
            setUser(null)
            navigate('/', { replace: true })
          }}
        >
          <RiLogoutBoxFill color='red' size='20' />
          Logout
        </div>
      </div>
    </button>
  )
}

export default DropDownNavigation
