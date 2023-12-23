import React from 'react'
import Head from 'next/head';


const Contact  = () => {
  return (
    <div>
       <Head>
        <title>Contact Us - CodeThreads </title>
        <meta name='description' content='Feel free to contact us' />
        <link rel="icon" href="/favicon.io" />
      </Head>
      <section class="text-gray-600 body-font bg-gray-100 dark:bg-gray-700">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
    <h2 class="text-xl text-pink-500 tracking-widest  title-font mb-1">Lets Talk About Everything</h2>
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Feel free to talk</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base">If you have any questions regarding  your order, feel free to send email, call or Whatsapp us on our support number</p>
    </div>
    <div class="flex flex-wrap">
      <div class="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 class="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Corporate Address</h2>
        <p class="leading-relaxed text-base mb-1">CodeThreads</p>
        <p class="leading-relaxed text-base mb-1">Chung Lahore</p>
        <p class="leading-relaxed text-base mb-1">Near Adalat Shah</p>
        
      </div>
      
      <div class="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 class="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Customer Support</h2>
        <p class="leading-relaxed text-base mb-1">Call/Whatsapp +923244482975</p>
        <p class="leading-relaxed text-base mb-1">Email codeThreads@gmail.com</p>
        <p class="leading-relaxed text-base mb-1">Morning 9AM to 6PM</p>
        
      </div>
      
    </div>
    
  </div>
</section>
    </div>
  )
}

export default Contact
