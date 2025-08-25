import React, { useContext, useState } from 'react'
import Title2 from '../components/Title2'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod') //cod=>cashOnDelivery
  const {navigate} = useContext(ShopContext);
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title2 text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'>
          <input type="text" autoComplete='off' placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5' />
          <input type="text" autoComplete="off" placeholder='Last name' className='border  border-gray-300 rounded py-1.5 px-3.5' />
        </div>
        <input type="email" autoComplete="off" placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5' />
        <input type="text" autoComplete="off" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5' />
        <div className='flex gap-3'>
          <input type="text" autoComplete='off' placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5' />
          <input type="text" autoComplete="off" placeholder='State' className='border  border-gray-300 rounded py-1.5 px-3.5' />
        </div>
        <div className='flex gap-3'>
          <input type="number" autoComplete='off' placeholder='Zip' className='border border-gray-300 rounded py-1.5 px-3.5' />
          <input type="text" autoComplete="off" placeholder='Country' className='border  border-gray-300 rounded py-1.5 px-3.5' />
        </div>
        <input type="number" autoComplete='off' placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5' />
      </div>
      {/* Right Side */}

      <div className='mt-8'>
          <div className='mt-8 min-w-80'>
            <CartTotal/>
          </div>
          <div className='mt-12'>
            <Title2 text1={'PAYMENT'} text2={'METHOD'}/>
            {/* Payment Method Selections */}
            <div className='flex gap-3 flex-col lg:flex-row'>
              <div onClick={()=>setMethod('stripe')} className='flex border-gray-300 items-center gap-3 border p-2 px-3 cursor-pointer '>
                <p className={`min-w-3.5 h-3.5 border-gray-300 border ${method === 'stripe' ? 'bg-green-400' : ''} rounded-full`}>

                </p>
                <img src={assets.stripe_logo} className='h-5 w-13.5 mx-4' alt="" />
              </div>
              <div onClick={()=>setMethod('razor')}className='flex border-gray-300 items-center gap-3 border p-2 px-3 cursor-pointer '>
                <p className={`min-w-3.5 h-3.5 border-gray-300 border ${method === 'razor' ? 'bg-green-400' : ''} rounded-full`}>

                </p>
                <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
              </div>
              <div onClick={()=>setMethod('cod')}className='flex border-gray-300 items-center gap-3 border p-2 px-3 cursor-pointer '>
                <p className={`min-w-3.5 h-3.5 border-gray-300 border ${method === 'cod' ? 'bg-green-400' : ''} rounded-full`}>

                </p>
                <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
              </div>
            </div>
            <div className='w-full text-end mt-8'>
                <button onClick={()=>navigate('/orders')} className='bg-black text-white cursor-pointer px-16 py-3 text-sm hover:bg-[#272626]'>PLACE ORDER</button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default PlaceOrder