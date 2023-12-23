import React, { useEffect, useState } from 'react'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import Head from 'next/head'
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router'


const Checkout = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const router = useRouter()
  const [user, setUser] = useState({ value: null })
  // const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'))

    if (myuser && myuser.token) {
      setUser(myuser)
      setEmail(myuser.email)
      fetchData(myuser.token)
    }
  }, [])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [address, setAddress] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const handleChange = async (e) => {

    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value)
    }
    else if (e.target.name == 'pincode') {
      setPincode(e.target.value)
      if (e.target.value.length == 5) {
        let pins = await fetch("/api/addPincode")
        let pinJson = await pins.json()
        if (Object.keys(pinJson).includes(e.target.value)) {
          setState(pinJson[e.target.value][1])
          setCity(pinJson[e.target.value][0])
        }
        else {
          setState('Sorry! this pincode is not serviceable')
          setCity('Sorry! this pincode is not serviceable')
        }
      }
      else {
        setState('')
        setCity('')
      }
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
    setPhone(res.phone)
  }
  const transection = async () => {
    try {
      const oid = uuidv4();
      const data = { cart, subTotal, oid, email: email, name, address, pincode, phone };

      // Create the order and retrieve the _id
      let response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        const orderData = await response.json();
        if (orderData.success) {

          const orderId = orderData.orderId; // Get the orderId or you can use orderData._id if available
          toast.success('Your order saved successfully');
          setTimeout(() => {
            router.push(`/order/?id=${orderId}`); // Redirect with the order _id
            clearCart()
          }, 1500);
          // items out of stock -- [pending]

        } else {
          toast.error('The prices of items in your cart have changed')
          localStorage.clear('cart')
        }

      } else  {
        toast.error('Some Error Occur');
      }
    } catch (error) {
      toast.error('Error saving order');
    }
  };

  


  return (
    <div>
      <Head>
        <title>{subTotal} - Check Out - CodeThreads </title>
        <meta name='description' content='Cheakout you product at codeThreads' />
        <link rel="icon" href="/favicon.io" />
      </Head>
      <section className="text-gray-600 body-font relative">
        <div className="container px-2 py-14 mautox-">
          <div className="flex flex-col text-center w-full mb-5">
            <h1 className="sm:text-3xl  text-2xl font-medium title-font mb-4 text-gray-900">Checkout</h1>
            <h2 className='font-semibold text-xl '>1. Delivery Details</h2>
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
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                  {user.value ? <input value={user.email} type="email" id="email" name="email" className="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete="off"  /> : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete="off" readOnly={true} />}

                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="address" className="leading-7 text-sm text-gray-600">Adress</label>
                  <textarea placeholder='please enter your home address in detail...' onChange={handleChange} value={address} id="address" name="address" className="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"  />
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
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="City" className="leading-7 text-sm text-gray-600">City</label>
                  <input onChange={handleChange} value={city} type="text" id="City" name="City" className="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2  ">
                <div className="relative">
                  <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                  <input onChange={handleChange} value={state} type="text" id="state" name="state" className="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>
      {/* Review the cart  */}
      <h2 className='font-semibold text-center text-xl  '>2. Review Cart Items && pay</h2>
      <div className=" w-85 sideCard my-10 bg-pink-100 md:mx-16 mx-3 px-6 py-2">

        <ol className='list-decimal font-semibold flex flex-col bg-pink-100 '>
          {Object.keys(cart).length === 0 &&

            <div className='my-4 text-base font-semibold'><p>Oops! Cart is empty.</p></div>
          }
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-3   ">
                <div className='w-full font-semibold'>{cart[k].name} ({cart[k].size}/{cart[k].varient})</div>
                <div className=' mx-8 w-1/8  flex items-center justify-center'> <AiOutlineMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].varient, cart[k].size) }} className='mx-1  text-1xl cursor-pointer text-pink-500' />{cart[k].qty}<AiOutlinePlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].varient, cart[k].size) }} className='mx-1 text-1xl cursor-pointer text-pink-500' /></div>
              </div>
            </li>
          })}
        </ol>
        <span className="total font-bold">Subtotal:RS {subTotal}</span>
      </div>
      <div className='mx-3 item flex my-3 justify-center'>
        Dear Customer! We will charge rupees 99 as a delivery charges.
      </div>
      <div className="mx-12">
        <button onClick={transection} disabled={disabled} className="disabled:bg-pink-400 flex mx-auto text-white bg-pink-500 border-0 py-2 lg:px-8 px-4 focus:outline-none hover:bg-pink-600 rounded text-lg">cash on delivery RS  {subTotal + 99}</button>
      </div>
    </div>
  )
}

export default Checkout
