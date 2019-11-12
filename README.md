mongoimport --db  libreria --collection  books --file /home/francisco/Documentos/proyecto/proyecto-node2/boojs.json --jsonArray
 
 
 ## CONSULTAS

| Entidad | Acción | Descripción |
|--------|--------|-------------|
|User | Register | El usuario se registra desde la aplicación cliente |
|User | Login | El usuario se autentica desde la aplicación cliente |
|Book | Get Books | El usuario, autenticado, accede a una lista completa de libros |
|Book | Get Book | El usuario, autenticado, obtiene un libro |
|Book | Save Book | El usuario, autenticado, crea un libro |
|Book | Update Book | El usuario, autenticado, actualiza un libro |
|Book | Delete Book | El usuario, autenticado, elimina un libro |


 ## USER
 
 ### REGISTRO
 
__Registrar un usuario:__

    Método: POST
    uri: /user/register
    body parameters:
        name
            string (required) Example: Pepe
            Un nombre válido
        password
            string (required) Example: mypassword
            Una contraseña válida
        password2
            string (required) Example: mypassword
            Una contraseña válida

__Respuestas:__

    200 - Header: Content-Type: application/json
        Body: {
            "data": 
            {
                "token":"eyJXXXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9eyJpc3MiOiJodHRwOi8vYXBpLm1lbnNhZgghLmRldi92MS9sb2biIsmdCI6Q2NDM1NDY5OSwiZXhwIjoxNDY0MzU4Mjk5LCJumYisfE0NjQzNTQ2OTksImp0aSI6IjIyNDg4YxM2RkNzlODZjNhZWZhZjNhMDBkMjIiwic3ViIjoxNH0F3q4ckNbI8sMg9RX_iSyrEmGWW3oyO8dMcasKl5xe,
                "expires_in": 86400,
                "expires_at": 1573487590,
            }
        }

    400 - Header: Content-Type: application/json
        Body: {
           "error": {
                "code": "VALIDATION_FAIL",
                "http_code": 400,
                "message": "Error validación de datos params"
                 }
           } 
                    
    500 - Header: Content-Type: application/json
        Body: {
           "error": {
                "code": "WRONG_ARGS",
                "http_code": 500,
                "message": "Error validación de datos DB"
                }
           } 


### LOGIN 

__Login un usuario:__

    Método: POST
    uri: /user/login
    body parameters:
        name
            string (required) Example: Pepe
            Un name válido
        password
            string (required) Example: mypassword
            Una contraseña válida
       
__Respuestas:__

    200 - Header: Content-Type: application/json
        Body: {
            "data": {
                "token":"eyJXXXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9     eyJpc3MiOiJodHRwOi8vYXBpLm1lbnNhZgghLmRldi92MS9sb2dpbiImlhdCI6MTQ2NDM1NDY5OSwiZXhwIjoxNDY0MzU4Mjk5CJuYmYsfE0  N jQzNTQ2OTksImp0aSI6IjIyNDg4Y2IxM2RkZlODZjM2NhZWZhZjNhMDBkMjkzIiwic3ViIjoxNH0     F3q4ckNbI8sMg9RX_iRSyrEmGWW3oyO8dMcasKl5xer",
                "expires_in": 86400,
                "expires_at": 1573487590,
            }
        }

    400 - Header: Content-Type: application/json
        Body:{
            "error": {
                "code": "VALIDATION_FAIL",
                "http_code": 400,
                "message": "Error validación de datos params"
            }
        }

    500 - Header: Content-Type: application/json
        Body:{
            "error": {
                "code": "WRONG_ARGS",
                "http_code": 500,
                "message": "Error validación de datos password/name"
            }
        }


## BOOKS

### Get Books

__El usuario, autenticado, accede a una lista completa de libros:__

    Método: GET
    uri: /books/books
    headers parameters:
        Content-Type:
            application/json
        authorization: 
            bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM4MmZkMDcwODMyMDI3OGMyM2RkYzYiLCJpYXQiOjE1NzM0MDA2NjgsImV4I6MTU3MzQ4NzA2OH0.oCBpBUEXcRkcBjjMovu_r0CPMhql9zHGbqi-1M2Ah4g

__Respuestas:__
 
    200 - Header: Content-Type: application/json
        Body: 
        {
            "books":
                 [
                  {...},
                  {...},
                  {...},
                  {...}
                 ]
        }

    500 - Header: Content-Type: application/json
        Body:{
            "error": {
                "code": "NO_DATA",
                "http_code": 500,
                "message": "No existen libros"
            }
        }


### Get Book

__El usuario, autenticado, obtiene un libro con la id:__

    Método: GET
    uri: /books/book/:bookId
    params parameters:
        :bookId
            Un número de id valido
    headers parameters:
        Content-Type: 
            application/json
        authorization:  
            bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM4MmZkMDcwODMyMDI3OGMyM2RkYzYiLCJpYXQiOjE1NzM0MDA2NjgsImV4I6MTU3MzQ4NzA2OH0.oCBpBUEXcRkcBjjMovu_r0CPMhql9zHGbqi-1M2Ah4g

__Respuestas:__

    200 - Header: Content-Type: application/json
        Body: {
            "book": {
                "authors": [
                    "Basarat Syed"
                ],
                "price": 47.78,
                "category": [],
                "stock": 32,
                "_id": "5dc84b7f134a2cc7c00ce205",
                "title": "Beginning Node.js",
                "picture": "Beginning Node-js.jpeg",
                "description": "Beginning Node.js is your step-by-step guide to learning all the aspects of ...",
                "publishedDate": "2014-12-02",
                "categories": [
                    "nodejs"
                ]
            }
        }

    400 - Header: Content-Type: application/json
        Body:{
            "error": {
                "code": "VALIDATION_FAIL",
                "http_code": 400,
                "message": "Error validación de datos params"
            }
        }

    500 - Header: Content-Type: application/json
        Body:{
            "error": {
                "code": "NO_DATA",
                "http_code": 500,
                "message": "No existen libros"
            }
        }

### Save Book 

__El usuario, autenticado, crea un libro:__

    Método: POST
    uri: /books/book/:bookId
    headers parameters:
        Content-Type: 
            application/json
        authorization:  
            bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM4MmZkMDcwODMyMDI3OGMyM2RkYzYiLCJpYXQiOjE1NzM0MDA2NjgsImV4I6MTU3MzQ4NzA2OH0.oCBpBUEXcRkcBjjMovu_r0CPMhql9zHGbqi-1M2Ah4g
    body parameters:
        {
            title : { type: String, unique: true},
            authors : [ String ] ,
            picture : String,
            price : {type : Number, default :0 },
            category :[ String ],
            publishedDate: String,
            description : String,
            stock : {type : Number, default :0 },
        }

__Respuestas:__

    200 - Header: Content-Type: application/json
        Body: {
            "book": 
                {
                    "authors": [
                        "Basarat Syed"
                    ],
                    "price": 47.78,
                    "category": [],
                    "stock": 32,
                    "_id": "5dc87ec26de95d47eb21e096",
                    "title": "Nuevo Beginning Node.js",
                    "picture": "Beginning Node-js.jpeg",
                    "publishedDate": "2014-12-02",
                    "description": "Beginning Node.js is your ...",
                    "__v": 0
                }
            }

    400 - Header: Content-Type: application/json
        Body:{
            "error": {
                "code": "VALIDATION_FAIL",
                "http_code": 400,
                "message": "Error validación de datos body"
            }
        }

    500 - Header: Content-Type: application/json
        Body:{
            "error": {
                "code": "WRONG_ARGS",
                "http_code": 500,
                "message": "Error validación de datos DB"
            }
        }
        
### Update Book

__El usuario, autenticado, actualiza un libro:__

    Método: PUT
    uri: /books/book/:bookId
    headers parameters:
        Content-Type: 
            application/json
        authorization:  
            bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM4MmZkMDcwODMyMDI3OGMyM2RkYzYiLCJpYXQiOjE1NzM0MDA2NjgsImV4I6MTU3MzQ4NzA2OH0.oCBpBUEXcRkcBjjMovu_r0CPMhql9zHGbqi-1M2Ah4g
    body parameters:
        {
            title : { type: String, unique: true},
            authors : [ String ] ,
            picture : String,
            price : {type : Number, default :0 },
            category :[ String ],
            publishedDate: String,
            description : String,
            stock : {type : Number, default :0 },
        }

__Respuestas:__

    200 - Header: Content-Type: application/json
        Body: {
            "book": 
                {
                    "authors": [
                        "Basarat Syed"
                    ],
                    "price": 47.78,
                    "category": [],
                    "stock": 32,
                    "_id": "5dc87ec26de95d47eb21e096",
                    "title": "Nuevo Beginning Node.js",
                    "picture": "Beginning Node-js.jpeg",
                    "publishedDate": "2014-12-02",
                    "description": "Beginning Node.js is your ...",
                    "__v": 0
                }
            }

    400 - Header: Content-Type: application/json
        Body:{
            "error": {
                "code": "VALIDATION_FAIL",
                "http_code": 400,
                "message": "Error validación de datos body"
            }
        }

    500 - Header: Content-Type: application/json
        Body:{
            "error": {
                "code": "WRONG_ARGS",
                "http_code": 500,
                "message": "Error validación de datos DB"
            }
        }


### Delete Book 

__El usuario, autenticado, elimina un libro:__

    Método: DELETE
    uri: /books/book/:bookId
    params parameters:
        :bookId
            Un número de id valido
    headers parameters:
        Content-Type: 
            application/json
        authorization:  
            bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM4MmZkMDcwODMyMDI3OGMyM2RkYzYiLCJpYXQiOjE1NzM0MDA2NjgsImV4I6MTU3MzQ4NzA2OH0.oCBpBUEXcRkcBjjMovu_r0CPMhql9zHGbqi-1M2Ah4g

__Respuestas:__

    200 - Header: Content-Type: application/json
        Body: {
                {
                    "message": "el libro ha sido eliminado"
                }
              }

              