import mongoose from "mongoose";

const Schema=mongoose.Schema;

const userSchema=new Schema({
    email:{type:String,required:true},
    passwordHash:{type:String,required:true},
});

export default mongoose.model("User",userSchema)

