import express from 'express';
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from '../utils.js';


const orderRouter = express.Router();



orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      

      if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is empty' });
      } else {
        const order = new Order({
         
          orderItems: req.body.orderItems,
          shippingAddress: req.body.shippingAddress,
          paymentMethod: req.body.paymentMethod,
          itemsPrice: req.body.itemsPrice,
          shippingPrice: req.body.shippingPrice,
          taxPrice: req.body.taxPrice,
          totalPrice: req.body.totalPrice,
          user: req.user._id,
        });
        const createdOrder = await order.save();
        
          res.status(201).send({ message: 'New Order Created', order: createdOrder });
      }
    })
  );

//by using isAyth only authenticated users can see order details 

// API for getting details from order 
  orderRouter.get('/:id',isAuth,expressAsyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id)// /:id meken ganne slash ekata passe user ganna value eka
    if(order){
      res.send(order)
    }else{
      res.send(404).send({message:'Order Not Found'})
    }
  }))


export default orderRouter;