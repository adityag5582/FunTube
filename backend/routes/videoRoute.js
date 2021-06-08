import express from 'express';
import User from '../models/userModel.js';
import Video from '../models/videoModel.js';
import { getToken, isAuth } from '../util.js';
const router = express.Router();

//checked
router.get('/',async(req,res)=>{
    try {
        const videos = await Video.find();
        if(videos)
        return res.send(videos);
        return res.status(401).send({message:"No video found"});
    } catch (error) {
        return res.send(error);
    }
})
//checked
router.get('/:id',async(req,res)=>{
    try {
        const requestedvideo = await Video.findById(req.params.id);
        if(requestedvideo)
        {
            requestedvideo.views=requestedvideo.views+1;
            await requestedvideo.save();
            return res.send(requestedvideo);
        }
        else
        return res.status(401).send({message:"video not found"});
    } catch (error) {
        return res.send(error);
    }
})
//checked
router.put('/:id',isAuth,async(req,res)=>{
    try {
        const updatevideo = await Video.findById(req.params.id);
        if(updatevideo)
        {
            updatevideo.description = req.body.description || updatevideo.description,
            updatevideo.title = req.body.title || updatevideo.title,
            updatevideo.thumbNail = req.body.thumbNail || updatevideo.thumbNail,
            updatevideo.video = req.body.video || updatevideo.video
            const updatedvideo = await updatevideo.save();
            if(updatedvideo)
            return res.send(updatedvideo);
        }
        return res.status(401).send({message:"video not found"});
    } catch (error) {
        return res.send(error);
    }
})
//checked
router.delete('/:id',isAuth,async(req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        if(user)
        {
            const videoarray = user.videos;
            var f;
            for(var i=0;videoarray.length;i++)
            {
                if(videoarray[i]==req.params.id)
                {
                    f=i;
                    break;
                }
            }
            videoarray.splice(f,1);
            await user.save();
            const deletevideo = await Video.findById(req.params.id);
            const deletedvideo = await deletevideo.remove();
            return res.send(deletedvideo);
        }
        return res.status(401).send({message:"video owner not found"});
    } catch (error) {
        return res.send(error);
    }
})
//checked
router.post('/like/:id',isAuth,async(req,res)=>{
    try {
        const likevideo = await Video.findById(req.params.id);
        if(likevideo)
        {
            likevideo.likes = likevideo.likes+1;
            const likedvideo = await likevideo.save();
            return res.send(likedvideo);
        }
        return res.status(401).send("video not found")
    } catch (error) {
        return res.send(error);
    }
})
router.post('/view/:id',isAuth,async(req,res)=>{
    try {
        const viewvideo = await Video.findById(req.params.id);
        if(viewvideo)
        {
            viewvideo.views = viewvideo.views+1;
            const viewedvideo = await viewvideo.save();
            return res.send(viewedvideo);
        }
        return res.status(401).send("video not found")
    } catch (error) {
        return res.send(error);
    }
})
//checked
router.post('/comment/:id',isAuth,async(req,res)=>{
    try {
        const commentvideo = await Video.findById(req.params.id);
        if(commentvideo)
        {
            const Comments = commentvideo.comments;
            Comments.push({
                name:req.user.name,
                comment:req.body.comment
            }) 
            const commentedvideo = await commentvideo.save();
            return res.send(commentedvideo);
        }
        return res.status(401).send({message:"video not found"});
    } catch (error) {
        return res.send(error);
    }
})

export default router;
