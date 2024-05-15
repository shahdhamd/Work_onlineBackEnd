
import mongoose, { Types, Schema, model } from "mongoose";
const AddServicesSchma = new Schema({
    servicesName: {
        type: String,
        required: true
    },
    servicesDescription: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    servicesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "model",
        required: true
    }
    ,
    createdBy: {
        type: Types.ObjectId,
        ref: 'user',
        required: [true, 'services owner is required']
    },

})
const AddservicesModel = model("AddServices", AddServicesSchma)
export { AddservicesModel }