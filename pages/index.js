// import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import User from '@/models/User';
import mongoose from "mongoose";
import { useEffect, useState } from 'react';
import Link from 'next/link';



const inter = Inter({ subsets: ['latin'] })

export default function Home({ userRole }) {
  const [auth, setAuth] = useState(false)
  useEffect(() => {
    // if(userRole){
    //     router.push('/admin')
    // }
    const storedUser = localStorage.getItem('myuser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.token && userRole == parsedUser.email) {
        setAuth(true);
      } else {
        setAuth(false);// Redirect to the home page if not logged in
      }
    }
  }, []);
  return (
    <div>
      <Head>
        <title>CodeThreads.com - wear the code</title>
        <meta name='description' content='CodeThreads is an Online Shopping site for Geek Clothing. Shop from a wide range of Tshirts, Hoodies, Mugs, Sweatshirts, Caps and Mousepads at the best prices' />
        <link rel="icon" href="/favicon.io" />
      </Head>
      <div>
       {auth && <div className='fixed lg:bottom-2 lg:right-3 bottom-12 md:bottom-12 right-2'>
          <Link href={'/admin'}><button className='flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded lg:text-lg'>
            AdminDashboard
          </button></Link>
        </div>}
        <img className='img' src="/Home.jpg" alt="Home image" />
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Wear The Cloth</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Shooting Stars</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                    <circle cx={6} cy={6} r={3} />
                    <circle cx={6} cy={18} r={3} />
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">The Catalyzer</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx={12} cy={7} r={4} />
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Neptune</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" />
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Melanchole</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Bunker</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Ramona Falls</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

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
          destination: '/404',
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
