
import Product from '@/models/Product'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import mongoose from "mongoose";
import Head from 'next/head';
import toast from 'react-hot-toast';
import Error from 'next/error'

export default function Post({ buyNow, addToCart, product, varients, error }) {
  const router = useRouter()
  const { slug } = router.query
  const [pin, setPin] = useState()
  const [service, setService] = useState()
  const [color, setColor] = useState()
  const [size, setSize] = useState()
  const [isHovered, setIsHovered] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');

  useEffect(() => {
    if (!error) {

      setColor(product.color)
      setSize(product.size)
    }
  }, [router.query])


  const toggleHover = () => {
    if (window.innerWidth >= 768) {
      setIsHovered(!isHovered);
    }
  };

  const handleMouseMove = (e) => {
    if (isHovered) {
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setBackgroundPosition(`${x}% ${y}%`);
    }
  };

  const checkServiceAbility = async () => {
    let pins = await fetch("/api/addPincode")
    let pinJson = await pins.json()
    if (Object.keys(pinJson).includes(pin)) {
      setService(true);
      toast.success('Your Pincode is servise able', { duration: 2000 })
    }
    else {
      setService(false)
      toast.error('Sorry ! Your Pincode is not servise able', { duration: 2000 })
    }
  }

  const onChangePin = (e) => {
    setPin(e.target.value)
  }



  const refreshPage = (newSize, newColor) => {
    let url = `/product/${varients[newColor][newSize]['slug']}`
    router.push(url)

  }

  if (error == 404) {
    return <Error statusCode={404} />
  }

  return <>
    <Head>
      <title>Product Menu - codeThreads </title>
      <meta name='description' content={product.description} />
      <link rel="icon" href="/favicon.io" />
    </Head>
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/4 mx-auto flex flex-wrap">
          <div
            className="hover:cursor-crosshair lg:w-1/3 w-full h-full lg:h-70 lg:px-9 px-4 lg:object-center lg:object-fill object-fill object-top relative"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            onMouseMove={handleMouseMove}
          >
            <img
              alt="ecommerce"
              className="lg:py-20 rounded"
              src={product.img}
            />

            <div className="js-image-zoom__zoomed-area" style={{ background: "white", opacity: "0.4", position: "absolute", width: "72.7675px", height: "49.6531px", top: "264.705px", left: "66.6162px", display: "none" }}></div>
            {isHovered && (
              <div
                className="js-image-zoom__zoomed-image"
                style={{
                  backgroundImage: `url(${product.img})`,
                  backgroundRepeat: 'no-repeat',
                  display: 'block',
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                  transform: 'translateX(100%)',
                  width: '510px',
                  height: '435px',
                  backgroundSize: '425px 433px',
                  backgroundColor: 'white',
                  backgroundPosition,
                }}
              ></div>
            )}
            {/* <img alt="ecommerce" class="object-cover object-top rounded-lg" src={product.img}></img> */}
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">CODETHREADS</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color}) </h1>
            <div className="flex mb-4">

            </div>

            <p className="leading-relaxed">{product.description}</p>

            <div className="flex  mt-6 items-center pb-5mb-5">
              <div className="flex">
                <span className="mx-2">Colors:</span>
                {/* <span className='bold'>{product.color}</span> */}

                {color && Object.keys(varients).includes('white') && Object.keys(varients['white']).includes(size) && <button onClick={(e) => { refreshPage(size, 'white') }} className={`border-2  rounded-full w-6 h-6 focus:outline-none ${color === 'white' ? 'border-black' : 'border-gray-700'}`} />}
                {/* {color && Object.keys(varients).includes('pink') && Object.keys(varients['pink'].includes(size)) && <button onClick={(e) => { refreshPage(size, 'pink') }} className={`border-2  ml-1 bg-pink-700 rounded-full w-6 h-6 focus:outline-none ${color === 'pink' ? 'border-black' : 'border-gray-700'}`} />} */}
                {color && Object.keys(varients).includes('black') && Object.keys(varients['black']).includes(size) && <button onClick={(e) => { refreshPage(size, 'black') }} className={`border-2  ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color === 'black' ? 'border-pink-500' : 'border-gray-700'}`} />}
                {color && Object.keys(varients).includes('blue') && Object.keys(varients['blue']).includes(size) && <button onClick={(e) => { refreshPage(size, 'blue') }} className={`border-2  ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ${color === 'blue' ? 'border-black' : 'border-gray-700'}`} />}
                {color && Object.keys(varients).includes('green') && Object.keys(varients['green']).includes(size) && <button onClick={(e) => { refreshPage(size, 'green') }} className={`border-2  ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none ${color === 'green' ? 'border-black' : 'border-gray-700'}`} />}
                {color && Object.keys(varients).includes('gray') && Object.keys(varients['gray']).includes(size) && <button onClick={(e) => { refreshPage(size, 'gray') }} className={`border-2  ml-1 bg-gray-500 rounded-full w-6 h-6 focus:outline-none ${color === 'gray' ? 'border-black' : 'border-gray-100'}`} />}
                {color && Object.keys(varients).includes('orange') && Object.keys(varients['orange']).includes(size) && <button onClick={(e) => { refreshPage(size, 'orange') }} className={`border-2  ml-1 bg-orange-600 rounded-full w-6 h-6 focus:outline-none ${color === 'orange' ? 'border-black' : 'border-gray-700'}`} />}
                {color && Object.keys(varients).includes('yellow') && Object.keys(varients['yellow']).includes(size) && <button onClick={(e) => { refreshPage(size, 'yellow') }} className={`border-2  ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${color === 'yellow' ? 'border-black' : 'border-gray-700'}`} />}
                {color && Object.keys(varients).includes('brown') && Object.keys(varients['brown']).includes(size) && <button onClick={(e) => { refreshPage(size, 'brown') }} className={`border-2  ml-1 bg-amber-700 rounded-full w-6 h-6 focus:outline-none ${color === 'brown' ? 'border-black' : 'border-gray-700'}`} />}
                {color && Object.keys(varients).includes('red') && Object.keys(varients['red']).includes(size) && <button onClick={(e) => { refreshPage(size, 'red') }} className={`border-2  ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${color === 'red' ? 'border-black' : 'border-gray-700'}`} />}
                {color && Object.keys(varients).includes('pink') && Object.keys(varients['pink']).includes(size) && <button onClick={(e) => { refreshPage(size, 'pink') }} className={`border-2  ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none ${color === 'red' ? 'border-black' : 'border-gray-700'}`} />}
                {/* {color && Object.keys(varients).includes('pink') && Object.keys(varients['pink']).includes(size) && <button onClick={(e) => { refreshPage(size, 'pink') }} className={`border-2  ml-1 bg-pink-700 rounded-full w-6 h-6 focus:outline-none ${color === 'pink' ? 'border-black' : 'border-gray-700'}`} />} */}
                {color && Object.keys(varients).includes('purple') && Object.keys(varients['purple']).includes(size) && <button onClick={(e) => { refreshPage(size, 'purple') }} className={`border-2  ml-1 bg-indigo-700 rounded-full w-6 h-6 focus:outline-none ${color === 'purple' ? 'border-black' : 'border-gray-700'}`} />}
                {color && Object.keys(varients).includes('mehroon') && Object.keys(varients['mehroon']).includes(size) && <button onClick={(e) => { refreshPage(size, 'mehroon') }} className={`border-2  ml-1 bg-rose-700 rounded-full w-6 h-6 focus:outline-none ${color === 'mehroon' ? 'border-black' : 'border-gray-700'}`} />}
              </div>
            </div>

            {/* Size  */}

            <div className="mt-6 flex items-center my-2 w-1/3 md:w-1/4">
              <label className="flex m-2 text-xl">Size</label>
              <span>
              {size && Object.keys(varients[color]).includes('S') && (
                  <button
                    className="mx-1 border-black dark:border-white rounded-lg border px-2"
                    value="S"
                    onClick={(e) => refreshPage('S', color)}
                  >
                    S
                  </button>
                )}
              </span>
              <span>
                {size && Object.keys(varients[color]).includes('M') && (
                  <button
                    className="mx-1 border-black dark:border-white rounded-lg border px-2"
                    value="M"
                    onClick={(e) => refreshPage('M', color)}
                  >
                    M
                  </button>
                )}
              </span>
              <span>
                {size && Object.keys(varients[color]).includes('L') && (
                  <button
                    className="mx-1 border-black dark:border-white rounded-lg border px-2"
                    value="L"
                    onClick={(e) => refreshPage('L', color)}
                  >
                    L
                  </button>
                )}
              </span>
              <span>
                {size && Object.keys(varients[color]).includes('XL') && (
                  <button
                    className="mx-1 border-black dark:border-white rounded-lg border px-2"
                    value="XL"
                    onClick={(e) => refreshPage('XL', color)}
                  >
                    XL
                  </button>
                )}
              </span>
              <span>
                {size && Object.keys(varients[color]).includes('XXL') && (
                  <button
                    className="mx-1 border-black dark:border-white rounded-lg border px-2"
                    value="XXL"
                    onClick={(e) => refreshPage('XXL', color)}
                  >
                    XXL
                  </button>
                )}
              </span>
            
            </div>
            <hr className="mb-4 border border-gray-400"></hr>


            <div className="flex ">
              {!product.availableQty <= 0 && <span className="text-2xl md:text-3xl line-through text-gray-400 font-semibold px-2">{product.tPrice}</span>}
              {!product.availableQty <= 0 && <span className="text-3xl text-gray-700 dark:text-gray-100 font-bold"> RS {product.price}</span>}
              {product.availableQty <= 0 && <span className="text-gray-600 font-normal text-sm ml-2 dark:text-gray-400">(Sorry! This product is out of stock.)</span>}
              {!product.availableQty <= 0 && <span className="text-gray-600 font-normal text-sm ml-2 dark:text-gray-400">(Available Quantity: {product.availableQty})</span>}
            </div>
            <div className="pin mt-6 flex space-x-2 text-sm">
              <input onChange={onChangePin} className='px-2 border-2 border-pink-400 rounded-2xl ' placeholder='Enter Your Postel Code' type='text' />
              <button disabled={product.availableQty <= 0 ? true : false} onClick={checkServiceAbility} className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ml-2 disabled:bg-pink-300 disabled:cursor-not-allowed'>Check</button>
            </div>
            {!service && service != null && <div className="text-pink-400">
              Sorry!,we do not deliver to this pincode.
            </div>}
            {service && service != null && <div className="text-pink-400">
              Yeh! This pincode is service able.
            </div>}
            <div className="mt-4">
              <button disabled={product.availableQty <= 0 ? true : false} onClick={() => { buyNow(product.slug, product.availableQty, product.price, product.title,size, color, product.img) }} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline disabled:bg-pink-300 disabled:cursor-not-allowed">Buy Now</button>
              <button disabled={product.availableQty <= 0 ? true : false} onClick={() => { addToCart(product.slug,product.availableQty, product.price, product.title, size, color,product.img) }} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ml-2 disabled:bg-pink-300 disabled:cursor-not-allowed">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </section >

  </>
}

export const getServerSideProps = async (context) => {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }

  let product = await Product.findOne({ slug: context.query.slug });
  if (product == null) {
    return { props: { error: 404 }, }
  }
  let varients = await Product.find({ title: product.title, category: product.category })
  let colorSizeSlug = {} //{pink:{xl:{slug:'wear-the-code-xl'}}}
  for (let item of varients) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
    else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
  }



  return { props: { error: error, product: JSON.parse(JSON.stringify(product)), varients: JSON.parse(JSON.stringify(colorSizeSlug)) }, }
}
