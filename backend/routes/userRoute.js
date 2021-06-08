import express from 'express';
import User from '../models/userModel.js';
import Video from '../models/videoModel.js';
import { getToken, isAuth } from '../util.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

//tested
router.post('/register',async(req,res)=>{
    try {
        console.log(req.body.email);
        const registerUser = await User.findOne({email:req.body.email});
        if(!registerUser)
        {
            console.log(req.body.name,req.body.email,req.body.image,req.body.password);
            const user = new User({
                name:req.body.name,
                email:req.body.email,
                image:req.body.image,
                password: bcrypt.hashSync(req.body.password, 8),
            })
            const newUser = await user.save();
            console.log("route2");
            return res.send(newUser);
        }
        return res.status(401).send({message:"mail already in use, try different mail"});
    } catch (error) {
        return res.send(error);
    }
})
//checked
router.post('/signin',async(req,res)=>{
    try {
        const signinuser = await User.findOne({email:req.body.email});
        if(signinuser)
        {
            if (bcrypt.compareSync(req.body.password, signinuser.password)) {
                return res.send({
                _id: signinuser._id,
                name: signinuser.name,
                email: signinuser.email,
                image:signinuser.image,
                createdAt:signinuser.createdAt,
                token: getToken(signinuser),
                });
              }
        }
        return res.status(401).send({ message: 'Invalid Email or Password.' });
    } catch (error) {
        return res.send(error);
    }
})
//checked
router.post('/uploadvideo',isAuth,async(req,res)=>{
    try {
        const videouser = await User.findById(req.user._id);
        if(videouser)
        {
            const video = new Video(
                {
                    title:req.body.title,
                    description:req.body.description,
                    video:req.body.video,
                    thumbNail:req.body.thumbNail,
                    owner:req.user._id,
                    ownerName:req.user.name
                }
            )
            const newvideo = await video.save();
            videouser.videos.push(newvideo._id);
            await videouser.save();
            return res.send(newvideo);
        }
        return res.status(401).send({message:"user does not exist"});
    } catch (error) {
        return res.send(error);
    }
})
//checked
router.get('/myvideos',isAuth,async(req,res)=>{
    try {
        const myvideos = await Video.find({owner:req.user._id});
        if(myvideos)
        return res.send(myvideos);
        else
        return res.status(401).send({message:"videos not found"});
    } catch (error) {
        return res.send(error);
    }
})



export default router;