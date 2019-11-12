import Book from '../../models/books/books.mjs';

const saveBook = async (req, res) => {
    try {
        console.log(' saveBook');
        console.log(req.body);
        if (!req.body.title || !req.body.authors || !req.body.picture || !req.body.price
            || !req.body.category || !req.body.publishedDate || !req.body.description || !req.body.stock) {
            res.status(400).send({ error: { code: "VALIDATION_FAIL", http_code: 400, message: `Error validación de datos body` } })
        } else {
            let book = new Book();
            book.title = req.body.title;
            book.authors = req.body.authors;
            book.picture = req.body.picture;
            book.price = req.body.price;
            book.category = req.body.category;
            book.publishedDate = req.body.publishedDate;
            book.description = req.body.description;
            book.stock = req.body.stock;

            await book.save((err, bookStored) => {
                if (err) { return res.status(500).send({ error: { code: "WRONG_ARGS", http_code: 500, message: `Error validación de datos DB` } });}
                res.status(200).send({ book: bookStored });
            })
        }
    } catch (err) {

    }

}
export default saveBook