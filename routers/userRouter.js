import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js';
import data from '../data.js';
import { generateToken } from '../utils.js';


const  userRouter=express.Router(); //meke dammama serer.js file eke witark rout tiyenne one na

//regular form of creating api*************
userRouter.get('/seed', expressAsyncHandler(async (req,res)=>{
    await User.remove({});//this delete all users
    const createdUsers=await User.insertMany(data.users);//insertMany accept array and it puts the values inside array to model
    res.send({createdUsers})
}) 
);

//this is post becuase we are going to create resourse in data base
userRouter.post('/signin',expressAsyncHandler(async(req,res)=>{
    const user = await User.findOne({email:req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password,user.password)){
            res.send({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({message:'Invalid email or password' })
}))

userRouter.post('/register',expressAsyncHandler(async(req,res)=>{
    const user =new User({name:req.body.name,email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8)
    });
    const createdUsers=await user.save();
    res.send({
        _id:createdUsers._id,
        name:createdUsers.name,
        email:createdUsers.email,
        isAdmin:createdUsers.isAdmin,
        token:generateToken(createdUsers)
    });
}));

export default userRouter; 