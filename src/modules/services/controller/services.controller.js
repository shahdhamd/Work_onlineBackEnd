import { modelModel } from "../../../../DB/model/model.js";
import { servicesModel } from "../../../../DB/model/serveses.js";
import cloudenary from "../../../services/cloudenary.js";

export const addServices = async (req, res) => {
    try {
        const { name, image } = req.body;
        console.log(name)

        const findServeses = await servicesModel.findOne({ name: name })
        if (findServeses) {
            return res.json({ message: "هذه الخدمة موجودة مسبقا " })
        } else {
            if (!req.file) {
                return res.json({ message: "الصورة مطلوبة " })
            }
            const { secure_url } = await cloudenary.uploader.upload(req.file.path, { folder: 'services/image/' });
            req.body.image = secure_url;
            const services = await servicesModel.create(req.body)
            if (!services) {
                return res.json({ message: "خطا في الاضافة" })
            } else {
                res.status(200).json({ message: "تمت الاضافة بنجاخ", services })
            }
        }
    } catch (error) {
        return res.json({ message: `catch error ${error}` })
    }

}
export const deletServeces = async (req, res) => {
    const { id } = req.params;
// console.log(id)
    const deletUser = await servicesModel.findByIdAndDelete(id);
    // console.log(deletServeces)
    if (!deletUser) {
        res.status(400).json({ message: "فشل في عملية الحذف" })
    } else {
        res.status(200).json({ message: "تمت عملية الحذف" })
    }
}
export const showAll = async (req, res) => {
    const findAll = await servicesModel.find({})
    if (!findAll) {
        res.status(400).json({ message: "لا يوجد نتائج" })
    } else {
        res.status(200).json({ message: "النتائج", findAll })
    }
}

export const update = async (req, res) => {
    try {
        const { name, image } = req.body;
        const { id } = req.params;

console.log(id)
        const updatedService = await servicesModel.findByIdAndUpdate(id, {
            $set: {
                name: name || findServices.name,
                image: req.file ? (await cloudenary.uploader.upload(req.file.path, { folder: 'services/image/' })).secure_url : findServices.image // تحديث الصورة إذا تم تقديمها، وإلا، استخدم الصورة الحالية
            }
        }, { new: true });

        if (!updatedService) {
            return res.status(400).json({ message: "invalid id" });
        }

        return res.status(200).json({ message: "success", updatedService });
    } catch (error) {
        return res.status(500).json({ message: `Catch error ${error}` });
    }
}
export const addmodelToServeces = async (req, res) => {
    try {
        const { name } = req.body;
        const { modeId } = req.params;
        const newModel = await modelModel.create({
            name,
            modeId
        });
        const updateModel = await servicesModel.findOneAndUpdate(
            { _id: modeId },
            { $push: { modeling: newModel } },
            { new: true }
        )
        res.status(200).json({ message: "تمت الاضافة بنجاح", updateModel })


    } catch (error) {
        res.status(500).json({ message: `catch error ${error}` })
    }
}

export const DeletModelfromServices = async (req, res) => {
    try {
        const { modeId, modelID } = req.params;
        const findModel = await modelModel.findById(modelID);
        if (!findModel) {
            res.status(400).json({ message: "المودل غير موجود" })
        } else {
            const delet = await servicesModel.findByIdAndUpdate(modeId, { $pull: { modeling: findModel } }, { new: true })
            if (delet) {
                res.status(200).json({ message: "تم الحذف بنجاح", delet })
            } else {
                res.status(400).json({ message: "فشل في حذف المودل" })
            }
        }



    } catch (error) {
        res.status(500).json({ message: `catch error  ${error}` })
    }
}


export const showAllModel = async (req, res) => {
    const { id } = req.params;
    const findServices = await servicesModel.findById(id);
    if (!findServices) {
        res.status(400).json({ message: "الخدمة غير متوفرة " })
    } else {
        res.status(200).json({ message: "النماذج ", findServices })
    }

}



export const updateModel = async (req, res) => {
    const { updateName } = req.body;

    const { modeId, modelID } = req.params;

    try {
        const modelUpdated = await modelModel.findById(modelID);

        if (!modelUpdated) {
            return res.status(400).json({ message: "المودل غير موجود" });
        } else {

            const updatedModel = await modelModel.findByIdAndUpdate(modelID, { name: updateName }, { new: true });


            const findServices = await servicesModel.findById(modeId);


            const servicesIndex = await findServices.modeling.findIndex(service => service && modeId);

            findServices.modeling.flat()[servicesIndex].name = updatedModel.name

            const findupdateSer = await servicesModel.findByIdAndUpdate(
                modeId,
                findServices,
                { new: true }
            );



            return res.status(200).json({ message: "تم تحديث النموذج بنجاح", findupdateSer });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "حدث خطأ ما أثناء تحديث النموذج" });
    }
}


