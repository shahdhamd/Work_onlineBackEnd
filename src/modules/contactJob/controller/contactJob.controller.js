import { contactjobModel } from "../../../../DB/model/contactJob.js";
import { jobModel } from "../../../../DB/model/job.js";
import { userModel } from "../../../../DB/model/user.js";

export const addJobContact=async(req,res)=>{
    const {proplem,jobName}=req.body
    const {jobId}=req.params;
    try{
const user=await userModel.findById(req.user._id)
if(!user){
    return res.status(404).json({ message: "User not found" });

}

req.body.createdBy = user.userName;
req.body.jobId = jobId;

const findJob=await jobModel.findById(jobId);
req.body.jobName=findJob.name
const createJob=await contactjobModel.create(req.body)
res.json({message:"sucsses",createJob})



    }catch(error){
        res.status(500).json({ message: `Error: ${error.message}` });
    }
}


export const showAllContacts=async(req,res)=>{
    try{
const showAll=await contactjobModel.find({})
if(!showAll){
    res.status(400).json({message:"not found"})
}else{
    res.status(200).json({message:"sucsses", showAll})
}
    }catch(error){
res.status(400).json({message:`error ${error}`})
    }
}

export const deletContacts=async(req,res)=>{
    try{
        const {id}=req.params
const delet=await contactjobModel.findByIdAndDelete(id)
if(delet){
    res.status(200).json({message:"sucsses"})
}else{
    res.status(200).json({message:"  not sucsses"})
}
    }catch(error){
        res.status(400).json({message:`error ${error}`})

    }
}
