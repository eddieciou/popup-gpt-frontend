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

  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  return (
    <button
      className='relative flex items-center gap-1'
      onBlur={() => setDropDown(false)}
      onClick={() => setDropDown(!dropDown)}
      disabled={!user}
    >
      <p>{title}</p>
      {user && <span className=''>{dropDown ? <AiFillCaretUp /> : <AiFillCaretDown />}</span>}
      <div
        className={`absolute top-full right-0 mt-1 grid w-max min-w-full gap-2 rounded-md bg-gray-200 p-2 text-left ${
          !dropDown && 'hidden'
        }`}
      >
        {user && (
          <div
            className='flex items-center justify-center gap-2 p-2 font-bold text-red-600 hover:text-red-700'
            onClick={() => {
              setUser(null)
              navigate('/', { replace: true })
            }}
          >
            <RiLogoutBoxFill size='20' />
            Logout
          </div>
        )}
      </div>
    </button>
  )
}

export default DropDownNavigation
