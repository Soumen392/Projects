import userModel from "../models/userModel.js";

//Add products to user cart

const addToCart = async(req,res) =>{

    try {
        const { userId, itemId, size} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartDataProperty;

        if (cartData[itemId]) {
            if (cartData [itemId][size]){

                cartData[itemId] [size] += 1

            }
            else{
                cartData[itemId] [size] = 1
            }
        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        
        await userModel.findByIdAndUpdate(userId,{ $set: { cartDataProperty: cartData } },{ new: true })

        res.json({success:true,message:"Added To Cart"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//Update user cart

const updateUserCart = async(req,res) =>{
    try {
        const{userId,itemId,size,quantity} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartDataProperty

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId,{ $set: { cartDataProperty: cartData } },{ new: true })

        res.json({success:true,message:"Cart Updated"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//Get data from user cart

const getUserCart = async(req,res) =>{
    try {
        const {userId} = req.body;

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartDataProperty

        res.json({success:true,cartData})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {getUserCart,updateUserCart,addToCart}