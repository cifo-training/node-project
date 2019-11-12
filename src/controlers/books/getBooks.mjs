
import Book from '../../models/books/books.mjs'

const getBooks = async (req, res) => {
    try {
        console.log("get");
        await Book.find({}, (err, books) => {
            if (err) {return res.status(500).send({ error: { code: "VALIDATION_FAIL", http_code: 500, message: `Error validación de datos ` } });}
            if (books.length === 0) return res.status(500).send({ error: { code: "NO_DATA", http_code: 500, message: `No existen libros` } })
            res.status(200).send({ books })
        })
    } catch (err) {

    }
}

export default getBooks
