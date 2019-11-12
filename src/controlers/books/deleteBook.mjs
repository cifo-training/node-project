import Book from '../../models/books/books.mjs'

const deleteBook = async (req, res) => {
    try {
        console.log(' deleteBook',req.params.bookId);
        let bookId = req.params.bookId;
        if (!req.params.bookId) {
            return res.status(400).send({ error: { code: "VALIDATION_FAIL", http_code: 400, message: `Error validación de datos params` } });
        } else {
            await Book.findById(bookId, (err, book) => {
                 if (err===null || err) { return res.status(400).send({ error: { code: "VALIDATION_FAIL", http_code: 400, message: `Error validación de datos Id` } }); }
                book.remove(err => {
                     if (err) { return res.status(500).send({ error: { code: "WRONG_ARGS", http_code: 500, message: `Error validación de datos DB` } }); }
                    res.status(200).send({ message: 'el libro ha sido eliminado' });
                })
            })
        }
    } catch (err) {

    }
}

export default deleteBook