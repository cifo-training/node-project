import http from 'http';
import app from './app.js';

import dotenv from 'dotenv';

dotenv.config();


http.createServer(app)
.listen(process.env.PORT);
console.log(`App connectada al port ${process.env.PORT}! Anar a  http://localhost:${process.env.PORT}/`);
  