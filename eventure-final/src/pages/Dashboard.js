// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const joinedResponse = await axios.get('http://localhost:5000/events/joined');
        const createdResponse = await axios.get('http://localhost:5000/events/created');
        setJoinedEvents(joinedResponse.data);
        setCreatedEvents(createdResponse.data);
      } catch (error) {
        console.error('Error fetching user events:', error);
      }
    };
    fetchUserEvents();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Joined Events</h2>
      <ul>
        {joinedEvents.map((event) => (
          <li key={event._id}>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>

      <h2>Created Events</h2>
      <ul>
        {createdEvents.map((event) => (
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

export default Dashboard;
