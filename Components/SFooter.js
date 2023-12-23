import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { MdAccountCircle } from 'react-icons/md';
import { CgOptions } from 'react-icons/cg';
import { useRouter } from 'next/router';

const SFooter = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {

    const [dropdown, setDropdown] = useState(false)
    const [sidebar, setSidebar] = useState(false)
    const router = useRouter()
    useEffect(() => {
      Object.keys(cart).length !== 0 && setSidebar(true)
      let exempted = ['/checkout','/orders','/order','/','/contact','/about','/privacyPolicy','/myAccount']
      if(exempted.includes(router.pathname)){
        setSidebar(false)
      }
    }, [])
    const toggleCard1 = () => {
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.add('translate-x-0')
        }
        else if (!ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('translate-x-full')
        }
    }
    const ref = useRef()
    return (
        <>
            <div className={`fixed  bottom-0 bg-white z-10 `}>
                <div className="bottom fixed bottom-0 bg-white w-full h-10 z-10 lg:hidden flex dark:bg-gray-900 dark:text-gray-100">
                    <div className="box flex justify-center items-center w-1/4 cursor-pointer">
                        <Link href={"/"}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="text-3xl dark:text-pink-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"></path>
                            </svg>
                        </Link>
                    </div>
                    <div className="box flex justify-center items-center w-1/4 cursor-pointer">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 1024 1024" className="text-3xl dark:text-pink-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
                        </svg>

                    </div>
                    <div className="box flex justify-center items-center w-1/4 cursor-pointer">
                        <span className="relative">
                            <div style={{ height: '1em', with: '1em' }} onClick={toggleCard1} className="text-3xl dark:text-pink-500"><AiOutlineShoppingCart className='text-3xl' />
                            </div>
                        </span>
                    </div>
                    <div className="box flex justify-center items-center w-1/4 cursor-pointer">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="{0}" viewBox="0 0 16 16" className="text-3xl dark:text-pink-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                            <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
                        </svg>


                    </div>
                    <div className="box flex justify-center items-center w-1/4 cursor-pointer">
                        <span onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}>
                            {dropdown && <div className="absolute  rounded right-10 w-40 bg-pink-200  bottom-12">
                                <ul>
                                    <Link href={'/myAccount'}><li className='py-1 px-3 hover:text-pink-700  font-bold'>Account</li></Link>
                                    <Link href={'/orders'}><li className='py-1 px-3 hover:text-pink-700  font-bold'>Orders</li></Link>
                                    <li onClick={logout} className='cursor-pointer py-1 px-3 hover:text-pink-700  font-bold'>Logout</li>
                                </ul>
                            </div>}
                            <div style={{ height: '1em', with: '1em' }} className=" text-3xl dark:text-pink-500">
                                {user.value && <CgOptions className='text-3xl' />}
                            </div>
                        </span>

                        <div style={{ height: '1em', with: '1em' }} className='text-3xl dark:text-pink-500' >
                            {!user.value && <Link href={"/login"}>
                                <MdAccountCircle className='text-3xl' />
                            </Link>}
                        </div>
                    </div>
                </div>
                <div ref={ref} className={`lg:hidden  overflow-y-auto w-screen h-screen sideCard absolute bottom-0 right-0 py-32 bg-pink-100  transition-all  px-7${sidebar ?'right-0':'-right-96'}`}>
                    <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
                    <span onClick={toggleCard1} className="absolute top-28 right-2 cursor-pointer text-2xl text-pink-500"><AiFillCloseCircle /></span>
                    <ol className='list-decimal font-semibold'>
                        {Object.keys(cart).length === 0 &&

                            <div className='my-4 text-base font-semibold'><p>Oops! Cart is empty.</p></div>
                        }
                        {Object.keys(cart).map((k) => {
                            return <li key={k}>
                                <div className="item flex my-3">
                                    <div className='w-2/3 font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].varient})</div>
                                    <div className='w-1/3  flex items-center justify-center'> <AiOutlineMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].varient, cart[k].size) }} className='mx-1  text-1xl cursor-pointer text-pink-500' />{cart[k].qty}<AiOutlinePlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].varient, cart[k].size) }} className='mx-1 text-1xl cursor-pointer text-pink-500' /></div>
                                </div>
                            </li>
                        })}
                    </ol>
                    <div className="total font-bold my-2">Subtotal:RS {subTotal}</div>
                    <div className="flex">
                        <Link href={'/checkout'}><button disabled={Object.keys(cart).length === 0 } className="disabled:bg-pink-300 flex mr-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg">Check Out</button></Link>
                        <button disabled={Object.keys(cart).length === 0 }  onClick={clearCart} className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg">Clear Cart</button>
                    </div>
                </div>
            </div >
        </>
    )
}

export default SFooter
