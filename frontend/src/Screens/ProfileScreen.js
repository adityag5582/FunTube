import React from 'react';
import {userVideosList} from '../Actions/userActions';
import {useSelector,useDispatch} from 'react-redux';
import { Link, Route } from 'react-router-dom';
import {useState,useEffect} from 'react';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';


function ProfileScreen() {
    const userVideos = useSelector((state) => state.userVideos);
    const { videos, loading, error } = userVideos;
    console.log(videos);
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    console.log(userInfo);
    function getIST(dateStr) {
        var theDate = new Date(Date.parse(
          dateStr));
    
          var IST = theDate.toLocaleString();
          return IST;
        
      }
    useEffect(() => {
        dispatch(userVideosList());
    }, [])
    return (
        <div>
           <div className="info">
               <div>
                  <img src={userInfo.image} alt="profile" width="180px" height="180px" className="profile-pic"></img>
               </div>
               <div className="basic-info">
                 <ul>
                   <li>{userInfo.name}</li>
                   <li>{userInfo.email}</li>
                   <li>Joined : {getIST(userInfo.createdAt).substring(0,8)}</li>
                 </ul>
               </div>
            </div> 
            <div className="profile-heading">My Videos</div>
            {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <ul className="videos">
          {videos.map((video) => (
            <li key={video._id}>
              <div className="video">
                <Link to={'/video/' + video._id}>
                  <img
                    className="video-image"
                    src={video.thumbNail}
                    alt="video"
                  />
                </Link>
                <div className="video-name">
                  <Link to={'/video/' + video._id}>{video.title}</Link>
                </div>
                <div className="video-owner">{video.ownerName}</div>
                <div className="view-date">
                    <div className="video-brands">{video.views} views</div>
                    <div className="video-brands">{getIST(video.createdAt).substring(0, 8)}</div>
                  </div>
              </div>
            </li>
          ))}
        </ul>
      )}
        </div>
    )
}

export default ProfileScreen
