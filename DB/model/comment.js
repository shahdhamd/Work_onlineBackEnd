
import { mongoose,Types,model, Schema } from 'mongoose';
const commentSchema=new Schema({
    comment:{
        type:String,
        required:true
    },
    madeby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    commentServices:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AddServices',
        required:true
    },
    DateAddComment: {
        type: Date,
        default: Date.now
    }
})
const commentModel=model('Comment',commentSchema)
export {commentModel}

