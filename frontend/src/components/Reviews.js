import React, { useState } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import AuthService from '../services/auth.service';
import '../css/Reviews.css';

const API_URL = 'http://localhost:3000/';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default function Reviews() {
  const [songTitle, setSongTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const currentUser = AuthService.getCurrentUser();
  const username = currentUser.username;
  const [success, setSuccess] = useState(false);

  const handleSongTitleChange = (event) => {
    setSongTitle(event.target.value);
  };

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const postReview = async (username, songTitle, reviewText) => {
    try {
      const response = await fetch(API_URL + 'reviewsong', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          songTitle,
          reviewText,
        }),
      });
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
        setSongTitle('');
        setReviewText('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //insert entry into db
    console.log(username, songTitle, reviewText);
    postReview(username, songTitle, reviewText);
  };

  return (
    <div className="review-rate-container">
      <div className="review-rate">
        <span>Create New Review</span>
        {success && (
          <div className="alert alert-success" role="alert">
            Review added successfully!
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <label htmlFor="songTitle">
            Song Title:
            <Input
              name="songTitle"
              placeholder="Enter song title here"
              validations={[required]}
              type="text"
              value={songTitle}
              onChange={handleSongTitleChange}
            />
          </label>
          <br />
          <label htmlFor="reviewText">
            Review:
            <Input
              name="reviewText"
              value={reviewText}
              placeholder="Enter review here"
              validations={[required]}
              type="text"
              onChange={handleReviewChange}
            />
          </label>
          <br />
          <button type="submit">Submit Review</button>
        </Form>
      </div>
    </div>
  );
}
