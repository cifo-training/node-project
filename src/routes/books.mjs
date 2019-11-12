

import MongoManager from '../../MongoManager.mjs';
import config from '../../config.mjs';
import Router from 'express';

import getBooks from '../controlers/books/getBooks.mjs'
import getBook from '../controlers/books/getBook.mjs'
import saveBook from '../controlers/books/saveBook.mjs'
import updateBook from '../controlers/books/updateBook.mjs'
import deleteBook from '../controlers/books/deleteBook.mjs'

import auth from '../middleware/auth.mjs'

const mongo = new MongoManager(config);
const router = Router()
mongo.connect();

router.get('/books',auth, getBooks)
router.get('/book/:bookId',auth, getBook)
router.post('/book',auth, saveBook)
router.put('/book/:bookId',auth, updateBook)
router.delete('/book/:bookId',auth, deleteBook)

export default router;