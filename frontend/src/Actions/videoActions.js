import axios from 'axios';
import Cookie from 'js-cookie';
import { COMMENT_VIDEO_FAIL, COMMENT_VIDEO_REQUEST, COMMENT_VIDEO_SUCCESS, LIKE_VIDEO_FAIL, LIKE_VIDEO_REQUEST, LIKE_VIDEO_SUCCESS, VIDEO_DELETE_FAIL, VIDEO_DELETE_REQUEST, VIDEO_DELETE_SUCCESS, VIDEO_DETAILS_FAIL, VIDEO_DETAILS_REQUEST, VIDEO_DETAILS_SUCCESS, VIDEO_LIST_FAIL, VIDEO_LIST_REQUEST, VIDEO_LIST_SUCCESS, VIEWS_VIDEO_FAIL, VIEWS_VIDEO_REQUEST, VIEWS_VIDEO_SUCCESS } from '../Constants/videoConstants';

const listVideos = () => async (dispatch) => {
    dispatch({ type: VIDEO_LIST_REQUEST });
    try {
      const { data } = await axios.get("/api/videos/");
      dispatch({ type: VIDEO_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: VIDEO_LIST_FAIL, payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, });
    }
}

const videoDetails = (videoId) => async (dispatch) => {
    try {
      dispatch({ type: VIDEO_DETAILS_REQUEST });
      const { data } = await axios.get('/api/videos/' +videoId);
      dispatch({ type: VIDEO_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: VIDEO_DETAILS_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message, });
    }
  };

  const deleteVideo = (videoId) => async (dispatch, getState) => {
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      dispatch({ type: VIDEO_DELETE_REQUEST, payload: videoId });
      const { data } = await axios.delete('/api/videos/' + videoId, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: VIDEO_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
      dispatch({ type: VIDEO_DELETE_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message, });
    }
  };

  const likeVideo = (videoId) => async (dispatch, getState) => {
      console.log(videoId);
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      dispatch({ type: LIKE_VIDEO_REQUEST, payload: videoId });
      const { data } = await axios.post('/api/videos/like/' + videoId,{videoId}, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: LIKE_VIDEO_SUCCESS, payload: data, success: true });
    } catch (error) {
      dispatch({ type: LIKE_VIDEO_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message, });
    }
  };

  const viewVideo = (videoId) => async (dispatch, getState) => {
    console.log(videoId);
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: VIEWS_VIDEO_REQUEST, payload: videoId });
    const { data } = await axios.post('/api/videos/view/' + videoId,{videoId}, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: VIEWS_VIDEO_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: VIEWS_VIDEO_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message, });
  }
};

  const commentVideo = (videoId,comment) => async (dispatch, getState) => {
    console.log(videoId);
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      dispatch({ type: COMMENT_VIDEO_REQUEST, payload: videoId });
      const { data } = await axios.post('/api/videos/comment/' + videoId,{comment}, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: COMMENT_VIDEO_SUCCESS, payload: data, success: true });
    } catch (error) {
      dispatch({ type: COMMENT_VIDEO_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message, });
    }
  };



  


export {listVideos,videoDetails,deleteVideo,likeVideo,commentVideo,viewVideo};