import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config();


const app = express();
app.use(express.json());//created new middleware passing json data in the body of request
app.use(express.urlencoded({extended:true}));//converting http request to req.body in node application



mongoose.connect(process.env.MONGODB_URL||'mongodb://localhost/E-com',
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        
    }
    )//this accept two parameters 1st one address,2 nd -option




/* app.get('/api/products/:id',(req,res)=>{
    
    const product = data.products.find(x => x._id === req.params.id)
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message: 'Product not Found'});
    }
   
}); */

//importing API's
app.use('/api/users',userRouter);

app.use('/api/products',productRouter);

app.use('/api/orders',orderRouter);

app.get('/',(req,res)=>{
    res.send("Server is ready");
});

app.use((err,req,res,next) =>{//this middleware(that hava access both to request and respond) function is an error catcher
    console.log(err)
    res.status(500).send({message:err.message})//expressAsyncHandler eken mekata error eka redirect karanwa meken frontend dekata yawanwa
}
)

const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Serve at http://localhost:${port}`);
})

//4.55
