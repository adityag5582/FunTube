import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { userRegisterReducer, userSigninReducer, userUploadReducer, userVideosReducer } from './Reducers/userReducers';
import { videoCommentReducer, videoDeleteReducer, videoDetailReducer, videoLikeReducer, videoListReducer, videoViewReducer } from './Reducers/videoReducers';

const userInfo = Cookie.getJSON('userInfo') || null;
const initialState = {
  userSignin: { userInfo },
};

const reducer = combineReducers({
  userSignin:userSigninReducer,
  userRegister:userRegisterReducer,
  videoList:videoListReducer,
  videoDetail:videoDetailReducer,
  userVideos:userVideosReducer,
  userUpload:userUploadReducer,
  videoDelete:videoDeleteReducer,
  videoLike:videoLikeReducer,
  videoComment:videoCommentReducer,
  videoView:videoViewReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;