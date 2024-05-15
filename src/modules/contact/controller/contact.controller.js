import { AddservicesModel } from "../../../../DB/model/Addservices.js";
import { contactModel } from "../../../../DB/model/contact.js";
import { userModel } from "../../../../DB/model/user.js";


export const addContactServices = async (req, res) => {
  const { proplem,serviceName} = req.body;
  const { serviceId } = req.params;
  
  try {
  
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.body.createdBy = user.userName; 

    req.body.serviceId = serviceId;
    const findServieces= await AddservicesModel.findById(serviceId)
    req.body.serviceName=findServieces.servicesName
   
    
    const createContact = await contactModel.create(req.body);
    res.json(createContact);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

export const showAllContacts=async(req,res)=>{
    try{
const showAll=await contactModel.find({})
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
const delet=await contactModel.findByIdAndDelete(id)
if(delet){
    res.status(200).json({message:"sucsses"})
}else{
    res.status(200).json({message:"  not sucsses"})
}
    }catch(error){
        res.status(400).json({message:`error ${error}`})

    }
}
