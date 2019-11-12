import Book from '../../models/books/books.mjs';

const getBook = async (req, res) => {
     try {
    console.log("getBook", req.params.bookId);
        let bookId = req.params.bookId
        await Book.findById(bookId, (err, book) => {
            if (err){ return res.status(500).send({ error: { code: "VALIDATION_FAIL", http_code: 500, message: `Error validación de datos ` } });}
            if (book.length===0){ return res.status(500).send({ error: { code: "NO_DATA", http_code: 500, message: `No existen libros` } });}
            res.status(200).send({ book });
        })
    }catch(err){
        
    }
}

export default getBook;