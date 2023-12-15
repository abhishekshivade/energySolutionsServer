const User = require('../userSchema')

exports.getAllUsers = async (req,res)=>{
    try{
        const users = await User.find()
        res.json(users)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.getUser = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)

        if(!user){
            return res.status(404).json({message:'User not found'})
        }else{
            return res.json(user)
        }
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.createUser = async(req,res)=>{
 const newUser = new User(req.body)
 
 try{
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
 }catch(error){
    res.status(500).json({message:error.message})
 }
}

exports.updateUser = async (req,res)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new: true})

        if(!updatedUser){
            return res.status(404).json({message:'User not found'})
        }else{
            return res.json(updatedUser)
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.deleteUser= async (req,res)=>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id)

        if(!deletedUser){
            return res.status(404).json({message:'User not found'})
        }else{
            return res.json({message:'User Deleted Successfully'})
        }
    }catch(error){
        res.status(500).json({message:error.message})
    }
}