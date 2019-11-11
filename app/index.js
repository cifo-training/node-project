// 3RD PARTY MODULES
const express = require('express');
const bodyParser = require('body-parser');

// PROJECT MODULES
const config = require('./config/env-config.js');
const router = require('./routes/index.js');
const errorHandler = require('./middleware/error/index.js');

// APP SETUP
const app = express();
app.use(bodyParser.json());
app.use(router);
app.use(errorHandler);

// APP RUN
app.listen(config.PORT, _ => {
  
});
