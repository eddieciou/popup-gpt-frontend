import React, { useState } from 'react'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'

interface IDropDownNavigationProps {
  title: string
}

const DropDownNavigation = ({ title }: IDropDownNavigationProps) => {
  const [dropDown, setDropDown] = useState(false)

  return (
    <button
      className='relative flex items-center gap-1'
      onBlur={() => setDropDown(false)}
      onClick={() => setDropDown(!dropDown)}
    >
      <p>{title}</p>
      <span className=''>{dropDown ? <AiFillCaretUp /> : <AiFillCaretDown />}</span>
      <div
        className={`absolute top-full right-0 mt-1 grid w-max min-w-full gap-2 bg-gray-300 p-2 text-left ${
          !dropDown && 'hidden'
        }`}
      >
        <a className='block hover:text-white' href='#action/3.1'>
          Action
        </a>
        <a className='block hover:text-white' href='#action/3.2'>
          Another action
        </a>
        <a className='block hover:text-white' href='#action/3.3'>
          Something
        </a>
      </div>
    </button>
  )
}

export default DropDownNavigation
