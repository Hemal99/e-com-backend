import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({//schema eken karanne database eke fields tika hadna eka(table eke column tika)
    name:{type:String,required:true},//required :true kalama database(mongoose) eken validatin part eka krnwa(aluth user kenek danakota)
    email:{type:String,required:true,unique:true},//unique:true kalama mongoose create index in data base eken user email eka unique karnw
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false,required:true}
},{
    timestamps:true //about timestamps-https://masteringjs.io/tutorials/mongoose/timestamps
});


const User =mongoose.model("User",userSchema); //meke paramters dekak gannawa palaweni eka (modelName,Schema)

export default User;