const express = require('express');
const noteRoutes = require('./notes');
const app = express();

app.use('/notes', noteRoutes);

module.exports = app;