// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [userData, setUserData] = useState({});
  const [joinedEvents, setJoinedEvents] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:5000/user');
        const joinedResponse = await axios.get('http://localhost:5000/events/joined');
        setUserData(userResponse.data);
        setJoinedEvents(joinedResponse.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfileData();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <h2>Welcome, {userData.name}</h2>
      <p>Email: {userData.email}</p>

      <h2>Events You've Joined</h2>
      <ul>
        {joinedEvents.map((event) => (
          <li key={event._id}>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
