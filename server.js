const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

// Middleware
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files from 'public' directory
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// GET route for '/'
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Sample GET route
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// POST route for Mad Lib form submission
server.post('/', (req, res) => {
  const { noun, verb, adjective, place, pluralNoun, name } = req.body;

  if (!noun || !verb || !adjective || !place || !pluralNoun || !name) {
    return res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out <strong>all fields</strong>.</p>
      <a href="/">Go Back</a>
    `);
  }

  const story = `
    <h1>Your Mad Lib Story</h1>
    <p>Once upon a time in a <strong>${adjective}</strong> land called <strong>${place}</strong>, 
    there lived a curious ${noun} named <strong>${name}</strong>. One day, ${name} decided to 
    ${verb} with a group of ${pluralNoun}. It turned out to be the most unforgettable adventure!</p>
    <a href="/">Try Again</a>
  `;

  res.send(story);
});

// Port setup
let port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
