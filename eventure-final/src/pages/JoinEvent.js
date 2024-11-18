// src/pages/JoinEvent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function JoinEvent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const joinEvent = async (eventId) => {
    try {
      await axios.post(`http://localhost:5000/events/join/${eventId}`);
      alert("You've successfully joined the event!");
    } catch (error) {
      console.error('Error joining event:', error);
    }
  };

  return (
    <div>
      <h1>Join an Event</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <button onClick={() => joinEvent(event._id)}>Join Event</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JoinEvent;
