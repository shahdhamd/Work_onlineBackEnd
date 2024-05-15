import mongoose, { Types, Schema, model } from "mongoose";
const contacjobtSchema = new Schema({
    proplem: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: [true, 'contact owner is required']
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job",
        required: true
    },
    jobName: {
        type: String,
        required: true
    }

})
const contactjobModel = model('contactjob', contacjobtSchema)
export { contactjobModel }
