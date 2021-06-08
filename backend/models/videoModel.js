import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        comment:{type:String,required:true}
    },
    {
        timestamps:true,
    }
)

const videoSchema = new mongoose.Schema({
    title:{type: String,required:true},
    description:{type:String, required:true},
    likes:{type:Number, default:0},
    video:{type:String,required:true},
    thumbNail:{type:String,required:true},
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    ownerName:{type:String,required:true},
    views:{type:Number,default:0},
    uploadDate:{type:Date},
    comments:[commentSchema]
},{
    timestamps:true
});

const videoModel = mongoose.model("Video", videoSchema);

export default videoModel;