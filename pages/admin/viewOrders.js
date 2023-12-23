// import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import mongoose from 'mongoose';
import { useRouter } from 'next/router';
import Order from '@/models/Order'; // Import the Order model
import AdminMenu from './AdminMenu';
import User from '@/models/User';
import Link from 'next/link';
import { AiFillDelete } from 'react-icons/ai';
import { MdUpdate } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const ViewOrders = ({ orders, userRole }) => { // Rename the component for consistency
  const router = useRouter();
  const [admin, setAdmin] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState(''); // State to manage the selected delivery status


  useEffect(() => {
    const storedUser = localStorage.getItem('myuser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.token && userRole === parsedUser.email) {
        setAdmin(true);
        setDeliveryStatus(orders.deliveryStatus)
      } else {
        router.push('/404'); // Redirect to the home page if not logged in
      }
    } else {
      router.push('/404'); // Redirect to the home page if user data is not found
    }
  }, []);

  //   const deleteOrder = async (orderId) => {
  //     const confirmation = prompt('Do you want to delete the order?');

  //     if (confirmation && confirmation.toLowerCase() === 'yes') {
  //       try {
  //         const response = await fetch('../api/deleteOrder', {
  //           method: 'DELETE',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({ orderId }),
  //         });

  //         if (response.ok) {
  //           toast.success('Successfully deleted the order');
  //           router.push('/admin/viewOrders');
  //         } else {
  //           toast.error('Error in deleting the order');
  //           router.push('/admin/viewOrders');
  //           console.error('Error deleting the order');
  //         }
  //       } catch (error) {
  //         console.error('Error deleting the order:', error);
  //       }
  //     }
  //   };
  const deleteOrder = async (orderId) => {
    const confirmation = window.confirm('Do you want to delete the order?'); // Use window.confirm for a simple confirmation dialog

    if (confirmation) {
      try {
        const response = await fetch(`/api/deleteOrder?orderId=${orderId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          toast.success('Successfully deleted the order');
          router.push('/admin/viewOrders');
        } else {
          toast.error('Error in deleting the order');
          console.error('Error deleting the order');
        }
      } catch (error) {
        console.error('Error deleting the order:', error);
      }
    }
  };

  const updateDeliveryStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch('../api/updateOrder', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, deliveryStatus: newStatus }),
      });

      if (response.ok) {
        // Update the local state with the new status
        const updatedOrders = orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, deliveryStatus: newStatus };
          }
          return order;
        });

        setDeliveryStatus(newStatus);
        toast.success('Successfully updated the delivery status');
        router.push('/admin/viewOrders')
      } else {
        toast.error('Error in updating the delivery status');
        console.error('Error updating the delivery status');
      }
    } catch (error) {
      console.error('Error updating the delivery status:', error);
    }
  };
  return (
    <div>
      <Head>
        <title>View Orders - CodeThreads</title>
        <meta name="description" content="View page for checking your orders." />
        <link rel="icon" href="/favicon.io" />
      </Head>
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div>
        <div className='fixed lg:bottom-2 lg:right-3 bottom-12 md:bottom-12 right-2'>
          <Link href={'/'}><button className='flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded lg:text-lg'>
            HomePage
          </button></Link>
        </div>
      </div>
      <div className="min-h-screen overflow-x-auto">
        <div className="container lg:w-1/2 w-9/12 mx-auto">
          <div className="items">
            <div className="flex flex-col">
              <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <h1 className="font-bold text-center text-2xl p-2">View Orders</h1>
                    <table className="min-w-full text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-3 py-4">
                            Modify
                          </th>
                          <th scope="col" className="px-1 py-4">
                            Delete
                          </th>
                          <th scope="col" className="px-3 py-4">
                            Name
                          </th>
                          <th scope="col" className="px-3 py-4">
                            Email
                          </th>
                          <th scope="col" className="px-3 py-4">
                            Order ID
                          </th>
                          {/* <th scope="col" className="px-6 py-4">
                            Status
                          </th> */}
                          <th scope="col" className="px-3 py-4">
                            Amount
                          </th>
                          <th scope="col" className="px-1 py-4">
                            Details
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order._id} className="border-b dark:border-neutral-500">
                            <td className="cursor-pointer whitespace-nowrap px-0 py-4 font-medium">
                              <select
                                onChange={(e) => updateDeliveryStatus(order.orderId, e.target.value)} // Call the function with orderId and the new status
                                value={order.deliveryStatus}
                                id="deliveryStatus"
                                name="deliveryStatus"
                                className="px-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                              >
                                <option value="unshipped">unshipped</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="delivered">delivered</option>
                                <option value="cancel">cancel</option>
                              </select>
                            </td>
                            <td className="cursor-pointer whitespace-nowrap px-1 py-4 font-medium">
                              <AiFillDelete onClick={() => deleteOrder(order.orderId)} />
                            </td>
                            <td className="whitespace-nowrap px-2 py-4 font-medium">{order.name}</td>
                            <td className="whitespace-nowrap px-2 py-4">{order.email}</td>
                            <td className="whitespace-nowrap px-3 py-4">{order.orderId}</td>
                            {/* <td className="whitespace-nowrap px-6 py-4">{order.status}</td> */}
                            <td className="whitespace-nowrap px-3 py-4">{order.amount}</td>
                            <td className="whitespace-nowrap px-1 py-4">
                              <Link href={'/order?id=' + order._id}>Details</Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  try {
    // Find the user with role equal to 1
    const user = await User.findOne({ role: process.env.auth });

    if (!user) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    } else {
      const orders = await Order.find({});

      return {
        props: {
          userRole: user.email,
          orders: JSON.parse(JSON.stringify(orders)),
        },
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      props: { userRole },
    };
  }
};

export default ViewOrders;
