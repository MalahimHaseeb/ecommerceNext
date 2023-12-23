import Link from 'next/link'
import React from 'react'
import Head from 'next/head'

const About = () => {
  return (
    <div>
       <Head>
        <title>About Us - CodeThread - wear the cloth</title>
        <meta name='description' content='CodeThreads is the best Ecommere store for purchacing hoodies,tshirts and Apparels.' />
        <link rel="icon" href="/favicon.io" />
      </Head>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-14 mx-auto">
          <div class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
            <p class="text-xl leading-relaxed mb-2">Buy <span class="text-pink-700 dark:text-pink-600 font-semibold">T-Shirts | Hoodies | Apparals</span></p>
            <p class="leading-relaxed text-lg">Introducing CodeThreads, a revolutionary e-commerce platform that delivers amazing products at unbeatable prices. Built on a foundation of NextJs and MongoDB, our website offers a seamless shopping experience powepink by server-side rendering. Whether you're a tech enthusiast or simply looking for a stylish geek T-shirt, CodeThreads has something for everyone. And for those curious about the development process, be sure to check out the CodeWithHarry NextJs playlist on YouTube. Shop now at CodeThreads and experience the future of online shopping.</p>
          </div>
          <Link href={'/tshirts'}><button class="flex mx-auto mt-5 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">Start Shopping</button></Link>
        </div>
      </section>
      <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">About CodeThreads
      </h1>
      <p className="mb-8 leading-relaxed">CodeThreads is revolutionizing the way Pakistan shops for unique, geeky apparel. From our one-of-a-kind hoodie designs to our wide selection of stickers, mugs and other accessories, we have everything you need to express your individuality and stand out from the crowd. Say goodbye to the hassle of hopping from store to store in search of your perfect geeky look. With just a single click on our website, you can find it all!</p>
      <p className="mb-8 leading-relaxed">But what sets CodeThreads apart from the competition? The answer is simple: our unique designs and commitment to providing the highest quality products. We understand the importance of style and durability, which is why we put so much effort into creating unique designs and using only the best materials. Don't settle for mediocre clothing and accessories - choose CodeThreads and make a statement with your wardrobe.</p>
      <p className="mb-8 leading-relaxed">CodeThreads is revolutionizing the way Pakistan shops for unique, geeky apparel. From our one-of-a-kind hoodie designs to our wide selection of stickers, mugs and other accessories, we have everything you need to express your individuality and stand out from the crowd. Say goodbye to the hassle of hopping from store to store in search of your perfect geeky look. With just a single click on our website, you can find it all!</p>
      
    </div>
    <div className="lg:max-w-lg lg:w-26 md:w-1/2 w-5/6">
      <img className="object-cover object-center rounded" alt="hero" src="https://thumbnails-photos.amazon.com/v1/thumbnail/otuh7OJMQNSI-nlnyAdNNQ?ownerId=A20HIUAMNIN8C3&viewBox=913%2C512&groupShareToken=S3_Tu8HVTSC-5cU7lFEcbQ.UAx9ZWMYCAi5K2bkfZFEyc"  />
    </div>
  </div>
</section>

    </div>
  )
}

export default About
