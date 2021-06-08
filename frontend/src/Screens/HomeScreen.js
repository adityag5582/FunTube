import React, { useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listVideos } from '../Actions/videoActions';
import '../index.css'
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';

function HomeScreen(props) {
  const videoList = useSelector((state) => state.videoList);
  const { videos, loading, error } = videoList;
  console.log(videos);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(listVideos());
  }, [])

  function getIST(dateStr) {
    var theDate = new Date(Date.parse(
      dateStr));

      var IST = theDate.toLocaleString();
      return IST;
    
  }

  return (
      <>
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
                <div className = "video-detail">
                  <div className="video-name">
                    <Link to={'/videos/' + video._id}>{video.title}</Link>
                  </div>
                  <div className="video-owner">{video.ownerName}</div>
                  <div className="view-date">
                    <div className="video-brands">{video.views} views</div>
                    <div className="video-brands">{getIST(video.createdAt).substring(0, 8)}</div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default HomeScreen;
