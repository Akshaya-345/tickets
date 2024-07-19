import React, { useState, useEffect } from 'react';
import { FaBell, FaPhone, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = ({ username, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white relative">
      <h1 className="m-0 text-2xl font-bold">Tickets</h1>
      <div className="flex items-center">
        <FaBell className="ml-4 text-2xl cursor-pointer hover:text-gray-400" />
        <FaPhone className="ml-4 text-2xl cursor-pointer hover:text-gray-400" />
        <div className="ml-4 relative">
          <div className="flex items-center cursor-pointer hover:text-gray-400" onClick={toggleDropdown}>
            <FaUserCircle className="text-2xl" />
            <span className="ml-2 text-xl font-bold">{username}</span>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;