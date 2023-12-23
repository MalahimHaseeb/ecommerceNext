import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const orders = () => {
    const router = useRouter()
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const fetchOrders = async () => {
            let response = await fetch('/api/myorders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token}),
            });

            let res = await response.json()
            setOrders(res.orders)
        }
        if (!localStorage.getItem('myuser')) {
            router.push('/')
        } else {
            fetchOrders()
        }
    }, [])
    return (
        <div className='min-h-screen overflow-x-auto'>
            <div className="container w-9/12 mx-auto">
                <div className="items">

                    <div className="flex flex-col">
                        <div className=" sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <h1 className="font-bold text-center text-2xl p-2 ">My Orders</h1>
                                    <table className="min-w-full text-sm font-light">
                                        <thead className="border-b font-medium dark:border-neutral-500">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">Order Id</th>
                                                <th scope="col" className="px-6 py-4">Email</th>
                                                <th scope="col" className="px-6 py-4">Price</th>
                                                <th scope="col" className="px-6 py-4">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((item)=>{
                                              return(  <tr key={item._id} className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">#{item.orderId}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{item.amount}</td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link href={'/order?id=' + item._id}>Details</Link></td>
                                            </tr>
                                            )})}
                                         
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}



export default orders