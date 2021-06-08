import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{type: String,required:true},
    email:{type:String, required:true, trim:true, dropDups: true},
    image:{type:String,required:true},
    password:{type:String, required:true},
    verificationToken:{type:String},
    videos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true
      }],
    totalLikes:{type:Number,default:0},
},{timestamps:true});

const userModel = mongoose.model("User", userSchema);

export default userModel;