import Cookie from 'js-cookie';
import { USER_FLAG_CHANGE, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_UPLOAD_FAIL, USER_UPLOAD_REQUEST, USER_UPLOAD_SUCCESS, USER_VIDEOS_FAIL, USER_VIDEOS_REQUEST, USER_VIDEOS_SUCCESS, USER_VIDEO_UPLOAD_SUCCESS } from '../Constants/userConstants';

function userSigninReducer(state = {}, action) {
    switch (action.type) {
      case USER_SIGNIN_REQUEST:
        return { loading: true };
      case USER_SIGNIN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_SIGNIN_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {};
      default: return state;
    }
  }

function userRegisterReducer (state = {flag:false},action)
{
    switch (action.type){
        case USER_REGISTER_REQUEST:
            return {loading:true};
        case USER_REGISTER_SUCCESS:
            return {loading:false,flag:action.payload};
        case USER_REGISTER_FAIL:
            return {loading:false,error:action.payload};
        case USER_FLAG_CHANGE:
            return {loading:false, flag:action.payload}
        default:
            return state;
    }
}

function userVideosReducer (state = {videos:[]},action)
{
    switch(action.type){
        case USER_VIDEOS_REQUEST:
            return {loading:true};
        case USER_VIDEOS_SUCCESS:
            return {loading:false,videos:action.payload};
        case USER_VIDEOS_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
}

function userUploadReducer (state = {},action)
{
    switch(action.type){
        case USER_UPLOAD_REQUEST:
            return {loading:true};
        case USER_UPLOAD_SUCCESS:
            return {loading:false,success:true,video:action.payload};
        case USER_UPLOAD_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
}



export {userSigninReducer,userRegisterReducer,userVideosReducer,userUploadReducer}