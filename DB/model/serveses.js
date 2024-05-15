import { Types,Schema ,model } from "mongoose";
const servicesSchema=new Schema({
    name:{
        type:String ,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    modeling:[{
        type:Array,
        ref:'model'
    } ]

})

const servicesModel=model('services',servicesSchema);
export {servicesModel}