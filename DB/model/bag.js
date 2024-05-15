import mongoose, { Types, Schema, model } from "mongoose";
const addbagSchema = new Schema({
    services: {
        type: Array,
        required: true
    },
    quatity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    }
    , madeby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    servicesId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "services",

    },
    modeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "models",

    }, 
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "addservices",

    }
})
const bagModel = model('bag', addbagSchema)
export { bagModel }