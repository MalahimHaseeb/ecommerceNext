import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import toast from 'react-hot-toast'
import Link from 'next/link';
import { useRouter } from 'next/router'


const forgotPassword = () => {
  const [email, setEmail] = useState('')
  const [friend, setFriend] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [invalid, setInvalid] = useState(false)
  
  const router = useRouter()

  useEffect(()=>{
    if(localStorage.getItem('token')){
      router.push('/')
    }
  },[])


  const handleChange = (e) => {
    if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'friend') {
      setFriend(e.target.value.toLowerCase())
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = { email, friend }
    let res = await fetch("/api/forgotPassword", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let responce = await res.json()
    setEmail('')
    setFriend('')
    if (responce.success) {
      toast.success('Password reset', { duration: 3000 })
      setPassword(responce.password)
      setVisible(true)
      setTimeout(()=>{
      setVisible(false)
      },3000)
    } else {
      toast.error("Invalid cpinkientials", { duration: 3000 })
      setInvalid(true)
      setTimeout(()=>{
        setInvalid(false)
      },6000)
    }

  }

  return (
    <>
      <Head>
        <title>Forgot Password - CodeThreads </title>
        <meta name='description' content='Visite this page if you forgot your password' />
        <link rel="icon" href="/favicon.io" />
      </Head>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Getting Password of your account
          </h2>
          <p className="mt-1 text-center text-sm text-gray-500">
            OR
            <Link href="signup" className="font-semibold leading-6 text-pink-600 hover:text-pink-500">
              Signup
            </Link>
          </p>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  value={email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  requipink
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="friend" className="block text-sm font-medium leading-6 text-gray-900">
                  Friend Name
                </label>

              </div>
              <div className="mt-2">
                <input
                  placeholder='Name of your favorite friend?'
                  onChange={handleChange}
                  value={friend}
                  id="friend"
                  name="friend"
                  type="text"
                  autoComplete="current-password"
                  requipink
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              >
                Reset Password
              </button>
            </div>
          </form>

          {visible &&
            <div>
              <p className='mt-4'>Your Password is : {password}</p>
              <Link href={'/login'}><button
                className="mt-4 flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              >
                Log in
              </button></Link>
            </div>
          }
          {invalid &&
            <div>
              <p className='mt-4'>Invalid cpinkientials</p>
            </div>
          }

        </div>
      </div>
    </>
  )
}

export default forgotPassword
