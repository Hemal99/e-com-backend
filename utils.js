import jwt from "jsonwebtoken"

export const generateToken =(user) =>{
    return jwt.sign(
        {_id:user._id,
         name:user.name,
         email:user.email,
         isAdmin:user.isAdmin,
    },  process.env.JWT_SECRET || 'somethingsecret',//this is like a key encript your data and generate a token
    {
        expiresIn:'30d',//expire date for this token 30 days
    });
};

//middleware function to authenticate user***********************

export const isAuth=(req,res,next)=>{//middle ware accept 3 parameters
    const authorization=req.header.authorization
    console.log("Auth",authorization)
    
    if(authorization){//slice function returns substring
        const token =authorization.slice(7,authorization.length)//authorization is like this-> Bearer XXXXXX    //from 7th index to the end of authorization string
        jwt.verify(token,process.env.JWT_SECRET||'somethingsecret',
        (err,decode)=>{
            if(err){
                res.status(401).send({message:'Invalid Token'})
            }else{
                req.user=decode;//decode eke tiyenne uda sign in eken gatta data
                next();//by calling next we use 'user' as property to next middle ware
            }
        })//we use jwt to decript the token
    }else{
        res.status(401).send({message:'No Token'})
    }
}