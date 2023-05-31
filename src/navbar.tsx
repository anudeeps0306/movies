import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setAuthInfo, removeAuthInfo } from '../redux/features/authSlice';
import { getDetails } from '@/api/authentication';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showOptions, setShowOptions] = useState(false); // State variable for showing/hiding options div

  useEffect(() => {
    const token = localStorage.getItem('token');
    const setInformation = async () => {
      if (token) {
        const item = token;
        const response = await getDetails(item);
        const required_responce = {
          email: response.user.email,
          password: response.user.password,
          name: response.user.name,
          profilePic: response.user.profilePic
        };
        dispatch(setAuthInfo(required_responce));
      }
    };
    setInformation();
  }, []);

  const authInfo = useAppSelector((state) => state.auth.authInfo);

  const handleClick = () => {
    setShowOptions(!showOptions); // Toggle the state variable on button click
  };

  const handleLogout = () => {
    dispatch(removeAuthInfo()); // Dispatch action to remove authInfo
    setShowOptions(false); // Hide the options div
  };

  return (
    <nav className="flex flex-row items-center bg-white h-28">
      <div className="flex flex-row justify-center p-4 w-1/5">
        <a className="flex items-center" href="#">
          MOVIE@NOW
        </a>
      </div>
      <div className="flex flex-row justify-center p-4 w-3/5">
        <ul className="flex flex-row gap-7">
          <li className="flex">
            <a href="#">Home</a>
          </li>
          <li className="flex">
            <a href="#">Movies</a>
          </li>
          <li className="flex">
            <a href="#">TV Shows</a>
          </li>
          <li className="flex">
            <a href="#">Your List</a>
          </li>
        </ul>
      </div>
      <div className="flex flex-row justify-center w-1/5 relative">
        <button className="group relative" onClick={handleClick}>
          <Image
            className="rounded-full w-12 h-12"
            src="/profile.jpeg"
            alt="avatar"
            width={40}
            height={40}
          />
        </button>
        {showOptions && ( // Display the options div if showOptions is true
          <div>
            {authInfo.email ? ( // Check if authInfo.email exists
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <button>Sign In</button>
                <button>Sign Up</button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
