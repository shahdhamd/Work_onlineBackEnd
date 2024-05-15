import { jobModel } from "../../../../DB/model/job.js";
import { modelModel } from "../../../../DB/model/model.js";
import { userModel } from "../../../../DB/model/user.js";





export const addJob = async (req, res) => {
    const { name, description, requirment } = req.body;
    const { jobId } = req.params;

    try {
        const findModel = await modelModel.findById(jobId);
      
        if (!req.user || !req.user._id) {
            return res.status(400).json({ message: "يجب تسجيل الدخول لإضافة الوظيفة" });
        }
        if (!findModel) {
            return res.status(400).json({ message: "النموذج غير موجود" });
        }

        const job = await jobModel.create({
            name,
            description,
            requirment,
            createdBy: req.user._id,
            
        });

        if (!job) {
            return res.status(400).json({ message: "حدث خطأ أثناء إضافة الوظيفة" });
        }

       
     
            const update = await modelModel.findByIdAndUpdate(
                jobId,
                { $push: { jobingUser: job } },
                { new: true }
            );

            if (!update) {
                return res.status(400).json({ message: "حدث خطأ أثناء إضافة الوظيفة" });
            }
        

        return res.status(200).json({ message: "تمت إضافة الوظيفة بنجاح", job });

    } catch (error) {
        console.error("Error adding job:", error);
        return res.status(500).json({ message: "حدث خطأ أثناء إضافة الوظيفة" });
    }
};




 export const deletJob=async(req,res)=>{
    const {id,jobId}=req.params;
    try{
        if(!req.user || !req.user._id || userModel.role!="admin"){
            return res.status(400).json({ message: "يجب تسجيل الدخول لحذف الخدمة" });
        }
        const job=await jobModel.findById(jobId);
        if(!job || job.createdBy.toString()!==req.user._id.toString() ){
            return res.status(403).json({ message: "غير مسموح لك بحذف هذه الوظيفة" });
        }
        const delet=await modelModel.findByIdAndUpdate(id,{$pull :{jobingUser:job}},{new:true})
        const deletJob=await jobModel.findByIdAndDelete(id)
        if(delet){
            return res.status(200).json({message:"تم الحذف بنجاح",delet})
        }else{
            return res.status(400).json({message:"خطا في حذف الوظيفة"})
        }

    }catch(error){
        res.status(500).json({ message: `حدث خطأ: ${error}` });
    }
  
 }
 export const showAll = async (req, res) => {
    try {
        const { id } = req.params;
        const find = await modelModel.findById(id);

        if (!find) {
            return res.status(400).json({ message: "مش موجود" });
        } else {
            
            const jobingUser = find.jobingUser;
            res.json(jobingUser);
        }
    } catch(error) {
        res.status(500).json({ message: `حدث خطأ ${error}` });
    }
}



export const updateJob = async (req, res) => {
    const { name, description, requirement } = req.body; 
    const { id, jobId } = req.params;
    
    try {
        
        const findModel = await modelModel.findById(id);


        if (!findModel) {
            return res.status(404).json({ message: "Model not found" });
        }
        const findjob = await jobModel.findById(jobId);
        if(!req.user || !req.user._id){
            return res.status(400).json({ message: "يجب تسجيل الدخول لتعديل الوظيفة" });
        }
        const job=await jobModel.findById(jobId);
        if(!job || job.createdBy.toString()!==req.user._id.toString()){
            return res.status(403).json({ message: "غير مسموح لك بتعديل هذه الوظيفة" });
        }
      
        if (!findjob) {
            return res.status(400).json({ message: "الوظيفة غير موجودة" });
        }

     
        if(!name){
            req.body.name = findjob.name;
        }
        if(!description){
            req.body.description = findjob.description;
        }
        if(!requirement){
            req.body.requirement = findjob.requirement;
        }
      
      
        const updatedJob = await jobModel.findOneAndUpdate({_id: jobId}, req.body, { new: true }); 

    const jobindex=findModel.jobingUser.findIndex(job=>  job && jobId);
    findModel.jobingUser[jobindex]=updatedJob;

           

            if (!updatedJob) {
                return res.status(400).json({ message: "لم تتم عملية التعديل" });
            } else {
                return res.status(200).json({ message: "تم التعديل", updatedJob });
            }
        

    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ message: "حدث خطأ أثناء تحديث الوظيفة" });
    }
};

