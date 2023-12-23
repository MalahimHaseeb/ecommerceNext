import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const myAccount = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [address, setAddress] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [user, setUser] = useState({ value: null })
  const [password, setPassword] = useState('')
  const [newpassword, setNewpassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const handleChange = async (e) => {


    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value)
    }
    else if (e.target.name == 'pincode') {
      setPincode(e.target.value)
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name == 'newpassword') {
      setNewpassword(e.target.value)
    }
    else if (e.target.name == 'cpassword') {
      setCpassword(e.target.value)
    }

    setTimeout(() => {
      if (name.length >= 3 && email.length >= 3 && phone.length >= 3 && pincode.length >= 3 && address.length >= 3) {
        setDisabled(false)
      }
      else {
        setDisabled(true)
      }
    }, 100)
  }
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('myuser')) {
      router.push('/')
    }
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    if (!myuser) {
      router.push('/')
    }
    if (myuser && myuser.token) {
      setUser(myuser)
      setEmail(myuser.email)
      fetchData(myuser.token)
    }
  }, [])
  const fetchData = async (token) => {
    const data = { token: token };
    let response = await fetch('/api/getUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    setName(res.name)
    setAddress(res.address)
    setPincode(res.pincode)
    setPhone(res.phone)
  }
  const handleUserSubmit = async () => {
    const data = { token: user.token, address, name, pincode, phone, };
    let response = await fetch('/api/updateUser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    if (res.success) {
      toast.success('Successfully Updated Account')
    } else {
      toast.error('Error in  Updating Account')
    }

  }

  const handlePasswordSubmit = async () => {
    let res;
    if (newpassword == cpassword) {
      const data = { token: user.token, password, cpassword, newpassword };
      let response = await fetch('/api/updatePassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      res = await response.json();
      setPassword('')
      setNewpassword('')
      setCpassword('')
    }
    else {
      res = { success: false }
    }
    if (res.success) {
      toast.success('Successfully Updated Password')
    } else {
      toast.error('Error in  Updating Password')
    }

  }
  const seePassword = () => {
    const passwordInput = document.getElementById('watchpassword');
    const passwordInput1 = document.getElementById('watchpassword1');
    const passwordInput2 = document.getElementById('watchpassword2');
    
    if (passwordInput.type === 'password' && passwordInput1.type === 'password' && passwordInput2.type === 'password' ) {
      passwordInput.type = 'text';
      passwordInput1.type = 'text';
      passwordInput2.type = 'text';
    } else {
      passwordInput.type = 'password';
      passwordInput1.type = 'password';
      passwordInput2.type = 'password';
    }
  }

  return (
    <div >
      <section className="text-gray-600 body-font relative">
        <div className="container px-2 py-4 mautox-">
          <div className="flex flex-col text-center w-full mb-5">
            <h1 className="sm:text-3xl  text-2xl font-medium title-font mb-4 text-gray-900">Update Your Account</h1>

          </div>

          <div className="lg:w-full md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                  <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email (cannot be updated) </label>
                  {user && user.token ? <input value={user.email} type="email" id="email" name="email" className="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete="off" /> : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete="off" readOnly={true} />}

                </div>
              </div>
              <div className="p-2 w-full">
                {/* <div className="relative">
                  <label htmlFor="address" className="leading-7 text-sm text-gray-600">Adress</label>
                  <textarea placeholder='please enter your home address in detail...' onChange={handleChange} value={address} id="address" name="address" className="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" defaultValue={""} />
                </div> */}
                <div className="relative">
                  <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                  <textarea
                    placeholder='please enter your home address in detail...'
                    onChange={handleChange}
                    value={address}
                    id="address"
                    name="address"
                    className="w-full bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  />
                </div>

              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="Phone" className="leading-7 text-sm text-gray-600">Phone</label>
                  <input placeholder='Your 10 digit - Phone Number' onChange={handleChange} value={phone} type="text" id="Phone" name="phone" className="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete="off" />
                </div>
              </div>
              <div className="p-2 w-1/2  ">
                <div className="relative">
                  <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PinCode</label>
                  <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete="off" />
                </div>
              </div>


            </div>
          </div>
        </div>
        <div className="mx-12">
          <button onClick={handleUserSubmit} className="disabled:bg-pink-400 flex mx-auto text-white bg-pink-500 border-0 py-2 lgpx-8 px-4 focus:outline-none hover:bg-pink-600 rounded text-lg">Submit</button>
        </div>
      </section>

      <section className="text-gray-600 body-font relative">
        <div className="container px-2 py-4 mautox-">
          <div className="flex flex-col text-center w-full mb-5">
            <h1 className="sm:text-3xl  text-2xl font-medium title-font mb-4 text-gray-900">Change Your Password</h1>

          </div>

          <div className="lg:w-full md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-1 w-full lg:w-1/3">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Password</label>
                  <input onChange={handleChange} value={password} type="password" id="watchpassword" name="password" className="w-full watchpassword bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete='off' />
                  <div onClick={()=>{seePassword()}} className="mb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-gray-500 font-bold" htmlFor="remember">
                          <input className=" leading-tight" type="checkbox" id="remember" name="remember" />
                          <span className="text-sm font-medium leading-6 text-gray-900 mx-2">
                            See password
                          </span>
                        </label>
                      </div>
                      <div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-1 w-full lg:w-1/3">
                <div className="relative">
                  <label htmlFor="newpassword" className="leading-7 text-sm text-gray-600">New Password</label>
                  <input onChange={handleChange} value={newpassword} type="password" id="watchpassword1" name="newpassword" className="w-full watchpassword bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete='off' />
                </div>
              </div>
              <div className="p-1 w-full lg:w-1/3">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">C Password</label>
                  <input onChange={handleChange} value={cpassword} type="password" id="watchpassword2" name="cpassword" className="w-full watchpassword bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete='off' />
                </div>
              </div>

            </div>

          </div>
        </div>
        <div className="mx-12">
          <button onClick={handlePasswordSubmit} className="disabled:bg-pink-400 flex mx-auto text-white bg-pink-500 border-0 py-2  px-4 focus:outline-none hover:bg-pink-600 rounded text-lg">Change Password</button>
        </div>
      </section>
    </div>
  )
}

export default myAccount