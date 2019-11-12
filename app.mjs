import express from 'express'
import bodyParser from 'body-parser'
import user from './src/routes/user.mjs';
import books from './src/routes/books.mjs';

import config from './config.mjs';

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', user);
app.use('/books', books);

app.listen(config.port, function () {
    console.log(`conectado.  http://localhost:${config.port}`)
})
