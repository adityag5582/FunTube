import React from 'react'
import {useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import axios from 'axios';
import {userVideosList, userVideoUpload} from '../Actions/userActions';
import { deleteVideo } from '../Actions/videoActions';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';

function VideoUploadScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbNail, setThumbNail] = useState('');
    const [video, setVideo] = useState('');
    const [uploading, setUploading] = useState(false);
    const userVideos = useSelector((state) => state.userVideos);
    const { loading, videos, error } = userVideos;

    function getIST(dateStr) {
        var theDate = new Date(Date.parse(
          dateStr));
    
          var IST = theDate.toLocaleString();
          return IST;
        
      }

    const userUpload = useSelector((state) => state.userUpload);
    const {
      loading: loadingSave,
      success: successSave,
      error: errorSave,
    } = userUpload;

    const videoDelete = useSelector((state) => state.videoDelete);
    const {
      success: successDelete,
    } = videoDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
          setModalVisible(false);
        }
        dispatch(userVideosList());
        console.log("hello");
        return () => {
          //
        };
      }, [successSave, successDelete]);
    
      const openModal = (video) => {
        setModalVisible(true);
        setId(video._id);
        setTitle(video.title);
        setDescription(video.description);
        setThumbNail(video.thumbNail);
        setVideo(video.video);
      };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
          userVideoUpload({
            _id: id,
            title,
            description,
            thumbNail,
            video,
          })
        );
      };
      const deleteHandler = (video) => {
        dispatch(deleteVideo(video._id));
      };
      const uploadFileHandler1 = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setUploading(true);
        axios
          .post('/api/uploads/s3', bodyFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            setThumbNail(response.data);
            setUploading(false);
          })
          .catch((err) => {
            //console.log(err);
            setUploading(false);
          });
      };
      const uploadFileHandler2 = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setUploading(true);
        axios
          .post('/api/uploads/s3', bodyFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            setVideo(response.data);
            setUploading(false);
          })
          .catch((err) => {
            //console.log(err);
            setUploading(false);
          });
      };

    return (
        <div>
        <div className="video-header">
        <h3>My Videos</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Upload Video
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create video</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="title">title</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="thumbNail">thumbNail</label>
                <input
                  type="text"
                  name="image"
                  value={thumbNail}
                  id="image"
                  onChange={(e) => setThumbNail(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler1}></input>
                {uploading && <div>Uploading...</div>}
              </li>
              <li>
                <label htmlFor="video">video</label>
                <input
                  type="text"
                  name="image"
                  value={video}
                  id="image"
                  onChange={(e) => setVideo(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler2}></input>
                {uploading && <div>Uploading...</div>}
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
          </div>
      )}

          <div className="video-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>title</th>
              <th>createdAt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading?
            (<LoadingBox></LoadingBox>):error?
            ( <MessageBox variant="danger">{error}</MessageBox>):
            (
            <>
                {videos.map((video) => (
                    <tr key={video._id}>
                      <td>{video._id}</td>
                      <td>{video.title}</td>
                      <td>{getIST(video.createdAt).substring(0,8)}</td>
                      <td>
                        <button className="button" onClick={() => openModal(video)}>
                          Edit
                        </button>{' '}
                        <button
                          className="button"
                          onClick={() => deleteHandler(video)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
             )}
          </tbody>
        </table>
      </div>
    </div>
    )
}

export default VideoUploadScreen
