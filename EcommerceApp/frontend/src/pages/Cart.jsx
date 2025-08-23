import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title2 from '../components/Title2'
import { assets } from '../assets/frontend_assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {

  const{products,currency,cartItems,updateQuantity,navigate} = useContext(ShopContext)
  const [cartData, setCartData] = useState([])
  useEffect(() => {
      const tempData = [];
      for(const items in cartItems){
        
        // console.log(items);
        
        for(const item in cartItems[items]){
          // console.log(item);
          // console.log(cartItems[items][item]);
          
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id:items,
              size: item,
              quantity : cartItems[items][item]
            })
          }
          
        }
      }
      setCartData(tempData);
  }, [cartItems])

  return (
    <div className='border-t pt-14 border-gray-400 '>
      <div className='text-2xl mb-3'>
          <Title2 text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {
          cartData.map((item,index)=>{
            const productData = products.find((product)=>product._id === item._id);
            return(
              <div key={index} className='border-t border-gray-300 py-4 border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                    <img className='w-16 sm;w-20' src={productData.image[0]} alt="" />
                    <div >
                      <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                      <div className='flex items-center mt-2 gap-5'>
                          <p>{currency}{productData.price}</p>
                          <p className='px-2 sm:px-3 sm:py-1 border border-gray-300 bg-slate-50'>{item.size}</p>
                      </div>
                    </div>
                </div>
                <input onChange={(e)=>e.target.value === '' || e.target.value === '0'? null : updateQuantity(item._id,item.size,Number(e.target.value))} className='border max-w-10 select-none sm:max-w-20 outline-none border-gray-300 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
                <img onClick={()=>updateQuantity(item._id,item.size,0)} className='sm:w-5 w-4 mr-4 cursor-pointer ' src={assets.bin_icon} alt="" />

              </div>
            )
          })
        }
      </div>

      <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[450px]'>
            <CartTotal/>
            <div className='w-full text-end'>
              <button onClick={()=>navigate('/place-order')} className='cursor-pointer bg-black text-white text-sm px-8 my-8 py-3 hover:bg-[#272626]'>PROCEED TO CHECKOUT</button>
            </div>
          </div>
      </div>

    </div>
  )
}

export default Cart