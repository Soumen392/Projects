import userModel from "../models/userModel.js";

//Add products to user cart

const addToCart = async(req,res) =>{

    try {
        const { userId, itemId, size} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if (CartData[itemId]) {
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
        
        await userModel.findByIdAndUpdate(userId,{cartData})

        res.json({success:true,message:"Added To Cart"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//Update user cart

const updateUserCart = async(req,res) =>{

}

//Get data from user cart

const getUserCart = async(req,res) =>{

}

export {getUserCart,updateUserCart,addToCart}