const http = require('http');
const url = require('url');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Initialize dotenv to access environment variables
dotenv.config();

// MongoDB connection
let db;
MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db();
    console.log('MongoDB connected');
  })
  .catch(error => console.error('MongoDB connection error:', error));

// Create the HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Set default headers
  res.setHeader('Content-Type', 'application/json');

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (for development only)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // Allow specific methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

  // Handle different routes
  if (path === '/events' && method === 'GET') {
    // Handle retrieving events
    db.collection('events')
      .find()
      .toArray()
      .then(events => {
        res.writeHead(200);
        res.end(JSON.stringify({ events }));
      })
      .catch(err => {
        console.error('Error fetching events:', err);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Failed to fetch events' }));
      });
  } else if (path === '/events' && method === 'POST') {
    // Handle creating a new event
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const eventData = JSON.parse(body);
        
        // Optional: Validate incoming data
        if (!eventData.name || !eventData.description || !eventData.date) {
          res.writeHead(400);
          return res.end(JSON.stringify({ error: 'All fields are required.' }));
        }

        db.collection('events')
          .insertOne(eventData)
          .then(() => {
            res.writeHead(201);
            res.end(JSON.stringify({ message: 'Event created' }));
          })
          .catch(err => {
            console.error('Error creating event:', err); // Log the actual error
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Failed to create event' }));
          });
      } catch (err) {
        console.error('Error parsing JSON:', err);
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else if (path === '/login' && method === 'POST') {
    // Handle user login (you will need to implement this)
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

// Start the server
server.listen(5000, () => {
  console.log('Server running on port 5000');
});