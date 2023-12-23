import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import mongoose from 'mongoose';
import Product from '@/models/Product';
import { useRouter } from 'next/router'
import AdminMenu from './AdminMenu';
import User from '@/models/User';
import Link from 'next/link';
import { AiFillDelete } from 'react-icons/ai';
import { MdUpdate } from 'react-icons/md';
import toast from 'react-hot-toast';

const viewProduct = ({ products, userRole }) => {
    const router = useRouter();

    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('myuser');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.token && userRole == parsedUser.email) {
                setAdmin(true);
            } else {
                router.push('/404'); // Redirect to the home page if not logged in
            }
        } else {
            router.push('/404'); // Redirect to the home page if user data is not found
        }
    }, []);

    const deleteProduct = async (productId) => {
        const confirmation = prompt('Do you want to delete the product?If yes type yes');

        if (confirmation.toLowerCase() === 'yes') {
            try {
                const response = await fetch('/api/deleteProducts', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId }),
                });

                if (response.ok) {
                    toast.success('successfully deleted product')
                    router.push('/admin/viewProduct')
                } else {
                    toast.error('Error in deleting  product')
                    router.push('/admin/viewProduct')
                    // Handle error here, e.g., show an error message.
                    console.error('Error deleting product');
                }

            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    }

    return (
        <div>
            <Head>
                <title>View Pages - CodeThreads</title>
                <meta name='description' content='View Page for cheaking your products which you want to buy. ' />
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
            <div className='min-h-screen overflow-x-auto'>
                <div className="container lg:w-1/2 w-9/12 mx-auto">
                    <div className="items">

                        <div className="flex flex-col">
                            <div className=" sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <h1 className="font-bold text-center text-2xl p-2 ">View Products</h1>
                                        <table className="min-w-full text-sm font-light">
                                            <thead className="border-b font-medium dark:border-neutral-500">
                                                <tr >
                                                    <th scope="col" className="px-2 py-4">Modify</th>
                                                    <th scope="col" className="px-2 py-4">Delete</th>
                                                    <th scope="col" className="px-2 py-4">Product Name</th>
                                                    <th scope="col" className="px-2 py-4">price</th>
                                                    <th scope="col" className="px-2 py-4">Category</th>
                                                    <th scope="col" className="px-2 py-4">Qty</th>
                                                    <th scope="col" className="px-2 py-4">Image</th>
                                                    <th scope="col" className="px-2 py-4">Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.keys(products).map((key) => {
                                                    return (<tr key={key} className="border-b dark:border-neutral-500">
                                                        <td className="cursor-pointer whitespace-nowrap px-2 py-4 font-medium"><Link passHref={true} href={`/admin/${products[key].slug}`} ><MdUpdate /></Link></td>
                                                        <td className="cursor-pointer whitespace-nowrap px-2 py-4 font-medium">
                                                            <AiFillDelete onClick={() => deleteProduct(products[key]._id)}
                                                            /></td>
                                                        <td className="whitespace-nowrap px-2 py-4 font-medium">{products[key].title}</td>

                                                        <td className="whitespace-nowrap px-2 py-4">{products[key].price}</td>
                                                        <td className="whitespace-nowrap px-2 py-4">{products[key].category}</td>
                                                        <td className="whitespace-nowrap px-2 py-4">{products[key].availableQty}</td>
                                                        <td className="whitespace-nowrap px-2 py-4"> <img
                                                            alt="Product Image"
                                                            className=" w-12   h-12 object-cover object-center rounded"
                                                            src={products[key].img}
                                                        /></td>
                                                        <td className="whitespace-nowrap px-4 py-4"><Link href={`/product/${products[key].slug}`}>Details</Link></td>
                                                    </tr>
                                                    )
                                                })}

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
    )
}

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
                }
            }
        } else {
            let products = await Product.find({});
            let allProducts = {};

            for (let item of products) {
                if (item.title in allProducts) {
                    if (!allProducts[item.title].color.includes(item.color) && item.availableQty > 0) {
                        allProducts[item.title].color.push(item.color);
                    }
                    if (!allProducts[item.title].size.includes(item.size) && item.availableQty > 0) {
                        allProducts[item.title].size.push(item.size);
                    }
                } else {
                    allProducts[item.title] = JSON.parse(JSON.stringify(item));
                    if (item.availableQty > 0) {
                        allProducts[item.title].color = [item.color];
                        allProducts[item.title].size = [item.size];
                    } else {
                        allProducts[item.title].color = [];
                        allProducts[item.title].size = [];
                    }
                }
            }

            // Move this return statement here, outside of the for loop
            return {
                props: {
                    userRole: user.email,
                    products: JSON.parse(JSON.stringify(allProducts))
                },
            };
        }
    } catch (error) {
        // Handle any errors that might occur during the database query
        console.error('Error:', error);
        return {
            props: { userRole },
        };
    }
}



export default viewProduct
