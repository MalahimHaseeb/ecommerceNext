import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import Order from '@/models/Order';
import mongoose from 'mongoose';
import { useRouter } from 'next/router'

const MyOrder = ({ order }) => {
  let products = order.products;
  const [date, setDate] = useState()
  const router = useRouter();
  useEffect(() => {
    if (router.query.clearCart == 1) {
      clearCart()
    }
    const d = new Date(order.createdAt)
    setDate(d)
  }, [])

  return (
    <div>
      <Head>
        <title>Order Page - CodeThreads</title>
        <meta name='description' content='Order Page for cheaking your products which you want to buy. ' />
        <link rel="icon" href="/favicon.io" />
      </Head>
      <section className="text-gray-600 body-font overflow-hidden min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-screen mx-auto flex flex-wrap">
            <div className=" w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">CODETHREADS</h2>
              <h1 className="text-gray-900 md:text-3xl title-font font-medium mb-4">Order Id: #{order.orderId}</h1>
              <p className="leading-relaxed mb-4">Your order is successfully placed.</p>
              <p className="leading-relaxed mb-4">Your delivery status is <strong>{order.deliveryStatus}</strong></p>
              <p className="leading-relaxed mb-4">Order Placed On: {date && date.toLocaleDateString("en-PK")}</p>
              <div className="flex mb-4">
                <a className="flex-grow text-center py-2 text-lg px-1">Item Description</a>
                <a className="flex-grow text-center py-2 text-lg px-1">  Quantity</a>
                <a className="flex-grow text-center py-2 text-lg px-1">Item Total</a>
                <a className="flex-grow text-center py-2 text-lg px-1">Image</a>
              </div>


              {Object.keys(products).map((key) => {
                return (
                  <div className="w-full lg:pl-12  mb-6  flex border-t border-gray-200 py-2" key={key}>
                    <span className="text-gray-500">{products[key].name}({products[key].size}/{products[key].varient})</span>
                    <span className="m-auto text-gray-900">{products[key].qty}</span>
                    <span className="m-auto text-gray-900">RS {products[key].price}</span>
                    <span className="m-auto text-gray-900">
                      <img
                        alt="Product Image"
                        className=" w-12   h-12 object-cover object-center rounded"
                        src={products[key].img}
                      />
                    </span>
                  </div>
                );
              })}
              <div className='bg-pink-400 w-80 text-center  text-white px-3 rounded mx-3 item flex my-3 '>
                Dear Customer! We will charge rupees 99 as a delivery charges.
              </div>
              <div className="flex my-5">
                <span className="title-font font-medium text-2xl text-gray-900">Subtotal: RS {order.amount}</span>
                {/* <button className="flex ml-4 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button> */}
              </div>

            </div>
            {/* <img alt="ecommerce" className="lg:w-1/2 w-full lg:p-10 lg:h-full h-64 object-cover object-center rounded" src="https://thumbnails-photos.amazon.com/v1/thumbnail/otuh7OJMQNSI-nlnyAdNNQ?ownerId=A20HIUAMNIN8C3&viewBox=913%2C512&groupShareToken=S3_Tu8HVTSC-5cU7lFEcbQ.UAx9ZWMYCAi5K2bkfZFEyc" /> */}
            {/* {Object.keys(products).map((key) => {
              return (
                <img
                  alt="Product Image"
                  className="lg:w-1/2 w-full lg:p-10 lg:h-full h-64 object-cover object-center rounded"
                  src={products[key].img}
                />
              );
            })} */}
          </div>
        </div>
      </section>

    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }

  let order = await Order.findById(context.query.id);
  return {
    props: { order: JSON.parse(JSON.stringify(order)) }
  }
}
export default MyOrder
