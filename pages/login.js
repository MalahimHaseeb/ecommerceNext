import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  useEffect(()=>{
    if(localStorage.getItem('myuser')){
      router.push('/')
    }
  },[])

  const handleChange = (e) => {
    if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = { email, password }
    let res = await fetch("/api/login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let responce = await res.json()
    setEmail('')
    setPassword('')
    if(responce.success){
      localStorage.setItem('myuser',JSON.stringify({token: responce.token,email:responce.email,role:responce.role}))
      toast.success('Your are successfully logged in', { duration: 3000 })
      setTimeout(()=>{
        router.push('/');
      },1000)
    }else{
      toast.error("Invalid credientials", { duration: 3000 })
    }

  }

  const seePassword = () => {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }

  return (
    <>
      <Head>
        <title>Login to your Account - CodeThreads</title>
        <meta name='description' content='visit this page if you want to login your account' />
        <link rel="icon" href="/favicon.io" />
      </Head>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
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
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>

              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  value={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  requipink
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div onClick={()=>{seePassword()}} className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-gray-500 font-bold" htmlFor="remember">
                    <input className="leading-tight" type="checkbox" id="remember" name="remember" />
                    <span className="font-medium leading-6 text-gray-900 mx-2 text-sm">
                      See password
                    </span>
                  </label>
                </div>
                <div>
                  <Link href={'/forgotPassword'} className="font-bold text-sm text-pink-500 hover:text-pink-800" >
                    forgot password
                  </Link>
                </div>
              </div>
            </div>



            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              >
                Sign in
              </button>
            </div>
          </form>


        </div>
      </div>
    </>
  )
}

export default Login
