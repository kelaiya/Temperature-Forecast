const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
module.exports = app;

// Static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))


// Logging middleware
app.use(morgan('dev'));
  
// Sends index.html
app.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// Error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
});

// Start listening 
app.listen(8080, () => console.log('Mixing it up on port 8080'))

