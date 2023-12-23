
import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import { useRouter } from 'next/router';
import User from '@/models/User';
import mongoose from "mongoose";
import Link from 'next/link';

const Index = ({ userRole }) => {
    const router = useRouter();
    const [admin, setAdmin] = useState(false)
    useEffect(() => {
        // if(userRole){
        //     router.push('/admin')
        // }
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
    return (
        <>
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="container-fluid lg:ml-28 m-3 p-3 min-h-screen ">
                <div className="row">
                    <div className="col-md-9 ">
                        <div className="card top-20 flex sm:items-center flex-col lg:py-10 lg:pl-50">
                            <h2 className='font-bold lg:text-2xl mb-5'>Welcome to ClothThreads Admin Panel</h2>
                            <img className='rounded' src="https://thumbnails-photos.amazon.com/v1/thumbnail/otuh7OJMQNSI-nlnyAdNNQ?ownerId=A20HIUAMNIN8C3&viewBox=913%2C512&groupShareToken=S3_Tu8HVTSC-5cU7lFEcbQ.UAx9ZWMYCAi5K2bkfZFEyc" alt="hello" />
                            <div>
                                <div className='fixed lg:bottom-2 lg:right-3 bottom-12 md:bottom-12 right-2'>
                                    <Link href={'/'}><button className='flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded lg:text-lg'>
                                        HomePage
                                    </button></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
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
                }
            }


        } else {
            // If no user with role 1 is found, or you want to restrict access for role 0 as well
            return {
                props: {
                    userRole: user.email,
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
};

export default Index;
