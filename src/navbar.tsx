import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthInfo, removeAuthInfo } from '../redux/features/authSlice';
import { getDetails } from '../api/authentication';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const setInformation = async () => {
      if (token) {
        const item = token;
        const response = await getDetails(item);
        const requiredResponse = {
          email: response.user.email,
          password: response.user.password,
          name: response.user.name,
          profilePic: response.user.profilePic
        };
        dispatch(setAuthInfo(requiredResponse));
      }
    };
    setInformation();
  }, [dispatch]);

  const authInfo = useSelector((state: RootState) => state.auth.authInfo);

  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  const handleLogout = () => {
    dispatch(removeAuthInfo());
    setShowOptions(false);
  };

  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 py-4 px-6">
      <div className="flex items-center">
        <img src="logo.png" alt="Logo" className="h-8 w-8" />
        <h1 className="text-white ml-2 text-lg font-semibold">MyApp</h1>
      </div>
      <div className="flex items-center justify-center gap-3">
        <a href="#" className="text-white hover:text-gray-200">
          Home
        </a>
        <a href="#" className="text-white hover:text-gray-200">
          About
        </a>
        <a href="#" className="text-white hover:text-gray-200">
          Contact
        </a>
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={toggleUserMenu}
          className="flex items-center focus:outline-none"
        >
          <img
            src={authInfo.profilePic}
            alt="Profile"
            className="h-8 w-8 rounded-full mr-2"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 12a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isUserMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-24 bg-white rounded-md shadow-lg">
            {authInfo.email !== '' ? (
              <div className="py-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="py-2">
                <Link href="/auth/signin">
                  <button
                    type="button"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Login in
                  </button>
                </Link>
                <Link href="/auth/signup">
                  <button
                    type="button"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sign up
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
