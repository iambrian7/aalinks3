module.exports = (app) => {
  const meetings = require('../controllers/meeting.controller.js');

  // Create a new Note
  app.post('/meetings', meetings.create);

  // Retrieve all meetings
  app.get('/meetings', meetings.findAll);

  // Retrieve a single Note with noteId
  app.get('/meetings/:noteId', meetings.findOne);

  // Update a Note with noteId
  app.put('/meetings/:noteId', meetings.update);

  // Delete a Note with noteId
  app.delete('/meetings/:noteId', meetings.delete);
}