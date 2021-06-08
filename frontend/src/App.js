import './App.css';
import './index.css';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import SignInScreen from './Screens/SignInScreen';
import VideoScreen from './Screens/VideoScreen';
import VideoUploadScreen from './Screens/VideoUploadScreen';
import RegisterScreen from './Screens/RegisterScreen';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {useState,useEffect} from 'react';
import {logout} from './Actions/userActions';

function App() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const handleLogout = () => {
    dispatch(logout());
  }
  return ( 
    <BrowserRouter>
        <div className="grid-container">
            <header className = "header">
              <div className="logo">
                  <Link to="/"><img src="https://skilltubebucket.s3.ap-south-1.amazonaws.com/FUNTUBE+(2).png" alt="AtranZ" font-color="white" height="120" width="auto" /></Link>
              </div>
              <div className="header-links">
                  {userInfo ? (
                    <div className="dropdown">
                        <Link to="/profile">
                          {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                        </Link>
                        <ul className="dropdown-content">
                          <li>
                            <Link to="/profile">My Profile</Link>
                          </li>

                          <li>
                            <Link to="/upload">Video Actions</Link>
                          </li>

                          <li>
                            <Link to="/" onClick={handleLogout} >Logout</Link>
                          </li>

                        </ul>
                    </div>
                           )  : (
                    <div className = "dropdown">
                      <Link to="/signin">Sign In</Link>
                    </div>
                  )}
              </div>
            </header>
            <main className = "main">
              <Route path="/" exact={true} component={HomeScreen} />
              <Route path="/profile"  component={ProfileScreen} />
              <Route path="/signin"  component={SignInScreen} />
              <Route path="/video/:id"  component={VideoScreen} />
              <Route path="/upload"  component={VideoUploadScreen} />
              <Route path="/register" component={RegisterScreen}/>
            </main>
            <footer className = "footer">

            </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
