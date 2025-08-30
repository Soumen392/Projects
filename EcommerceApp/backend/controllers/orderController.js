import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

//placed cash on delivery order

const placeOrder = async(req,res) =>{
    try {
        const {userId, items, amount, address} = req.body
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Cash On Delivery',
            payment: false,
            date: Date.now()
        }

        const newOrder = orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{ $set: { cartDataProperty: {} } },{ new: true });

        res.json({success:true,message:"Order Placed"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//placed orders using stripe mode
const placeOrderStripePay = async(req,res) =>{

}



//placed orders using razorPay mode
const placeOrderRazorPay = async(req,res) =>{

}

//all orders data for admin panel
const allOrders = async(req,res) =>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//User order data for frontend
const userOrders = async(req,res) =>{
    try {
        
        const {userId} = req.body

        const orders = await orderModel.find({userId});
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//Update orders status from admin panel
const updateStatus = async(req,res) =>{
    try {
        const {orderId, status} = req.body;

        await orderModel.findByIdAndUpdate(orderId, {status});
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {allOrders,placeOrder,placeOrderRazorPay,placeOrderStripePay,userOrders,updateStatus}
