import { AddservicesModel } from "../../../../DB/model/Addservices.js";
import { modelModel } from "../../../../DB/model/model.js";
import cloudenary from "../../../services/cloudenary.js";

export const addServicesbyuser = async (req, res) => {
    const { servicesName, servicesDescription, image, instructions, price, time } = req.body;

    const { servicesId } = req.params;
    try {
        if (!req.file) {
            return res.json({ message: "اضف صورة للخدمة" });
        }
        if (!req.user || !req.user._id) {
            return res.status(400).json({ message: "يجب تسجيل الدخول لإضافة الخدمة" });
        }
        const { secure_url } = await cloudenary.uploader.upload(req.file.path, { folder: `services/image/` });

        req.body.image = secure_url;
        req.body.createdBy = req.user._id;

        const servicesbyuser = await AddservicesModel.create({
            servicesName,
            servicesDescription,
            instructions,
            price,
            time,
            servicesId,
            image: secure_url,
            createdBy: req.user._id,
        });

        const updatedModel = await modelModel.findOneAndUpdate(
            { _id: servicesId },
            { $push: { servicingUser: { user: servicesbyuser } } },
            { new: true }
        );

        res.status(200).json({ message: "تمت الاضافة بنجاح", update: updatedModel });

    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ: ' });
    }
};

export const deletUserformservicing = async (req, res) => {
    try {
        const { id, servicesId, userId } = req.params;
        // console.log(id)
        const findModule = await modelModel.findById(id);
        if (!findModule) {
            return res.status(404).json({ message: "Module not found" });
        }
        if (!req.user || !req.user._id) {

            return res.status(400).json({ message: "You must be logged in to delete the comment" });
        }
        // console.log(servicesId)

        const serviceIndex = findModule.servicingUser.findIndex(service => service._id.toString() === servicesId);

        if (serviceIndex === -1) {
            // console.log('hello')

            return res.status(404).json({ message: "Service not found in the model" });
        }
        // console.log(serviceIndex)

        const userIndex = findModule.servicingUser[serviceIndex].user.findIndex(user => user._id.toString() === userId);
        const findComments = findModule.servicingUser[serviceIndex].comments;
        console.log(servicesId)
        findComments.splice(0, findComments.length);
        if (userIndex === -1) {
            // console.log('-11')
            return res.status(404).json({ message: "user not found" });
        }
        if (findModule.servicingUser[serviceIndex].user[userIndex].createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this comment" });
        }
        const findService = await AddservicesModel.findByIdAndDelete(userId);

        findModule.servicingUser[serviceIndex].user.splice(userIndex, 1);
        await findModule.save();
        return res.status(200).json({ message: "user deleted successfully", findModule });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: `Error deleting user: ${error.message}` });
    }
};

export const showAll = async (req, res) => {
    try {
        const { id } = req.params;
        const find = await modelModel.findById(id);
        if (!find) {
            return res.status(400).json({ message: "مش موجود" });
        } else {
            // const servicingUser = find.servicingUser;
            // res.status(200).json(servicingUser);
            res.status(200).json(find);
        }
    } catch (error) {
        res.status(500).json({ message: `حدث خطأ ${error}` });
    }
}

export const All = async (req, res) => {
    try {
        const find = await modelModel.find({});
        const filteredResults = find.filter(item => item.servicingUser.length > 0);
        if (!filteredResults || filteredResults.length === 0) {
            return res.status(400).json({ message: "مش موجود" });
        } else {
            const servicingUsers = filteredResults.map(item => item.servicingUser);
            let x = [];
            servicingUsers.map((item) => {
                return (
                    item.map((i) => {
                        x.push(i);
                    })
                )
            })
            res.status(200).json(x);
            // res.json(filteredResults)
        }
    } catch (error) {
        res.status(500).json({ message: `حدث خطأ ${error}` });
    }
}

export const infor = async (req, res) => {
    const { id } = req.params;
    const find = await AddservicesModel.findById(id);
    if (!find) {
        res.status(400).json({ message: 'error' })
    } else {
        res.status(200).json(find)

    }
}

export const updateServising = async (req, res) => {
    const { id, servicesId, userId } = req.params;
    try {
        const { servicesName, servicesDescription, instructions, price, time } = req.body;

        req.body.createdBy = req.user._id;

        const findModel = await modelModel.findById(id);

        if (!findModel) {
            return res.status(404).json({ message: "Model not found" });
        }

        const findService = findModel.servicingUser.find(service => service._id.toString() === servicesId);

        if (!findService) {
            return res.status(404).json({ message: "Service not found in the model" });
        }

        if (findService.hasOwnProperty("createdBy") && findService.createdBy !== undefined && findService.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this service" });
        }

        const updatedService = {
            servicesName: servicesName || findService.servicesName,
            servicesDescription: servicesDescription || findService.servicesDescription,
            instructions: instructions || findService.instructions,
            price: price || findService.price,
            time: time || findService.time,

            createdBy: req.user._id,

        };

        if (req.file) {
            const { secure_url } = await cloudenary.uploader.upload(req.file.path, {
                folder: `services/image/`
            });
            updatedService.image = secure_url;
        } else {
            updatedService.image = findService.image;
        }

        const serviceIndex = findModel.servicingUser.findIndex(service => service._id.toString() === servicesId);


        if (serviceIndex === -1) {
            return res.status(404).json({ message: "Service not found in the model" });
        }

        let userIndex;
        if (findModel.servicingUser[serviceIndex] && findModel.servicingUser[serviceIndex].user) {
            userIndex = findModel.servicingUser[serviceIndex].user.findIndex(user => user && userId);



        } else {
            return res.status(404).json({ message: "User list not found in the service" });
        }

        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found in the service" });
        }


        const FindservicingByUser = await AddservicesModel.findByIdAndUpdate({ _id: userId }, updatedService, { new: true })



        findModel.servicingUser[serviceIndex].user[userIndex] = updatedService;

        await findModel.save();

        return res.status(200).json({ message: "Update successful", findModel });




    } catch (error) {
        return res.status(500).json({ message: `An error occurred: ${error}` });
    }
};


export const showServiceByUser = async (req, res) => {
    const find = await AddservicesModel.find({});
    if (!find) {
        res.json('error')
    } else {
        res.json(find)
    }
}

export const AllModel =async (req,res)=>{
    const find = await modelModel.find({});
    if (!find) {
        res.json('error')
    } else {
        res.json(find)
    }
}