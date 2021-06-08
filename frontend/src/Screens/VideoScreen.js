import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector, useDispatch } from 'react-redux';
import {useState,useEffect} from 'react';
import { videoDetails,likeVideo,commentVideo,viewVideo } from '../Actions/videoActions';
import LoadingBox from '../Components/LoadingBox';

function VideoScreen(props) {
console.log(props.match.params.id);
const [comment, setComment] = useState('');
const userSignin = useSelector((state) => state.userSignin);
const { userInfo } = userSignin;
const videoDetail = useSelector((state) => state.videoDetail);
const { video, loading, error } = videoDetail;
console.log(video,loading,error);
const videoLike = useSelector((state) => state.videoLike);
const { likesuccess, loading:likeloading, likeerror } = videoLike;
const videoComment = useSelector((state) => state.videoComment);
const { commentsuccess, loading:commentloading, commenterror } = videoComment;



console.log(video);
const dispatch = useDispatch();

function likeHandler(videoId){
 console.log("like");
 if(userInfo)
 dispatch(likeVideo(videoId));
 else
 alert("please sign in to like the video");
};

function commentHandler(videoId,comment){
 console.log("comment")
 if(userInfo)
 {
 dispatch(commentVideo(videoId,comment));
 setComment('');
 }
 else
 alert("please sign in to comment");
};


useEffect(() => {
    console.log("hello");
    dispatch(videoDetails(props.match.params.id));
    // dispatch(viewVideo(props.match.params.id));
},[likeloading,commentloading]);

function getIST(dateStr) {
    var theDate = new Date(Date.parse(
      dateStr));

      var IST = theDate.toLocaleString();
      return IST;
    
  }

    return (
        <div>
            {loading?
            (<LoadingBox></LoadingBox>):error?(
                <div>{error}</div>
            ):(
                <>
                <div className="video-page">
                    {video&&<div><video src={video.video} width="70%" height="70%" controls className="video"></video>
                    <div className="v-name">
                     {video.title}
                   </div>
                    <div className="v-owner">{video.ownerName}</div>
                    <div className="v-description">Description: {video.description}</div>
                    <div className = "parent">
                        <div>{video.views} views</div>&nbsp;&nbsp;&nbsp;&nbsp;
                        <div>{getIST(video.createdAt).substring(0, 8)}</div>&nbsp;&nbsp;
                        <i className = "fa fa-thumbs-up" onClick={()=>likeHandler(video._id)}>&nbsp;{video.likes}</i>
                        {/* <button className = "like button" onClick={()=>likeHandler(video._id)}>like</button> */}
                    </div>
                    <div className="god">
                     <div className="god-child">
                         <textarea
                        className = "v-comment"
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>&nbsp;
                    </div>
                    <div className="god-child">
                    <button  onClick = {()=>commentHandler(video._id,comment)} className="button comment-b">
                        <i className="god">comment</i>
                    </button>
                    </div>
                    </div>
                      <h2>Comments</h2>
                        {!video.comments.length && <div>There is no comment</div>}
                        <ul className="review" id="reviews">
                        {video.comments.map((comment) => (
                            <li key={comment._id}>
                            <div className="v-comments">{comment.name}</div>
                            <div className="v-date">{comment.createdAt.substring(0, 10)}</div>
                            <div>{comment.comment}</div>
                            </li>
                        ))} 
                        </ul>
                        </div>}
                        </div>
                        </>
                    )

            }

        </div>
    )
}

export default VideoScreen
