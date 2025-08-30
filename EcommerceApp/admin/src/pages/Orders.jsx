import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {backendUrl, currency} from '../App'
import { assets } from '../assets/assets'

const Orders = ({token}) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () =>{
      if (!token) {
        return null
      }
      try {
        const response = await axios.post(backendUrl+'/api/order/list',{},{headers:{token}})
        if(response.data.success){
          setOrders(response.data.orders)
        }
        else{
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error(error.message);  
      }
  } 

  const statusHandler = async (event,orderId) =>{
    try {
      const response = await axios.post(backendUrl+'/api/order/status',{orderId,status:event.target.value},{headers:{token}})
      if(response.data.success){
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
     fetchAllOrders()
  }, [token])

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Order Page</h3>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-300 rounded-md p-5 md:p-6 bg-white shadow-sm"
          >
            {/* Left: Parcel Icon */}
            <div className="flex items-start gap-4 w-full md:w-2/3">
              <img
                src={assets.parcel_icon}
                alt="parcel"
                className="w-12 h-12 sm:w-14 sm:h-14"
              />
              <div className="text-gray-700 text-sm space-y-1">
                {/* Items list */}
                <div className="font-medium">
                  {order.items.map((item, i) =>
                    i === order.items.length - 1 ? (
                      <span key={i}>
                        {item.name} x {item.quantity} <span> {item.size}</span>
                      </span>
                    ) : (
                      <span key={i}>
                        {item.name} x {item.quantity} <span>{item.size}</span>,{" "}
                      </span>
                    )
                  )}
                </div>

                {/* Address */}
                <p className="font-semibold">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
                <p>{order.address.phone}</p>
              </div>
            </div>

            {/* Right: Order Info */}
            <div className="mt-4 md:mt-0 flex flex-col gap-2 text-gray-700 text-sm w-full md:w-1/3">
              <p>Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toDateString()}</p>
              <p className="font-semibold">
                {currency}
                {order.amount}
              </p>

              <select
                onChange={(event)=>statusHandler(event,order._id)}
                value={order.status}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivey">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default Orders