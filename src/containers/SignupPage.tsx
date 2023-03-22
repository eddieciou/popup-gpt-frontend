import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiFillPlusCircle } from 'react-icons/ai'

import botImg from '../assets/bot.jpeg'

const SignupPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [image, setImage] = useState<Blob | string>('')
  const [imagePreview, setImagePreview] = useState<string>('')

  const navigate = useNavigate()

  const validateImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files === null) return

    const { type, name, size } = files[0]

    if (size >= 1048576) return alert('Max file size is 1mb')

    setImage(files[0])
    setImagePreview(URL.createObjectURL(files[0]))
  }

  const uploadImage = async () => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'ihenwd2x')
    try {
      setUploadingImage(true)
      const res = await fetch('https://api.cloudinary.com/v1_1/duh0zakhj/image/upload', {
        method: 'post',
        body: data,
      })
      const urlData = await res.json()
      setUploadingImage(false)
      return urlData.url
    } catch (error) {
      setUploadingImage(false)
      console.log(error)
    }
  }

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault()
    if (!image) return alert('Please upload your profile picture')
    const url = await uploadImage()
    console.log(url)
  }

  return (
    <div className='container mx-auto flex grow'>
      <div className='flex h-full w-3/5 justify-center'>
        <div className='flex w-1/2 flex-col justify-center gap-3'>
          <div className='flex flex-col gap-3'>
            <div className='text-center text-4xl font-bold'>Create account</div>
            <div className='flex justify-center'>
              <div className='relative '>
                <img
                  src={imagePreview || botImg}
                  className='h-28 w-28 rounded-full border border-black object-cover'
                />
                <label className='absolute bottom-0 right-3 flex'>
                  <div>
                    <AiFillPlusCircle
                      size='20'
                      className='rounded-full bg-white text-green-700 hover:text-green-600'
                    />
                  </div>
                  <input
                    type='file'
                    className='h-0 w-0'
                    accept='image/jpeg, image/png'
                    onChange={validateImage}
                  />
                </label>
              </div>
            </div>
          </div>
          <form className='flex flex-col justify-center gap-3' onSubmit={handleSignup}>
            <div className='grid gap-1'>
              <div>Your name</div>
              <input
                required
                type='text'
                placeholder='請輸入名稱'
                className='w-full rounded-md border border-gray-400 p-2 focus:outline-none'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='grid gap-1'>
              <div>Email address</div>
              <input
                required
                type='email'
                placeholder='請輸入帳號'
                className='w-full rounded-md border border-gray-400 p-2 focus:outline-none'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className='text-xs text-gray-500'>
                {/* eslint-disable-next-line quotes */}
                We{"'"}ll never share your email with anyone else.
              </p>
            </div>

            <div className='grid gap-1'>
              <div>Password</div>
              <input
                required
                type='password'
                placeholder='請輸入密碼'
                className='w-full rounded-md border border-gray-400 p-2 focus:outline-none'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className='w-fit rounded-md bg-blue-500 py-2 px-4 text-white focus:outline-none'>
              {uploadingImage ? 'Signing you up...' : 'Signup'}
            </button>
            <div className='flex w-full justify-center gap-1'>
              {/* eslint-disable-next-line quotes */}
              Already have an account ?
              <button onClick={() => navigate('/login')} className='text-blue-600 underline'>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className='h-full w-2/5'>
        <img
          className='h-full object-cover'
          src='https://images.unsplash.com/photo-1622556498246-755f44ca76f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fG1lc3NhZ2UlMjBhcHB8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
        />
      </div>
    </div>
  )
}

export default SignupPage
