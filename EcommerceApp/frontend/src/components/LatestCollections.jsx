import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItems from './ProductItems';

const LatestCollections = () => {
    const {products} = useContext(ShopContext);
    const [latestProducts, seLatestProducts] = useState([])
    useEffect(() => {
      seLatestProducts(products.slice(0,10));
    }, [products])
        
  return (

    <div className='my-10'> 
        <div className='py-8 text-center text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Discover our latest arrivals, carefully curated to bring you the trendiest and most popular products. Shop now and stay ahead with our newest collections!
            </p>
        </div>

        {/* Rendering Products */}

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestProducts.map((item,index)=>(
                    <ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))
            }
        </div>
    </div>


  )
}

export default LatestCollections