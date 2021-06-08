import React, { useEffect, useState } from 'react';
import '../index.css';
import "react-alice-carousel/lib/alice-carousel.css";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {register,flagchange} from '../Actions/userActions';
import MessageBox from '../Components/MessageBox';
import LoadingBox from '../Components/LoadingBox';
import axios from 'axios';


function RegisterScreen(props){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState(false);
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, flag, error } = userRegister;

    // const redirect = props.location.search
    // ? props.location.search.split('=')[1]
    // : '/';

    const dispatch = useDispatch();
    
    useEffect(() => {
        if (flag) {
            dispatch(flagchange());
            props.history.push("/signin");
        }
      }, [flag]);

    // //console.log(User);
    // //console.log("hello");
    
    const showPassword = (x) => {

        var x = document.getElementById("password");
        if (x.type === "password") {
        x.type = "text";
        } else {
        x.type = "password";
    }
        
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (password !== rePassword) {
          alert('Password and confirm password are not match');
        } else{
          dispatch(register(name, email,image, password));
        }
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
            setImage(response.data);
            setUploading(false);
          })
          .catch((err) => {
            //console.log(err);
            setUploading(false);
          });
      };


    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className = "form-container">
                <li>
                    <h2> Create New Fun Tube Account</h2>
                    </li>
                    <li>
                    {loading && <LoadingBox ></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                    </li>

                    <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="name" name="name" id="name" required onChange={(e) => setName(e.target.value)}></input>
                    </li>
                    <li>
                    <label htmlFor="image">image</label>
                    <input
                    type="text"
                    name="image"
                    value={image}
                    id="image"
                    onChange={(e) => setImage(e.target.value)}
                    ></input>
                    <input type="file" onChange={uploadFileHandler1}></input>
                    {uploading && <div>Uploading...</div>}
                    </li>
                    <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)}></input>
                    </li>


                <li>
                <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}></input>
                    <p>Show Password <input type="checkbox" className="checkbox" onClick={() => showPassword()}/></p>
                </li>



                <li>
                <label htmlFor="rePassword">Confirm Password</label>
                    <input type="Password" id="rePassword" name="rePassword" required onChange={(e) => setRePassword(e.target.value)}></input>
                </li>


                <li>
                    <button type="submit" className="button primary">Register</button>
                </li>
                
                <li>
                    Already have an account? <Link to= "/signin"  >Sign-In</Link>
                </li>


            </ul>

        </form>
    </div>
}


export default RegisterScreen;