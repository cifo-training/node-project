import http from 'http';
import app from './app.js';

http.createServer(app)
.listen(process.env.PORT);
console.log(`Example app listening on port ${process.env.PORT}! Go to http://localhost:${process.env.PORT}/`);