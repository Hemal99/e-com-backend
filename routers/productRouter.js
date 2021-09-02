import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';

const productRouter = express.Router();

//creating API for send data for frontend 
//list product api
//this API  for sending list of product to frontend
productRouter.get('/',expressAsyncHandler(async(req,res)=>{
    const products=await Product.find({});//find eka atule empty object ekak dammam kiyanna return all products kiyala
    res.send(products);
}));

//this API for creating six products based on data.products
productRouter.get('/seed',expressAsyncHandler(
    
    async(req,res)=>{
        //await Product.remove({})
        const createdProducts=await Product.insertMany(data.products);
        res.send({createdProducts})
    }
));



//api for product details
//This API  for returning details of the products to frontend
//meka antimata danna hetuwa /seed kiyana ekata meke reponse wenna puluwan nisa 
productRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message:'Product Not Found'});
    }
}))

export default  productRouter