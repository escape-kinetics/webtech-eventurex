// src/pages/CreateEvent.js
import React, { useState } from 'react';
import axios from 'axios';

function CreateEvent({ onEventCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    try {
      const newEvent = { name, description, date };
      const response = await axios.post('http://localhost:5000/events', newEvent);
      alert('Event created successfully');
      onEventCreated(response.data); // Pass new event data back to App.js
      // Reset form fields
      setName('');
      setDescription('');
      setDate('');
    } catch (error) {
      console.error('Error creating event:', error.response ? error.response.data : error.message);
      setErrorMessage('Failed to create event. Please try again.');
    }
  };

  return (
    <div className='container'>
      <h2>Create Event</h2>
      <form onSubmit={handleCreateEvent} style={styles.form}>
        <label>Event Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ ...styles.input, height: '100px' }}
        />
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={styles.input}
        />
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <button type="submit" style={styles.button}>Create Event</button>
      </form>
    </div>
  );
}

const styles = {
  
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
};

export default CreateEvent;