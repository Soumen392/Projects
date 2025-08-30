import express from 'express'
import { placeOrder,allOrders,placeOrderRazorPay,placeOrderStripePay,updateStatus,userOrders} from '../controllers/orderController.js'

import authUser from '../middleware/auth.js'

import adminauth from '../middleware/adminauth.js'

const orderRouter = express.Router();

// Admin features
orderRouter.post('/list',adminauth,allOrders)
orderRouter.post('/status',adminauth,updateStatus)

// Payment Feauters 
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripePay)
orderRouter.post('/razorpay',authUser,placeOrderRazorPay)

// User features
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter