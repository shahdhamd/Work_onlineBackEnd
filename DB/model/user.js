import { Types,Schema,model, now } from "mongoose";

const userSchema=new Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user',
        enum:['user','admin']
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    sendCode:{
        type:String,
        default:null
    },
    lastOpenDate:{
        type:Date,
        default:now
    }
},{timestamps:true})
const userModel=model('user',userSchema);
export {userModel};