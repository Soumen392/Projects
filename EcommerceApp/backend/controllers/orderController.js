import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"
import razorpay from "razorpay"

//global variable

const currency = "inr"
const deliveryCharge = 20

// gateway Initialize

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorPayInstence = new razorpay({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_KEY_SECRET
})


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
    try {
        const {userId,items,amount,address} = req.body
        const origin = req.headers.origin || "http://localhost:5173"

         const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now()
        }

        const newOrder = orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item)=>({
            price_data:{
                currency: currency,
                product_data:{
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100)
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency: currency,
                product_data:{
                    name: "Delivery Charges",
                },
                unit_amount: Math.round(deliveryCharge * 100)
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',

        })
        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// verify Stripe
const verifyStripe = async(req,res) =>{
    const {orderId,success,userId} = req.body

    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(orderId,{cartDataProperty:{}})
            res.json({success:true});
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;

    // Fetch order details from Razorpay
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartDataProperty: {} });
            res.json({ success: true, message: 'Payment Successful' });
        } else {
            res.json({ success: false, message: 'Payment Failed' });
        }


    // You can add logic here to verify payment status, update DB, etc.
    res.json({ success: true, orderInfo });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};




//placed orders using razorPay mode
const placeOrderRazorPay = async(req,res) =>{
    try {
        const {userId,items,amount,address} = req.body

         const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'RazorPay',
            payment: false,
            date: Date.now()
        }
        const newOrder = orderModel(orderData)
        await newOrder.save()
        
        const option = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorPayInstence.orders.create(option, (error, order)=>{
            if (error) {
                console.log(error)
                return res.json({success: false, message: error})
            }
            res.json({success:true,order})
        })



    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})   
    }
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

export {verifyRazorpay,verifyStripe,allOrders,placeOrder,placeOrderRazorPay,placeOrderStripePay,userOrders,updateStatus}
