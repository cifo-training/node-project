import Book from '../../models/books/books.mjs'

const updateBook = async (req, res) => {
    try {
        console.log("updateBook");
        console.log(req.body);
        if (!req.params.bookId) {
            res.status(400).send({ error: { code: "VALIDATION_FAIL", http_code: 400, message: `Error validación de datos params` } });
        } else {
            let bookId = req.params.bookId;
            let update = req.body;
            await Book.findByIdAndUpdate(bookId, update, (err, bookUpdated) => {
                if (err) { return res.status(500).send({ error: { code: "WRONG_ARGS", http_code: 500, message: `Error validación de datos DB` } }); }
                res.status(200).send({ book: bookUpdated });
            })
        }
    } catch (err) {

    }
}

export default updateBook;