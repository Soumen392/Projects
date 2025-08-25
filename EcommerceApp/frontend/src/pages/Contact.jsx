import React from 'react'
import Title from '../components/Title2'
import { assets } from '../assets/frontend_assets/assets'
import NewLetterBox from '../components/NewLetterBox'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 border-t border-gray-300'>
        <Title text1={'CONTACT'} text2={'Us'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
          <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
          <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-xl text-gray-600'>Our Store</p>
            <p className='text-gray-500'>123,Park Street,Near City Mall <br />Kolkata - 700091, West Bengal, India</p>
            <p className='text-gray-500'>Tel: 008 7654 320<br />Email: support@shopease.in</p>
            <p className='font-semibold text-xl text-gray-600'>Careers at ShopEase</p>
            <p className='text-gray-500'>Learn more about our teams and job openings.</p>
            <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer'>Explore Jobs</button>
          </div>
      </div>
        <NewLetterBox/>
    </div>
  )
}

export default Contact