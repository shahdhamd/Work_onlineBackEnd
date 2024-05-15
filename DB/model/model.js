import mongoose, { Types, Schema, model } from "mongoose";

const modelSchema = new Schema({
    name: {
        type: String,
    },
    modeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "services",
        required: true
    },
    
    servicingUser: [
        {
            user: {
                type: Array,
                ref: "AddServices"
            },
            comments: [{
                text: String,
                madeby: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                DateAddComment: {
                    type: Date,
                    default: Date.now
                }
            }]
        }
    ],
    jobingUser: [{
        type: Array,
        ref: 'job'
    }]
});
const modelModel = model('model', modelSchema);
export { modelModel } 