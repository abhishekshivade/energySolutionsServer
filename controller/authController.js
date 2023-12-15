const User = require('../userSchema')
const jwt = require('jsonwebtoken')

exports.login = async (req,res)=>{
    const {email,password} =req.body

    try{
        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json({message:'Invalid Credentials'})
        } else{
            const token = jwt.sign({userId: user._id,email:user.email},'secret-key')

            res.json({token})
        }
    }catch(error){
        res.status(500).json({message:error.message})
    }
}