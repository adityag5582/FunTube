import axios from 'axios';
import Cookie from 'js-cookie';
import { USER_FLAG_CHANGE, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_UPLOAD_FAIL, USER_UPLOAD_REQUEST, USER_UPLOAD_SUCCESS, USER_VIDEOS_FAIL, USER_VIDEOS_REQUEST, USER_VIDEOS_SUCCESS } from '../Constants/userConstants';

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST});
    try {
      const { data } = await axios.post("/api/users/signin", { email, password});
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_SIGNIN_FAIL, payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, });
    }
}

const register = (name,email,image,password) => async(dispatch)=>{
    dispatch({type:USER_REGISTER_REQUEST});
    try {
      console.log("hello");
        const {data} = await axios.post('/api/users/register',{name,email,image,password});
        console.log("hello success");
        dispatch({type:USER_REGISTER_SUCCESS,payload:true});
    } catch (error) {
        dispatch({type:USER_REGISTER_FAIL,payload:error});
    }
}

const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT });
  }

const flagchange = () => async(dispatch) => {
dispatch({ type: USER_FLAG_CHANGE, payload:false});
}
const userVideosList = () => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_VIDEOS_REQUEST });
      const { userSignin: { userInfo } } = getState();
      const { data } = await axios.get("/api/users/myvideos", {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: USER_VIDEOS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: USER_VIDEOS_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message, });
    }
}

const userVideoUpload = (video) => async (dispatch, getState) => {
    console.log("hello");
    try {
      dispatch({ type: USER_UPLOAD_REQUEST, payload: video });
      const {
        userSignin: { userInfo },
      } = getState();
      if (!video._id) {
        const { data } = await axios.post('/api/users/uploadvideo', video, {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        });
        dispatch({ type: USER_UPLOAD_SUCCESS, payload: data });
      } else {
        const { data } = await axios.put(
          '/api/videos/' + video._id,
          video,
          {
            headers: {
              Authorization: 'Bearer ' + userInfo.token,
            },
          }
        );
        dispatch({ type: USER_UPLOAD_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({ type: USER_UPLOAD_FAIL,payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message, });
    }
  };


  

export {signin,register,logout,flagchange,userVideosList,userVideoUpload}