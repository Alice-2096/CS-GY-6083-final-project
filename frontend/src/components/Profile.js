import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import FriendRequests from './FriendRequests';
import Posts from './Posts';
import Reviews from './Reviews';
import '../css/profile.css';
import Playlist from './Playlist';
import RatingSongs from './RatingSongs';
import Follow from './Follow';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [activeNavItem, setActiveNavItem] = useState('');

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  if (!currentUser) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Welcome Back, {currentUser.username} !</strong>
        </h3>
      </header>

      <nav className="nav-bar">
        <ul className="nav-item">
          <li onClick={() => handleNavItemClick('posts')} className="nav-link">
            New Posts
          </li>
          <li
            onClick={() => handleNavItemClick('reviews')}
            className="nav-link"
          >
            Review and Rate
          </li>
          <li
            onClick={() => handleNavItemClick('friends')}
            className="nav-link"
          >
            Manage Friend Requests
          </li>
          <li
            onClick={() => handleNavItemClick('follows')}
            className="nav-link"
          >
            Find People to Follow
          </li>
          <li
            onClick={() => handleNavItemClick('playlists')}
            className="nav-link"
          >
            Playlists
          </li>
        </ul>
      </nav>

      {activeNavItem === 'posts' && <Posts />}
      {activeNavItem === 'friends' && <FriendRequests />}
      {activeNavItem === 'follows' && <Follow />}
      {activeNavItem === 'reviews' && <Reviews />}
      {activeNavItem === 'reviews' && <RatingSongs />}
      {activeNavItem === 'playlists' && <Playlist />}
    </div>
  );
};

export default Profile;
