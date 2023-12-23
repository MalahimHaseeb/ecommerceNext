import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AiOutlineShoppingCart,AiFillCloseCircle,AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai';
import { MdAccountCircle } from 'react-icons/md';
import { IoIosOptions } from 'react-icons/io';
import { CgOptions } from 'react-icons/cg';
import { useRouter } from 'next/router';

const Navbar = ({logout,user,cart,addToCart,removeFromCart,clearCart,subTotal}) => {
  
  const [dropdown, setDropdown] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const [admin, setAdmin] = useState(true)
  const router = useRouter()
  useEffect(() => {
    if(window.location.pathname === '/admin' || window.location.pathname === '/admin/addProduct' || window.location.pathname === '/admin/viewProduct'){
      setAdmin(false)
    }
    Object.keys(cart).length !== 0 && setSidebar(true)
    let exempted = ['/checkout','/orders','/order','/','/contact','/about','/privacyPolicy','/myAccount']
    if(exempted.includes(router.pathname)){
      setSidebar(false)
    }
  }, [])
  

  const toggleCard=()=>{
    setSidebar(!sidebar)
//  if (ref.current.classList.contains('translate-x-full')){
//   ref.current.classList.remove('translate-x-full')
//   ref.current.classList.add('translate-x-0')
//  }
//  else if(!ref.current.classList.contains('translate-x-full')){
//   ref.current.classList.remove('translate-x-0')
//   ref.current.classList.add('translate-x-full')
//  }
  }

  const [isNavbarVisible, setNavbarVisibility] = useState(false);

  const toggleNavbar = () => {
    setNavbarVisibility(!isNavbarVisible);
  }; 

  const ref=useRef()
  return (
    admin && <div>
    <nav className={`sticky top-0 bg-white shadow-md z-20 w-full ${!sidebar && "overflow-hidden"}`}>
     <span  onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}>
          {dropdown && <div className="fixed rounded right-10 w-40 bg-pink-200 top-12">
           <ul className='  z-30'>
            <Link href={'/myAccount'}><li className=' py-1 px-3 hover:text-pink-700  font-bold'>Account</li></Link>
            <Link href={'/orders'}><li className='py-1 px-3 hover:text-pink-700  font-bold'>myOrders</li></Link>
            <li onClick={logout} className='cursor-pointer py-1 px-3 hover:text-pink-700  font-bold'>Logout</li>
           </ul>
          </div>}
          <div  className="remove inline-flex items-center cursor-pointer text-lg absolute md:right-6 md:top-6 top-2 right-9  text-pink-500 hover:text-pink-600 mx-3 mt-4 md:mt-0">
          {user.value && <CgOptions  className='md:text-2xl text-pink-500'/> }
          </div>
          </span>
      <header className=" text-gray-600 body-font shadow-md">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link href={"/"} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-xl text-pink-600 tracking-widest">CodeThreads</span>
          </Link>
          {/* <nav className="md:ml-auto md:mr-auto  flex flex-wrap items-center  justify-center font-bold">
            <Link href={"/tshirts"} className="mr-5 text-pink-500 hover:text-pink-600 ">Tshirts</Link>
            <Link href={"/hoodies"} className="mr-5 text-pink-500 hover:text-pink-600 ">Hoodies</Link>
            <Link href={"/stickers"} className="mr-5 text-pink-500 hover:text-pink-600 ">Stickers</Link>
            <Link href={"/mugs"} className="mr-5 text-pink-500 hover:text-pink-600 ">Mugs</Link>
          </nav> */}

          <IoIosOptions onClick={toggleNavbar} className="  p-2 w-10 h-10  text-sm text-pink-500 rounded-lg md:hidden hover:bg-pink-100 focus:outline-none focus:ring-2 fixed right-2 focus:ring-pink-200 dark:text-gray-400 dark:hover:bg-pink-700 dark:focus:ring-pink-600" />
          {/* <IoIosOptions onClick={toggleNavbar} className={` inline-flex items-center cursor-pointer text-lg ${
            isNavbarVisible ? 'absolute' : 'hidden'
          } md:right-6 md:top-6 top-2 right-9  text-pink-500 hover:text-pink-600 mx-3 mt-4 md:mt-0`} /> */}
     <div className={`togglemood ${
            isNavbarVisible ? 'block' : 'hidden'
          }  text-center md:block md:ml-56  `} >
      <ul className="font-medium flex  flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8  rtl:space-x-reverse md:mt-0 md:border-0  text-pink-500 hover:text-pink-600">
        <li>
          <Link href={"/tshirts"} className=" py-2 px-3   rounded md:bg-transparent md:p-0 text-pink-500 hover:text-pink-600" aria-current="page">Tshirts</Link>
        </li>
        <li>
          <Link href={"/hoodies"} className=" py-2 px-3   rounded md:bg-transparent md:p-0 text-pink-500 hover:text-pink-600">Hoodies</Link>
        </li>
        <li>
          <Link href={"/stickers"} className=" py-2 px-3   rounded md:bg-transparent md:p-0 text-pink-500 hover:text-pink-600">Stickers</Link>
        </li>
        <li>
          <Link href={"/mugs"} className=" py-2 px-3   rounded md:bg-transparent md:p-0 text-pink-500 hover:text-pink-600">Mugs</Link>
        </li>
      </ul>
    </div>
         

          <div className='remove inline-flex items-center cursor-pointer text-lg absolute md:right-6 md:top-6 top-2 right-9  text-pink-500 hover:text-pink-600 mx-3 mt-4 md:mt-0' >
          {!user.value && <Link href={"/login"}>
          <MdAccountCircle className='md:text-2xl'/>
          </Link>}
          </div>

          <div onClick={toggleCard} className="remove text-pink-500 inline-flex items-center absolute md:right-3 md:top-6 top-2 right-7 cursor-pointer text-lg hover:text-pink-600  mt-4 md:mt-0"><AiOutlineShoppingCart className='md:text-2xl' /> 
          </div>
          

          <div ref={ref} className={`z-20 remove top-0 lg:h-screen lg:w-61 overflow-y-auto w-61 h-screen sideCard absolute py-10 bg-pink-100  transition-all  px-7 ${sidebar ?'right-0':'-right-96'}` }>
            <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
            <span onClick={toggleCard} className="absolute top-4 right-2 cursor-pointer text-2xl text-pink-500"><AiFillCloseCircle/></span>
            <ol className='list-decimal font-semibold'>
              {Object.keys(cart).length===0 && 
              
              <div className='my-4 text-base font-semibold'><p>Oops! Cart is empty.</p></div>
            
              }
              {Object.keys(cart).map((k)=>{return <li key={k}>
                <div className="item flex my-3">
                <div className='w-2/3 font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].varient})</div>
                <div className='w-1/3  flex items-center justify-center'> <AiOutlineMinusCircle onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name,cart[k].varient,cart[k].size)}} className='mx-1  text-1xl cursor-pointer text-pink-500'/>{cart[k].qty}<AiOutlinePlusCircle onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name,cart[k].varient,cart[k].size)}} className='mx-1 text-1xl cursor-pointer text-pink-500'/></div>
                </div>
              </li>})}
            </ol>
            <div className="total font-bold my-2">Subtotal:RS {subTotal}</div>
            <div className="flex">
               <Link href={'/checkout'}><button disabled={Object.keys(cart).length === 0 } className="disabled:bg-pink-300 flex mr-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg">Check Out</button></Link>
               <button  disabled={Object.keys(cart).length === 0} onClick={clearCart} className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg">Clear Cart</button>
            </div>
          </div>
        </div>
      </header>

    </nav>
    </div>
  )
}

export default Navbar
