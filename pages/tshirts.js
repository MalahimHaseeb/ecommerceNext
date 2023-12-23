import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Product from '@/models/Product';
import mongoose from "mongoose";


const Tshirts = ({products}) => {
  return (
    <div className='min-h-screen'>
      <Head>
        <title>T-Shirts - wear the code</title>
        <meta name='description' content='Tshirts - Wear the code' />
        <link rel="icon" href="/favicon.io" />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-wrap -m-4">
          {Object.keys(products).length === 0 && <p>Sorry ! All T-shirts are out of stock.New stock will coming soon.</p>}
          {Object.keys(products).map((item)=>{  
            
            
            return  <div key={products[item]._id} className="lg:w-1/5 md:w-1/2 p-2 w-full shadow-lg m-5">
            

              <Link passHref={true}  href={`/product/${products[item].slug}`} className="block relative  rounded overflow-hidden">
                <img alt="ecommerce" className="m-auto  h-[68vh] md:h-[36vh] block" src={products[item].img} />
             
              <div className="mt-4 text-center">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                <h1 className="text-gray-700 title-font text-lg font-medium">{products[item].title.slice(0, 14)}...</h1>

                <div className="flex flex-row justify-between items-center mb-2">
                <div className="flex justify-start flex-wrap">
                {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-4 h-4 focus:outline-none" />}
                {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-4 h-4 focus:outline-none" />}
                {products[item].color.includes('white') && <button className="border-2 border-gray-300 ml-1  rounded-full w-4 h-4 focus:outline-none" />}
                {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-4 h-4 focus:outline-none" />}
                {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-4 h-4 focus:outline-none" />}
                {products[item].color.includes('gray') && <button className="border-2 border-gray-300 ml-1 bg-gray-500 rounded-full w-4 h-4 focus:outline-none" />}
                {products[item].color.includes('orange') && <button className="border-2 border-gray-300 ml-1 bg-orange-700 rounded-full w-4 h-4 focus:outline-none" />}
                {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-4 h-4 focus:outline-none" />}
                {products[item].color.includes('brown') && <button className="border-2 border-gray-300 ml-1 bg-amber-700 rounded-full w-4 h-4 focus:outline-none" />}
                {/* {products[item].color.includes('pink') && <button className="border-2 border-gray-300 ml-1 bg-pink-700 rounded-full w-6 h-6 focus:outline-none" />} */}
                {products[item].color.includes('pink') && <button className="border-2 border-gray-300 ml-1 bg-pink-700 rounded-full w-6 h-6 focus:outline-none" />}
                {products[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-indigo-700 rounded-full w-4 h-4 focus:outline-none" />}
                {products[item].color.includes('mehroon') && <button className="border-2 border-gray-300 ml-1 bg-rose-700 rounded-full w-4 h-4 focus:outline-none" />}
                  </div>
                 </div>

                <div className='text-sm font-semibold ml-14' style={{marginTop:"-30px"}}>
                <span className="line-through mx-2 text-gray-400">{products[item].tPrice}</span>
                 RS {products[item].price}
                </div>

                <div className="mt-1">
                  {products[item].size.includes('S') && <span className='border border-gray-300 mx-1 px-1'>S</span>}
                  {products[item].size.includes('M') && <span className='border border-gray-300 mx-1 px-1'>M</span>}
                  {products[item].size.includes('L') && <span className='border border-gray-300 mx-1 px-1'>L</span>}
                  {products[item].size.includes('XL') && <span className='border border-gray-300 mx-1 px-1'>XL</span>}
                  {products[item].size.includes('XXL') && <span className='border border-gray-300 mx-1 px-1'>XXL</span>}
                  </div>
                
              </div>
              </Link> 
            </div>})}
          </div>
        </div>
      </section>
  
    </div>
  )
}


export const getServerSideProps = async () => {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
  }
  
    let products=await Product.find({category:'T-Shirts'});
    let tshirts={}
        for(let item of products){
           if(item.title in tshirts){
              if(!tshirts[item.title].color.includes('item.color') && item.availableQty > 0 ){
                tshirts[item.title].color.push(item.color)
              }
              if(!tshirts[item.title].size.includes('item.size') && item.availableQty > 0 ){
                tshirts[item.title].size.push(item.size)
              }
           }
           else{
            tshirts[item.title]=JSON.parse(JSON.stringify(item))
            if(item.availableQty > 0){
                tshirts[item.title].color=[item.color]
                tshirts[item.title].size=[item.size]
            }
            else{
              tshirts[item.title].color=[]
              tshirts[item.title].size=[]
            }
           }
        }

  return { props: { products:JSON.parse(JSON.stringify(tshirts))}, }
}

export default Tshirts
