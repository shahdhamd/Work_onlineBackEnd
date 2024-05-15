import mongoose, { Types,Schema ,model } from "mongoose";
const jobSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true

    },
    requirment:{
        type:String,
        required:true
    },
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"model",
       
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'user',
        required:[true,'services owner is required']
    },

   

})
const jobModel=model('job',jobSchema);
export {jobModel}