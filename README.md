# Proyecto: Application MEAN Full-stack: Back-End

## 1. Consultas

- ###  Users

| Entidad | Accion | Descripción
| :---: | :---: | :--- |
| User | Register | El usuario se registra desde la aplicación cliente |
| User | Login | El usuario se autentica desde la aplicación cliente |
| User | List | El usuario, autenticado como administrador, accede a una lista completa de usuarios |
| User | ListOne | El usuario, autenticado, obtiene su usuario |
| User | Paginator | El usuario, autenticado como administrador, obtiene una sublista de usuarios |
| User | Search | El usuario, autenticado como administrador, obtiene una sublista de usuarios que cumplen el regex|
| User | Update One | El usuario, autenticado, actualiza su usuario|
| User | Update Rol | El usuario, autenticado como administrador, actualiza el rol de un usuario|
| User | Remove One | El usuario, autenticado, elimina su usuario|

- ### Categorías

| Entidad | Accion | Descripción
| :---: | :---: | :--- |
| Categoría | List |El usuario accede a una lista completa de categorías |
| Categoría | Create One | El usuario, autenticado como administrador, crea una categoría |


- ### Productos

| Entidad | Accion | Descripción
| :---: | :---: | :--- |
| Producto | Create One | El usuario, autenticado como administrador, crea un producto |
| Producto | Update One | El usuario, autenticado como administrador, actualiza un producto |
| Producto | Remove One | El usuario, autenticado como administrador, elimina un producto |
| Producto | ListOne | El usuario accede a un producto |
| Producto | List |El usuario accede a una lista completa de productos |
| Producto | Paginator | El usuario obtiene una sublista de productos |
| Producto | CategoryList |El usuario accede a una sublista de productos de la categoría introducida |
| Producto | DiscountList |El usuario accede a una sublista de productos en oferta |
| Producto | PromotionList |El usuario accede a una sublista de productos en promoción |

- ### ShoppingCart
| Entidad | Accion | Descripción
| :---: | :---: | :--- |
| ShoppingCart | List One |El usuario, autenticado, accede a su ShoppingCart |
| ShoppingCart | Add Product | El usuario, autenticado, añade un producto en stock a su carro de la compra, reduce el stock del producto |
| ShoppingCart | Remove Product | El usuario, autenticado, elimina un producto a su carro de la compra  y añade de nuevo el producto al stock|

- ### Upload
| Entidad | Accion | Descripción
| :---: | :---: | :--- |
| User | Update Image | El usuario, autenticado, actualiza su imagen de perfil|
| User | Get Image | El usuario, autenticado, obtieme su imagen de perfil|

## 2.Información de la API

- ###  2.1.Auntentificación


- Register

```
endpoint: Registrar un usuario
Método: POST
uri: /register
body parameters:
    nombre
        string (required) Example: name
        Un nombre válido
    email
        string (required) Example: email@myemail.com
        Un email válido

    password
        string (required) Example: mypassword
        Una contraseña válida
Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
        {
            "role": "USER_ROLE",
            "_id": "5dc7c1982d93f523b0598abd",
            "nombre": "test18",
            "email": "test17@test.com",
            "__v": 0
        }
    
    400 - Header: Content-Type: application/json
    Body: {"error": "User validation failed: nombre: El nombre es necesario"}

    400 - Header: Content-Type: application/json
    Body: {"error": "User validation failed: nombre: El nombre necesita mas caracteres"}

    400 - Header: Content-Type: application/json
    Body: {"error": "User validation failed: email: El email es necesario"}

    400 - Header: Content-Type: application/json
    Body: { "error": "User validation failed: email: El email no cumple el formato" }

    400 - Header: Content-Type: application/json
    Body: {"error": "User validation failed: email: El email necesita mas caracteres"}

    400 - Header: Content-Type: application/json
    Body: { "error": "Email duplicado"}

    400 - Header: Content-Type: application/json
    Body: {"error": "User validation failed: password: El password es obligatorio"}

    400 - Header: Content-Type: application/json
    Body : {"error": "User validation failed: password: El password necesita mas caracteres"}

```

- Login

```
endpoint: Obtener token y usuario
Método: POST
uri: /login
body parameters:
    email
        string (required) Example: email@myemail.com
        Un email válido

    password
        string (required) Example: mypassword
        Una contraseña válida
Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
        {
            "user": [
                {
                    "role": "USER_ROLE",
                    "_id": "5dc7d9b024f638038c0216dc",
                    "nombre": "test2",
                    "email": "test2@test.com",
                "__v": 0
                }
            ],
            "token":        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyQHRlc3QuY29tIiwiaWF0IjoxNTczMzc4NDkxLCJleHAiOjE1NzM0NjQ4OTF9.eNztaEf6gL6NZwP_plNdg_JiDsLePp8VSU92SFVOsQk"
        }
    
    400 - Header: Content-Type: application/json
    Body: {"error": "usuario o password incorrectos"}

    400 - Header: Content-Type: application/json
    Body: {"error": "no introducistes el usuario o el password"}

```

- ###  2.2.Usuario

- List

```

endpoint: Obtener lista de usuarios
Método: GET
uri: /users
query params:
    count: retorna el número de usuarios si es true
body parameters:
    token
        string (required): Token de administrador válido
Respuestas:
    
    
    200 - Header: Content-Type: application/json
    Body:
       [
        {
            "role": "USER_ROLE",
            "_id": "5dc2fb270254ed105408a63f",
            "nombre": "test4",
            "email": "test4@test.com",
            "__v": 0,
            "ca": "5dc30cb2a219f31cb0eeaa02"
        },
        .
        .
        .
        {
            "role": "ADMIN_ROLE",
            "_id": "5dc40472b1be8323c41819fc",
            "email": "test8@test.com",
            "nombre": "test8",
            "__v": 0
        }
    ]

    ?count=true
    200 - Header: Content-Type: application/json
    Body:
       [
        {
            "role": "USER_ROLE",
            "_id": "5dc2fb270254ed105408a63f",
            "nombre": "test4",
            "email": "test4@test.com",
            "__v": 0,
            "ca": "5dc30cb2a219f31cb0eeaa02"
        },
        .
        .
        .
        {
            "role": "ADMIN_ROLE",
            "_id": "5dc40472b1be8323c41819fc",
            "email": "test8@test.com",
            "nombre": "test8",
            "__v": 0
        },
          {
            "user_number": 12
        }
    ]
    
    401 - Header: Content-Type: application/json
    Body:   {
                "mensaje": "Token incorrecto",
                "errors": {
                    "name": "JsonWebTokenError",
                    "message": "jwt must be provided"
                }
            }
    
```
- Paginator

```
endpoint: Obtener lista de usuarios
Método: GET
uri: /users/:page/:elements
    :page: número de página
    :elements: número de elementos por página
body:
    token
    string (required): Token de administrador válido

Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
        [
            {
            "role": "USER_ROLE",
            "_id": "5dc7c0f0bc82381dc85caf21",
            "nombre": "test",
            "email": "test15@test.com",
            "__v": 0
            },
            .
            .
            .
            {
                "role": "USER_ROLE",
                "_id": "5dc7c1982d93f523b0598abd",
                "nombre": "test18",
                "email": "test17@test.com",
                "__v": 0
            },
        {
            "user_number": 12
        }
    ]
    
    401 - Header: Content-Type: application/json
    Body:   {
                "mensaje": "Token incorrecto",
                "errors": {
                    "name": "JsonWebTokenError",
                    "message": "jwt must be provided"
                }
            }

```

- ListOne

```
endpoint: El usuario, autenticado, obtiene su usuario
Método: GET
uri: /users/:id
    :id: id del usuario
body:
    token
    string (required): Token de administrador válido o el token de su usuario

Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
       {
            "role": "USER_ROLE",
            "_id": "5dc2fb270254ed105408a63f",
            "nombre": "test",
            "email": "test4@test.com",
            "__v": 0,
            "ca": "5dc30cb2a219f31cb0eeaa02"
        }
    
    401 - Header: Content-Type: application/json
    Body:   {
                "mensaje": "Token incorrecto",
                "errors": {
                    "name": "JsonWebTokenError",
                    "message": "jwt must be provided"
                }
            }

```
- Search

```
endpoint:  El usuario, autenticado como administrador, obtiene una sublista de usuarios que cumplen el regex.
Método: GET
uri: /users/buscar/regex/:busqueda
    :busqueda: letras para buscar en la lista de emails y nombre de usuarios.
body:
    token
    string (required): Token de administrador válido

Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
        [
            {
                "_id": "5dc7b0ba3f4d9b2a2cd5ae12",
                "nombre": "Juan",
                "email": "test12@test.com"
            }
            .
            .
            .
            {
                "_id": "5dc7c1982d93f523b0598abd",
                "nombre": "Juanito",
                "email": "test28@test.com"
            }
        ]
    
    401 - Header: Content-Type: application/json
    Body:   {
                "mensaje": "Token incorrecto",
                "errors": {
                    "name": "JsonWebTokenError",
                    "message": "jwt must be provided"
                }
            }

```
- Update One

```
endpoint: El usuario, autenticado, actualiza su usuario
Método: PUT
uri: /users/:id
    :id: id del usuario que cambia el rol
body:
    token
        string (required): Token de administrador válido
     email
        string:  Example: email@myemail.com
        Un email válido
    password
        string: Example: mypassword
        Una contraseña válida

Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
        {
            "role": "USER_ROLE",
            "_id": "5dc7ea0a80b85928984b3186",
            "nombre": "test23",
            "email": "test26@test.com",
            "__v": 0
        }

    400- Header: Content-Type: application/json
    Body: {"error": "Validation failed: email: El email necesita mas caracteres"}
    
    400- Header: Content-Type: application/json
    Body:{"error": "Validation failed: email: El email no cumple el formato"}

    400- Header: Content-Type: application/json
    Body:{"error": "Validation failed: email: El email no cumple el formato"}

    400- Header: Content-Type: application/json
    Body:{"error": "Validation failed: nombre: El nombre necesita mas caracteres"}
    
    400- Header: Content-Type: application/json
    Body:{"error": "Email duplicado"}

    401 - Header: Content-Type: application/json
    Body:   {
                "mensaje": "Token incorrecto",
                "errors": {
                    "name": "JsonWebTokenError",
                    "message": "jwt must be provided"
                }
            }

```

- Update Rol

```
endpoint: El usuario, autenticado como administrador, actualiza el rol de un usuario
Método: PUT
uri: /users/role/:id
    :id: id del usuario que cambia el rol
body:
    token
        string (required): Token de administrador válido
    role
        string (required): [ADMIN_ROLE, USER_ROLE]

Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
        {
            "role": "ADMIN_ROLE",
            "_id": "5dc7e60e63e75f2ab8e8f87d",
            "nombre": "test23",
            "email": "test23@test.com",
            "__v": 0
        }

    400- Header: Content-Type: application/json
    Body: {"error": "Validation failed: role: ADMIN_ROLEs no es un rol válido"}
    
    401 - Header: Content-Type: application/json
    Body:   {
                "mensaje": "Token incorrecto",
                "errors": {
                    "name": "JsonWebTokenError",
                    "message": "jwt must be provided"
                }
            }
```

- Remove One

```
endpoint: El usuario, autenticado, elimina su usuario
Método: DELETE
uri: /users/:id
    :id: id del usuario para eliminar
body:
    token
        string (required): Token de administrador válido o el token del usuario para eliminar

Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
        {
            "role": "USER_ROLE",
            "_id": "5dc7ea0a80b85928984b3186",
            "nombre": "test23",
            "email": "test23@test.com",
            "__v": 0
        }

    400- Header: Content-Type: application/json
    Body: {"error": "Cast to ObjectId failed for value \"sdfdsf\" at path \"_id\" for model \"User\"}
    
    401 - Header: Content-Type: application/json
    Body:   {
                "mensaje": "Token incorrecto",
                "errors": {
                    "name": "JsonWebTokenError",
                    "message": "jwt must be provided"
                }
            }
```

- ###  2.3.Categorías

- List

```
endpoint: El usuario accede a una lista completa de categorías
Método: GET
uri: /categories
 
Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
      [
        {
            "subcategoria": [
                "Periféricos"
            ],
            "_id": "5dbeacc2929b120644888d50",
            "categoria": "Mouse",
            "__v": 0
        },
        .
        .
        .
        {
        "subcategoria": [
            "Periféricos"
        ],
        "_id": "5dbeaeea10eb8f2850d0fd12",
        "categoria": "Teclado",
        "__v": 0
        }
      ]
]
```
- Create One

```
endpoint: El usuario  categorías
Método: POST
uri: /categories
body:
    token
        string (required): Token de administrador válido
    categoria
        string (required):  Ejemplo: "Altavoces"
    subcategoria: Padres de la categoría 
        [string] : Ejemplo: ["Periféricos"]
 
Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
        {
            "subcategoria": [
            "Periféricos"
            ],
        "_id": "5dc7f1571de8f22fec0cfe7b",
        "categoria": "Altavoces",
        "__v": 0
        }

    400 - Header: Content-Type: application/json
    Body: {"error": "Categories validation failed: categoria: La categoria es obligatoria"}
    
    401 - Header: Content-Type: application/json
    Body:   {
                "mensaje": "Token incorrecto",
                "errors": {
                    "name": "JsonWebTokenError",
                    "message": "jwt must be provided"
                }
            }
```
- ###  2.3.Productos

- Create one

```
endpoint: El usuario, autenticado como administrador, crea una categoría 
Método: POST
uri: /product
body:
    token: string (required): Token de administrador válido
    nombre: string (required)
    precioUnitario: number (required)
    cantidad: number (required) -> Stock del producto
    categoria: string(required) -> id de la categoría
    imagen: string
    promocion:
        promocion: String,
        novedad: Boolean,
        createAt: Date,
        expires: Date
    oferta:
        descuento: Number,
        createAt: Date,
        expires: Date
 
Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
            {
                "shoppingCart": [],
                "_id": "5dc7f7a6cc37ec0bf812aa17",
                "nombre": "Owlotech Black Altavoces 2.1 16W RMS",
                "p": 21,
                "cantidad": 10,
                "categoria": "5dc7f1571de8f22fec0cfe7b",
                "i": "1.jpg",
                "__v": 0
            }

    400 - Header: Content-Type: application/json
    Body: {"error": "Product validation failed: nombre: El nombre es necesario"}

    400 - Header: Content-Type: application/json
    Body: { "error": "Product validation failed: nombre: El nombre necesita más caracteres"}

    400 - Header: Content-Type: application/json
    Body:  {"error": "Product validation failed: p: El precio únitario es necesario"}

    400 - Header: Content-Type: application/json
    Body:  {"error": "Product validation failed: p: El precio ha de ser mayor de 0"}

    400 - Header: Content-Type: application/json
    Body: {"error": "Product validation failed: cantidad: La cantidad es necesaria"}
    
    400 - Header: Content-Type: application/json
    Body:   {"error": "Product validation failed: categoria: Path `categoria` is required."}
  
    400 - Header: Content-Type: application/json
    Body: {
            "error": "Product validation failed: oferta.descuento: El descuento ha de ser mayor de 0, oferta: Validation failed:    descuento: El descuento ha de ser mayor de 0"
          }
    
    401 - Header: Content-Type: application/json
    Body:   {
                "mensaje": "Token incorrecto",
                "errors": {
                    "name": "JsonWebTokenError",
                    "message": "jwt must be provided"
                }
            }
```


Update


```
endpoint: El usuario, autenticado como administrador, crea una categoría 
Método: PUT
uri: /product/:id
    :id: id del product
body:
    token: string (required): Token de administrador válido
    nombre: string (required)
    precioUnitario: number (required)
    cantidad: number (required) -> Stock del producto
    categoria: string(required) -> id de la categoría
    imagen: string
    promocion:
        promocion: String,
        novedad: Boolean,
        createAt: Date,
        expires: Date
    oferta:
        descuento: Number,
        createAt: Date,
        expires: Date
 
Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
            {
                "shoppingCart": [],
                "_id": "5dc7f7a6cc37ec0bf812aa17",
                "nombre": "Owlotech Black Altavoces 2.1 16W RMS",
                "p": 25,
                "cantidad": 12,
                "categoria": "5dc7f1571de8f22fec0cfe7b",
                "i": "1.jpg",
                "__v": 0
            }

    400 - Header: Content-Type: application/json
    Body: {"error": "Duplicate validation error"}
    
    401 - Header: Content-Type: application/json
    Body:   {
                "mensaje": "Token incorrecto",
                "errors": {
                    "name": "JsonWebTokenError",
                    "message": "jwt must be provided"
                }
            }
```

ListOne 

```
endpoint: El usuario accede a un producto
Método: GET
uri: /product/:id
    :id: id del product

Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
        {
        "shoppingCart": [],
        "_id": "5dc7fc205291ad2d9059e214",
        "nombre": "Tacens Mars Gaming MRM0 Ratón Gaming 4000DPI",
        "p": 9.99,
        "cantidad": 9,
        "categoria": "5dbeacc2929b120644888d50",
        "i": "d2.jpg",
        "promocion": {
            "novedad": true,
            "createAt": "2019-11-10T12:00:55.320Z",
            "_id": "5dc7fc205291ad2d9059e215",
            "promocion": "invierno",
            "expires": "2020-04-09T00:00:00.000Z"
        },
        "__v": 0
    }   
    
    400 - Header: Content-Type: application/json
    Body: {"error": "Cast to ObjectId failed for value \"5dc7fc205291ad2d9059e21\" at path \"_id\" for model \"Product\""}

```

- Remove One

```
endpoint:  El usuario, autenticado como administrador, elimina un producto
Método: DELETE
uri: /product/:id
    :id: id del product

Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
     {
        "shoppingCart": [],
        "_id": "5dc7fbae5eeace0078ce29ca",
        "nombre": "Tacens Mars Gaming MRM0 Ratón Gaming 4000DPI53",
        "p": 100,
        "cantidad": 90,
        "categoria": "5dbeacc2929b120644888d50",
        "i": "https:d2.jpg",
        "promocion": {
        "novedad": true,
        "createAt": "2019-11-10T14:58:59.255Z",
        "_id": "5dc8265268deaf1f74d82c52",
        promocion:{
            "promocion": "invierno",
            "expires": "2020-04-09T00:00:00.000Z"
         },
        "__v": 0,
        "oferta": {
            "descuento":20
            "createAt": "2019-11-10T14:57:10.945Z",
            "_id": "5dc82547c0c0771aa8edc01c"
        }
    } 

    500 - Header: Content-Type: application/json
    Body:{"error": "Cast to ObjectId failed for value \"5dc7fbae5eeace0078ce29c\" at path \"_id\" for model \"Product\""}
    
    400 - Header: Content-Type: application/json
    Body: {"error": "Cast to ObjectId failed for value \"5dc7fc205291ad2d9059e21\" at path \"_id\" for model \"Product\""}
```

- List

```
endpoint: El usuario accede a una lista completa de categorías
Método: GET
uri: /products
 
Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
        [
            {
                "shoppingCart": [],
                "_id": "5dc8278c68deaf1f74d82c54",
                "nombre": "Tempest MS100 Paladin Ratón Gaming 1600DPI",
                "p": 4.99,
                "cantidad": 5,
                "categoria": {
                "subcategoria": [
                    "Periféricos"
                ],
                "_id": "5dbeacc2929b120644888d50",
                "categoria": "Mouse",
                "__v": 0
                },
                "i": "hms100-4.jpg",
                "__v": 0
            },
            .
            .
            .
            {
                "shoppingCart": [],
                "_id": "5dc8280468deaf1f74d82c59",
                "nombre": "Owlotech Black Altavoces 2.1 16W RMS",
                "p": 17.85,
                "cantidad": 10,
                "categoria": {
                "subcategoria": [
                    "Periféricos"
                ],
                "_id": "5dc7f1571de8f22fec0cfe7b",
                "categoria": "Altavoces",
                "__v": 0
            },
            "i": "1.jpg",
            "oferta": {
                "createAt": "2019-11-10T14:58:59.254Z",
                "_id": "5dc8280468deaf1f74d82c5a",
                "descuento": 15
            },
            "__v": 0
        }
    ]

```

- Paginator 

```
endpoint: El usuario obtiene una sublista de productos 
Método: GET
uri: /products//:page/:elements
    params  
            :page: número de página
            :elements: número de elementos por página 
Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
 [
    {
        "shoppingCart": [],
        "_id": "5dc827b268deaf1f74d82c57",
        "nombre": "Tacens Mars Gaming MRM0 Ratón Gaming 4000DPI",
        "p": 9.99,
        "cantidad": 9,
        "categoria": "5dbeacc2929b120644888d50",
        "i": "d2.jpg",
        "promocion": {
            "novedad": true,
            "createAt": "2019-11-10T14:58:59.255Z",
            "_id": "5dc827b268deaf1f74d82c58",
            "promocion": "invierno",
            "expires": "2020-04-09T00:00:00.000Z"
        },
        "__v": 0
    },
    .
    .
    .
    {
        "shoppingCart": [],
        "_id": "5dc8280468deaf1f74d82c59",
        "nombre": "Owlotech Black Altavoces 2.1 16W RMS",
        "p": 17.85,
        "cantidad": 10,
        "categoria": "5dc7f1571de8f22fec0cfe7b",
        "i": "1.jpg",
        "oferta": {
            "createAt": "2019-11-10T14:58:59.254Z",
            "_id": "5dc8280468deaf1f74d82c5a",
            "descuento": 15
        },
        "__v": 0
    }
]

```

- CategoryList


```
endpoint: El usuario accede a una lista completa de categorías
Método: GET
uri: /products/buscar/categories/:id
    params :id: id de una categoria
Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
    [
    {
        "shoppingCart": [],
        "_id": "5dc8280468deaf1f74d82c59",
        "nombre": "Owlotech Black Altavoces 2.1 16W RMS",
        "p": 17.85,
        "cantidad": 10,
        "categoria": {
            "subcategoria": [
                "Periféricos"
            ],
            "_id": "5dc7f1571de8f22fec0cfe7b",
            "categoria": "Altavoces",
            "__v": 0
        },
        "i": "1.jpg",
        "oferta": {
            "createAt": "2019-11-10T14:58:59.254Z",
            "_id": "5dc8280468deaf1f74d82c5a",
            "descuento": 15
        },
        "__v": 0
    }
]

    500 - Header: Content-Type: application/json
    body:{"error": "Cast to ObjectId failed for value \"5dc7f1571de8f22fec0cfe7\" at path \"_id\" for model \"Categories\"}

```
- Discount List

```
endpoint: El usuario accede a la lista de productos en oferta
Método: GET
uri: /product/buscar/oferta/

Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
  [
    {
        "shoppingCart": [],
        "_id": "5dc827a068deaf1f74d82c55",
        "nombre": "MSI Clutch GM10 Ratón Gaming 2400 DPI Negro",
        "p": 14.706,
        "cantidad": 12,
        "categoria": "5dbeacc2929b120644888d50",
        "i": "msi-mm-mouse-gm10-2d1.jpg",
        "oferta": {
            "createAt": "2019-11-10T14:58:59.254Z",
            "_id": "5dc827a068deaf1f74d82c56",
            "descuento": 10,
            "expires": "2020-04-09T00:00:00.000Z"
        },
        "__v": 0
    },
    .
    .
    .
    {
        "shoppingCart": [],
        "_id": "5dc8280468deaf1f74d82c59",
        "nombre": "Owlotech Black Altavoces 2.1 16W RMS",
        "p": 17.85,
        "cantidad": 10,
        "categoria": "5dc7f1571de8f22fec0cfe7b",
        "i": "1.jpg",
        "oferta": {
            "createAt": "2019-11-10T14:58:59.254Z",
            "_id": "5dc8280468deaf1f74d82c5a",
            "descuento": 15
        },
        "__v": 0
    }
]


```

- Promotion List

```
endpoint: El usuario accede a la lista de productos en promocion
Método: GET
uri: /product/buscar/promocion/


Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
 [
    {
        "shoppingCart": [],
        "_id": "5dc827b268deaf1f74d82c57",
        "nombre": "Tacens Mars Gaming MRM0 Ratón Gaming 4000DPI",
        "p": 9.99,
        "cantidad": 9,
        "categoria": "5dbeacc2929b120644888d50",
        "i": "d2.jpg",
        "promocion": {
            "novedad": true,
            "createAt": "2019-11-10T14:58:59.255Z",
            "_id": "5dc827b268deaf1f74d82c58",
            "promocion": "invierno",
            "expires": "2020-04-09T00:00:00.000Z"
        },
        "__v": 0
    }
]

```
- ###  2.4.ShoppingCart

- List One

```
endpoint: El usuario, autenticado accede a su ShoppingCart o el usuario es Administrador.
Método: GET
uri: /cart/:id
    params :id: id de un shopping cart

Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
    {
        "estado": "activo",
        "total": 19.98,
        "_id": "5dc8315cec2b3a1818bdbe07",
        "fecha": "2019-11-10T15:48:44.760Z",
        "products": [
            {
                "_id": "5dc8315cec2b3a1818bdbe09",
                "product": {
                    "_id": "5dc827b268deaf1f74d82c57",
                    "nombre": "Tacens Mars Gaming MRM0 Ratón Gaming 4000DPI",
                    "categoria": "5dbeacc2929b120644888d50",
                    "i": "d2.jpg"
                },
            "precio": 9.99,
            "cantidad": 2
        }
        ],
        "user": "5dc7c103bc82381dc85caf23",
        "__v": 1
    }

    400 - Header: Content-Type: application/json
    Body:{"error": "EL usuario no tiene ese carrito"}

    500 - Header: Content-Type: application/json
    Body: {"error": "Cast to ObjectId failed for value \"5dc7c103bc82381dc85caf2\" at path \"_id\" for model \"User\""}

    
    401 - Header: Content-Type: application/json
    Body:   {
                "mensaje": "Token incorrecto",
                "errors": {
                    "name": "JsonWebTokenError",
                    "message": "jwt must be provided"
                }
            }


```

Add Product

```
endpoint: El usuario, autenticado, añade un producto en stock a su carro de la compra, reduce el stock del producto 
Método: PUT
uri: /cart/:id
    params :id: id de un usuario
body:
    token: string (required): Token de administrador válido o del usuario de :id
    idProduct: string (required): id del producto para añadir
    cantidad: number (required): número de productos par añadir

Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
    {
        "estado": "activo",
        "total": 19.98,
        "_id": "5dc8315cec2b3a1818bdbe07",
        "fecha": "2019-11-10T15:48:44.760Z",
        "products": [
            {
                "_id": "5dc8315cec2b3a1818bdbe09",
                "product": "5dc827b268deaf1f74d82c57",
                "precio": 9.99,
                "cantidad": 2
            }
        ],
        "user": "5dc7c103bc82381dc85caf23",
        "__v": 1
    }

    400 - Header: Content-Type: application/json
    Body:{"error": "parametros incorrectos"}

    400 - Header: Content-Type: application/json
    Body: {"error": "id de usuario incorrecto"}

    400- Header: Content-Type: application/json
    Body: {"error": "id de producto erroneo"}

    400- Header: Content-Type: application/json
    Body: {"error": "no hay suficiente stock"}

    500 - Header: Content-Type: application/json
    Body:{"error": "Cast to ObjectId failed for value \"5dc7c103bc82381dc85caf2\" at path \"_id\" for model \"User\""}

    401 - Header: Content-Type: application/json
    Body:   {
                "mensaje": "Token incorrecto",
                "errors": {
                    "name": "JsonWebTokenError",
                    "message": "jwt must be provided"
                }
            }

```
- Remove Product

```
endpoint: El usuario, autenticado, elimina un producto a su carro de la compra  y añade de nuevo el producto al stock|
Método: DELETE
uri: /cart/:id
    params :id: id de un usuario
body:
    token: string (required): Token de administrador válido o del usuario de :id
    idProduct: string (required): id del producto para quitar
    cantidad: number (required): número de productos par quitar

Respuestas:
    200 - Header: Content-Type: application/json
    Body:
        {
            "estado": "activo",
            "total": 9.99,
            "_id": "5dc8315cec2b3a1818bdbe07",
            "fecha": "2019-11-10T15:48:44.760Z",
            "products": [
                {
                    "_id": "5dc8315cec2b3a1818bdbe09",
                    "product": "5dc827b268deaf1f74d82c57",
                    "precio": 9.99,
                    "cantidad": 1
                }
            ],
            "user": "5dc7c103bc82381dc85caf23",
        "__v": 1
    }

    400 - Header: Content-Type: application/json
    Body:{"error": "no existe el id de usuario"}

    400 - Header: Content-Type: application/json
    Body:{"error": "el producto no existe"}

    400 - Header: Content-Type: application/json
    Body:{"error": "el carrito no existe"}

    400 - Header: Content-Type: application/json
    Body:{"error": "parametros incorrectos"}
    
    401 - Header: Content-Type: application/json
    Body:   {
                "mensaje": "Token incorrecto",
                "errors": {
                    "name": "JsonWebTokenError",
                    "message": "jwt must be provided"
                }
            }

```

- ###  2.5.Upload

- Update Image

```
endpoint: El usuario, autenticado accede a su imagen o el usuario es Administrador.
Método: PUT
uri: /upload/:id
    params :id: id de un usuario
Body:
    file(required): file de extensión de imagen
    token(required): token de administrador o del usuario

Respuestas:
    
    200 - Header: Content-Type: application/json
    Body:
        {
            "ok": true,
            "mensaje": "Imagen de usuario actualizada",
            "usuario": {
                "role": "USER_ROLE",
                "_id": "5dc7c1982d93f523b0598abd",
                "nombre": "test18",
                "email": "test17@test.com",
                "__v": 0,
                "img": "5dc7c1982d93f523b0598abd-579.png"
            }  
        }

    400 - Header: Content-Type: application/json
    Body:{"error": "Extension no válida,Las exenciones válidas son png, jpg, gif, jpeg"}
    
    400 - Header: Content-Type: application/json
    Body:{error": "No hay imagen seleccionada"}

    400 - Header: Content-Type: application/json
    Body:{error": "Usuario no existe"}

    500 - Header: Content-Type: application/json
    Body: {"error": "Cast to ObjectId failed for value \"5dc7c103bc82381dc85caf2\" at path \"_id\" for model \"User\""}

    
    401 - Header: Content-Type: application/json
    Body:   {
                "mensaje": "Token incorrecto",
                "errors": {
                    "name": "JsonWebTokenError",
                    "message": "jwt must be provided"
                }
            }


```

- Get Image 	

```
endpoint: El usuario, autenticado, obtieme su imagen de perfil
Método: GET
uri: /upload/:id
    params :id: id de un usuario
Body:
    token(required): token de administrador o del usuario

Respuestas:
    
    200 - Header: Content-Type: image/png
    Body: La imagen subida

    500-
    Body:{"error": "Cast to ObjectId failed for value \"5dc502a5977eea2354c1f1d10\" at path \"_id\" for model \"User\""}

    400 - Header: Content-Type: application/json
    Body: {"error": "usuario no existe"}
    
    401 - Header: Content-Type: application/json
    Body:   {
                "mensaje": "Token incorrecto",
                "errors": {
                    "name": "JsonWebTokenError",
                    "message": "jwt must be provided"
                }
            }


```