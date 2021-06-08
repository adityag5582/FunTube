import Cookie from 'js-cookie';
import { COMMENT_VIDEO_FAIL, COMMENT_VIDEO_REQUEST, COMMENT_VIDEO_SUCCESS, LIKE_VIDEO_FAIL, LIKE_VIDEO_REQUEST, LIKE_VIDEO_SUCCESS, VIDEO_DELETE_FAIL, VIDEO_DELETE_REQUEST, VIDEO_DELETE_SUCCESS, VIDEO_DETAILS_FAIL, VIDEO_DETAILS_REQUEST, VIDEO_DETAILS_SUCCESS, VIDEO_LIST_FAIL, VIDEO_LIST_REQUEST, VIDEO_LIST_SUCCESS, VIEWS_VIDEO_FAIL, VIEWS_VIDEO_REQUEST, VIEWS_VIDEO_SUCCESS } from '../Constants/videoConstants';

function videoListReducer(state = {videos:[]}, action) {
    switch (action.type) {
      case VIDEO_LIST_REQUEST:
        return { loading: true };
      case VIDEO_LIST_SUCCESS:
        return { loading: false, videos: action.payload };
      case VIDEO_LIST_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

function videoDetailReducer(state = {}, action) {
switch (action.type) {
    case VIDEO_DETAILS_REQUEST:
    return { loading: true };
    case VIDEO_DETAILS_SUCCESS:
    return { loading: false, video: action.payload };
    case VIDEO_DETAILS_FAIL:
    return { loading: false, error: action.payload };
    default: return state;
}
}

function videoDeleteReducer(state = { product: {} }, action) {
    switch (action.type) {
      case VIDEO_DELETE_REQUEST:
        return { loading: true };
      case VIDEO_DELETE_SUCCESS:
        return { loading: false, product: action.payload, success: true };
      case VIDEO_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
}

function videoLikeReducer(state = { product: {} }, action) {
    switch (action.type) {
      case LIKE_VIDEO_REQUEST:
        return { loading: true };
      case LIKE_VIDEO_SUCCESS:
        return { loading: false, product: action.payload, success: true };
      case LIKE_VIDEO_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  function videoViewReducer(state = { product: {} }, action) {
    switch (action.type) {
      case VIEWS_VIDEO_REQUEST:
        return { loading: true };
      case VIEWS_VIDEO_SUCCESS:
        return { loading: false, product: action.payload, success: true };
      case VIEWS_VIDEO_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  function videoCommentReducer(state = { product: {} }, action) {
    switch (action.type) {
      case COMMENT_VIDEO_REQUEST:
        return { loading: true };
      case COMMENT_VIDEO_SUCCESS:
        return { loading: false, product: action.payload, success: true };
      case COMMENT_VIDEO_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }


  


export {videoListReducer,videoDetailReducer,videoDeleteReducer,videoLikeReducer,videoCommentReducer,videoViewReducer}