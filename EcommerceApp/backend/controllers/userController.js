import userModel from "../models/userModel.js";
import bcript from 'bcrypt'
import validator from 'validator';
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async(req,res) =>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})
        if (!user) {
            return  res.json({success: false, message: "User doesn't exists"})
        }

        const isMatch = await bcript.compare(password,user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({success: true, token})
        }
        else{
            res.json({success:false,message: 'Invalid Credentials'})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// Route for user registration

const registerUser = async(req,res)=>{
    try {
        const{name,email,password} = req.body;

        // checking user is exist or not
        const exist = await userModel.findOne({email})
        if (exist) {
            return  res.json({success: false, message: "User already exists"})
        }
        
        // validating email and string pass
        if (!validator.isEmail(email)) {
            return  res.json({success: false, message: "Please enter a valid email"})
        }
        if (password.length < 8) {
            return  res.json({success: false, message: "Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcript.genSalt(10)
        const hashedPassword = await bcript.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password : hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success: true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//Route for admin Login
const adminLogin = async(req,res) =>{
    try {
        const{email,password} = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
//get user
const getUserProfile = async (req, res) => {
    try {
        // req.user aayega userAuth middleware se
        res.json({ success: true, user: req.user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// update user
const updateUserProfile = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findById(req.user._id);

        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        if (name) user.name = name;
        if (email) user.email = email;

        if (password && password.length >= 8) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await user.save();
        res.json({ success: true, message: 'Profile updated', user: await userModel.findById(user._id).select('-password') });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}


export {loginUser,registerUser,adminLogin,updateUserProfile,getUserProfile}