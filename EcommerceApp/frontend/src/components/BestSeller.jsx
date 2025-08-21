import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title2 from './Title2';
import ProductItems from './ProductItems';


const BestSeller = () => {
    
    const {products} = useContext(ShopContext);
    
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProducts = products.filter((ele)=>{
        return ele.bestseller
    });
        setBestSeller(bestProducts.slice(0,5))
    }, [products])
    

    return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title2 text1={'BEST'} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Discover our most popular products, handpicked by our customers. These best sellers are loved for their quality, value, and style. Shop now and see why they're everyone's favorites!
            </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
            
        
            
            {  
                bestSeller.map((item,index)=>(
                    <ProductItems key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
                    
                ))
                
            }
        </div>

    </div>
  )
}

export default BestSeller