import './env.mjs';

const port = process.env.Port || 3001;

import https from 'https';
import fs from 'fs';
import app from './app.mjs';

https.createServer ({
	key: fs.readFileSync ('.config/server.key'),
	cert: fs.readFileSync ('.config/server.cert')
}, app)
.listen (port, _=> {
	console.log (`Listening on https://localhost:${port}`);
})
