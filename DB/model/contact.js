

import mongoose, { Types,Schema ,model } from "mongoose";
const contactSchema=new Schema({
    proplem:{
        type:String,
        required:true
    },
    createdBy:{
        type:String,
        ref:'user',
        required:[true,'contact owner is required']
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AddServices",
        required: true
    },
    serviceName:{
        type:String,
        required:true
    }
})
const contactModel=model('contactServices',contactSchema)
export {contactModel}
