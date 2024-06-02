const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const reportsPath = path.join(__dirname, 'Reports');

// Endpoint to get the list of files in the Reports directory
app.get('/get_reports_list', (req, res) => {
  fs.readdir(reportsPath, (err, files) => {
    if (err) {
      res.status(500).json({ error: 'Error reading directory' });
    } else {
      res.json(files);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});