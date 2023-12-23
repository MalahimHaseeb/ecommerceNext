
import Link from 'next/link';
import React, { useState } from 'react'
import { useRef } from 'react'
import { AiFillCloseCircle,AiFillFolderAdd,AiOutlineBorderTop } from 'react-icons/ai';
import { GrFormView} from 'react-icons/gr';
import { GiHamburgerMenu } from 'react-icons/gi';


const AdminMenu = () => {

    const [sidebar, setSidebar] = useState(false)
    const ref = useRef()
    const toggleCard = () => {
        setSidebar(!sidebar)
    }
    return (
        <div >
            <div className='fixed lg:right-6 right-2 lg:hidden text-2xl  top-4 sm:top-7 overflow-y-auto '>
                <GiHamburgerMenu onClick={toggleCard} className='cursor-pointer' />
            </div>
            <div ref={ref} className={`z-20  top-0 lg:h-screen lg:w-69 overflow-y-auto w-61 h-screen sideCard fixed py-10 lg:left-0  bg-white shadow-lg  transition-all  px-7  ${sidebar ? 'left-0' : '-left-96'}`}>

                <Link href={'/admin'}><h2 className='font-bold text-xl text-center mb-10'>Admin Pannel</h2></Link>

                <span onClick={toggleCard} className="absolute top-4 lg:hidden right-2 cursor-pointer text-2xl text-pink-500"><AiFillCloseCircle /></span>

                <div className="flex flex-col ">
                    <Link href={'/admin/addProduct'}><div className='w-full text-center justify-center mb-3 rounded checked:bg-pink-500 checked:text-white h-9 hover:bg-pink-500  hover:text-white  font-semibold'><AiFillFolderAdd className='absolute mt-1'/> Add Product</div></Link>
                    <Link href={'/admin/viewProduct'}><div className='w-full text-center justify-center mb-3 rounded  checked:bg-pink-500 checked:text-white h-9  hover:bg-pink-500  hover:text-white  font-semibold'><GrFormView className='absolute pr-1 text-xl mt-1'/> View Products</div></Link>
                    <Link href={'/admin/viewOrders'}><div className='w-full text-center justify-center mb-3 rounded  checked:bg-pink-500 checked:text-white h-9 hover:bg-pink-500  hover:text-white  font-semibold'><AiOutlineBorderTop className='absolute ml--1 text-lg mt-1'/>View Orders</div></Link>
                </div>
            </div>
        </div>
    )
}

export default AdminMenu