import React, { useContext, useState } from 'react'
import Title2 from '../components/Title2'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState('Cash On Delivery') //cod=>cashOnDelivery
  const {navigate,token, backendUrl, cartItems,setCartItems,getCartAmount,delivery_fee,products} = useContext(ShopContext);
  const[formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  });

  const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler = async(eve)=>{
    eve.preventDefault();
    try {

      let orderItems = [];

      for(const items in cartItems){
        for(const item in cartItems[items]){
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items ))

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }

        }
      }

      let orderData = {
        address : formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'Cash On Delivery':
          const response = await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token:token}})
          // console.log(response)
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          }
          else{
            toast.error(response.data.message)
          }
          break;
      
        default:
          break;
      }

      // console.log(orderItems)


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title2 text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" autoComplete='off' placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" autoComplete="off" placeholder='Last name' className='border  border-gray-300 rounded py-1.5 px-3.5' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" autoComplete="off" placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" autoComplete="off" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" autoComplete='off' placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" autoComplete="off" placeholder='State' className='border  border-gray-300 rounded py-1.5 px-3.5' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" autoComplete='off' placeholder='Zip' className='border border-gray-300 rounded py-1.5 px-3.5' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" autoComplete="off" placeholder='Country' className='border  border-gray-300 rounded py-1.5 px-3.5' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number" autoComplete='off' placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5' />
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
              <div onClick={()=>setMethod('Stripe')} className='flex border-gray-300 items-center gap-3 border p-2 px-3 cursor-pointer '>
                <p className={`min-w-3.5 h-3.5 border-gray-300 border ${method === 'Stripe' ? 'bg-green-400' : ''} rounded-full`}>

                </p>
                <img src={assets.stripe_logo} className='h-5 w-13.5 mx-4' alt="" />
              </div>
              <div onClick={()=>setMethod('RazorPay')}className='flex border-gray-300 items-center gap-3 border p-2 px-3 cursor-pointer '>
                <p className={`min-w-3.5 h-3.5 border-gray-300 border ${method === 'RazorPay' ? 'bg-green-400' : ''} rounded-full`}>

                </p>
                <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
              </div>
              <div onClick={()=>setMethod('Cash On Delivery')}className='flex border-gray-300 items-center gap-3 border p-2 px-3 cursor-pointer '>
                <p className={`min-w-3.5 h-3.5 border-gray-300 border ${method === 'Cash On Delivery' ? 'bg-green-400' : ''} rounded-full`}>

                </p>
                <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
              </div>
            </div>
            <div className='w-full text-end mt-8'>
                <button type='submit' className='bg-black text-white cursor-pointer px-16 py-3 text-sm hover:bg-[#272626]'>PLACE ORDER</button>
            </div>
          </div>
      </div>
    </form>
  )
}

export default PlaceOrder