![Home](https://github.com/neollob/node-project/blob/master/readme-imgs/favicon.ico)
# Proyecto: Application MEAN Full-stack: Back-End - TheTraktor Admin Panel

## 1. Introducción

### Cliente: The Traktor

Empresa dedicada a la formación, instrucción e impartición de entrenamientos en la especialidad del Crossfit.

## Descripción

The Traktor® es una plataforma de entrenamiento, es la culminación de toda nuestra formación y experiencia en el entrenamiento, plasmada sobre una programación, ayudándoos a mejorar como atletas, tanto físico como mentalmente. De esta manera, conseguiremos alcanzar todos aquellos retos personales que os hayáis planteado.

Son muchos años viviendo en primera persona el CrossFit® al más alto nivel, y tenemos muy claro el trabajo que hay que llevar a cabo, tanto a nivel físico como mental, para optimizar al máximo el rendimiento de este complejo deporte.

- Hemos iniciado el desarrollo de la plataforma de administración de los clientes (customers) y sus contenidos (products: plans y packs)
mediante los usuarios administadores (users).

Esta plataforma de administración se vincula con la **App de Usuarios**, que será descagable para **Android** y **IOs**.

Desarrollada en *Angular* - *Ionic* - *Rest Api* y *MongoDB*

Desde esta se darán de alta, con sus datos personales, foto y plan. Ocasionalmente el administrador podrá editar su cuenta o subirlo al plan VIP

- En posteriores iteraciones a Products se añadirá Merchandissing, mediante tienda online.

En el curso Mean-Stack 2, construimos la parte de  de una aplicación full-stack. En Mean-Stack 3, hemos construido el Back-End utilizando Node.js, Express.js y MongoDB.

El proyecto consiste en crear una API Rest funcional. Esta API expondrá una serie de end-points que podrán ser consumidos por la aplicación de Front-end.

__Aplicación Angular__: Alojamiento propio: https://admin.thetraktor.com/ (Front-End Responsive)

Github Page: https://armandorodgo.github.io/thetraktor-admin/

Repo Public Github: https://github.com/ArmandoRodGo/thetraktor-admin



__API Rest funcional__:  Heroku: https://thetraktor.herokuapp.com/

Region      United States

Stack       heroku-18

Framework   Node.js

Slug Size   23.2 MiB of 500 MiB


El objetivo de la aplicación es la de poder administrar vía web el ecosistema de TheTraktor. 
La aplicación esta pensada para:
- Gestión de clientes: Introducción, edición, listados con filtros (por Nombre, por Plan o Activos - Inactivos.
- Gestión de productos - planes: Listar planes.
- Gestión de usuarios administradores: Login y Registro.
- Gestión de Tareas por realizar: Listado de Tareas y estado.


## Primera iteración

En una primera fase de desarrollo se ha desarrollado el CRUD completo de los clientes 
- Clientes
    - Listado de clientes
    - Detalle
    - Edicion
    - Añadir 
- Planes
    - Listado de planes

### Pagina principal

![Home](https://github.com/neollob/node-project/blob/master/readme-imgs/Home.png)

### Login Page

![login](https://github.com/neollob/node-project/blob/master/readme-imgs/Login.png)

![loging](https://github.com/neollob/node-project/blob/master/readme-imgs/Logging.png)

### Errors Validation Login Page

#### Invalid Email

![login Invalid Email](https://github.com/neollob/node-project/blob/master/readme-imgs/Invalid-email.png)

#### Unauthorized

![login Unauthorized](https://github.com/neollob/node-project/blob/master/readme-imgs/Validation-Unauthorized-login.png)

### Pagina principal Logged

![Home Logged](https://github.com/neollob/node-project/blob/master/readme-imgs/home-logged.png)

### Listado de clientes

![Listado de clientes](https://github.com/neollob/node-project/blob/master/readme-imgs/Customers.png)

### Detalle de cliente

![Detalle de cliente](https://github.com/neollob/node-project/blob/master/readme-imgs/Customer-detail.png)

### Edición de cliente

![Edición de cliente](https://github.com/neollob/node-project/blob/master/readme-imgs/edit-customer.png)

### Alta de cliente

![Alta de cliente](https://github.com/neollob/node-project/blob/master/readme-imgs/Create-customer.png)

![Alta de cliente1](https://github.com/neollob/node-project/blob/master/readme-imgs/creating-customer1.png)

![Alta de cliente2](https://github.com/neollob/node-project/blob/master/readme-imgs/creating-customer2.png)

### Listado de Planes

![Producto: Planes](https://github.com/neollob/node-project/blob/master/readme-imgs/Products-Plans.png)

### Sección ToDo (Tareas desarrollo - estado)

    ![To-Do](https://github.com/neollob/node-project/blob/master/readme-imgs/Todo-section.png)

## indices

Indices aplicados sobre la busqueda de usuarios por nombre, apellidos y plan

>db.customers.createIndex({"name.first":"text", "name.last":"text"})

>db.customers.createIndex({"plan":1})

```
[
        {
            "v" : 2,
            "key" : {
                "_id" : 1
            },
            "name" : "_id_",
            "ns" : "test.customers"
        },
        {
            "v" : 2,
            "key" : {
                "_fts" : "text",
                "_ftsx" : 1
            },
            "name" : "name.first_text_name.last_text",
            "ns" : "test.customers",
            "weights" : {
                "name.first" : 1,
                "name.last" : 1
            },
            "default_language" : "english",
            "language_override" : "language",
            "textIndexVersion" : 3
        },
        {
            "v" : 2,
            "key" : {
                "plan" : 1
            },
            "name" : "plan_1",
            "ns" : "test.customers"
        }
]
```

## Test - Postman

## GET Get usuarios

http://localhost:3000/customers

lista los usuarios activos
Headers
Content-Type	application/json
Bodyraw (application/json)

{

		"name":"dani2",
		"email":"dani@estudiosdwi.com",
		"password":"12345678"
	
}

Example RequestGet usuarios

curl --location --request GET "http://localhost:3000/customers" \
--header "Content-Type: application/json" \
--data "{

		\"name\":\"dani2\",
		\"email\":\"dani@estudiosdwi.com\",
		\"password\":\"12345678\"
	
}"

Example Response200 OK

[
  {
    "name": {
      "first": "MALINDA",
      "last": "Booth"
    },
    "packs": [
      {
        "customers": [],
        "_id": "5dc0b37db73fc84c308441e8",

POST Login
(0)
http://localhost:3000/user/login

enviamos mail y password para logarse y obtener token
Headers
Content-Type	application/json
Bodyraw (application/json)

{
	"name":"dani",
	"email":"dani@estudiosdwi.com",
	"password":"12345678"
}

Example RequestLogin

curl --location --request POST "http://localhost:3000/user/login" \
--header "Content-Type: application/json" \
--data "{

		\"name\":\"dani2\",
		\"email\":\"dani@estudiosdwi.com\",
		\"password\":\"12345678\"
	
}"

Example Response200 OK

{
  "user": {
    "_id": "5dc16e48b6afda1bec142360",
    "name": "dani",
    "email": "dani@estudiosdwi.com",
    "password": "$2b$10$w7WQkNNqPnNg/591oEKuuu/dBbE9ph0OI9rfvD1EQsE/SMrMyRkpO",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzE2ZTQ4YjZhZmRhMWJlYzE0MjM2MCIsImlhdCI6MTU3MzIwNjk1NywiZXhwIjoxNTc1Nzk4OTU3fQ.HvelhvYmrY75NRkTRupvfCuaFqPhu9LarUj2HeNuw0Y"
}

POST Signup
(0)
http://localhost:3000/user/signup
Headers
Content-Type	application/json
Bodyraw (application/json)

{
	"name":"dani",
	"email":"dani@estudiosdwi.com",
	"password":"12345678"
}

Example Request
Login

curl --location --request POST "http://localhost:3000/user/login" \
--header "Content-Type: application/json" \
--data "{

		\"name\":\"dani2\",
		\"email\":\"dani@estudiosdwi.com\",
		\"password\":\"12345678\"
	
}"

Example Response200 OK

{
  "user": {
    "_id": "5dc16e48b6afda1bec142360",
    "name": "dani",
    "email": "dani@estudiosdwi.com",
    "password": "$2b$10$w7WQkNNqPnNg/591oEKuuu/dBbE9ph0OI9rfvD1EQsE/SMrMyRkpO",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzE2ZTQ4YjZhZmRhMWJlYzE0MjM2MCIsImlhdCI6MTU3MzIwNjk1NywiZXhwIjoxNTc1Nzk4OTU3fQ.HvelhvYmrY75NRkTRupvfCuaFqPhu9LarUj2HeNuw0Y"
}

GET Get usuarios inactivos
(0)
http://localhost:3000/customers/inactive

Listar usuarios inactivos
Headers
Content-Type	application/json
Bodyraw (application/json)

{

		"name":"dani2",
		"email":"dani@estudiosdwi.com",
		"password":"12345678"
	
}

Example Request
Get usuarios

curl --location --request GET "http://localhost:3000/customers" \
--header "Content-Type: application/json" \
--data "{

		\"name\":\"dani2\",
		\"email\":\"dani@estudiosdwi.com\",
		\"password\":\"12345678\"
	
}"

Example Response200 OK

[
  {
    "name": {
      "first": "MALINDA",
      "last": "Booth"
    },
    "packs": [
      {
        "customers": [],
        "_id": "5dc0b37db73fc84c308441e8",

POST Post usuario nuevo
(0)
http://localhost:3000/customers

Inserta un nuevo usuario en la colection customers En el campo plan y packs solo guarda los 'id' de los planes y packs
Headers
Content-Type	application/json
Bodyraw (application/json)

    {
        "name": {
            "first": "Elle",
            "last": "McPherson"
        },
        "packs": [
            {
                "customers": [],
                "_id": "5dc0b3d3b73fc84c308441eb",
                "name": "DEFINITION",
                "image": "Pack-Definition.png",
                "price": 10.95,
                "description": "Lorem ipsum Dolor"
            },
            {
                "customers": [],
                "_id": "5dc0b37db73fc84c308441e8",
                "name": "RUNNING",
                "image": "Pack-running.png",
                "price": 10.95,
                "description": "Lorem ipsum Dolor"
            }
        ],
        "user_id": "8f0eb26a-4603-4ecc-91bf-76b561078d97",
        "index": 4,
        "isActive": false,
        "gender": "female",
        "picture": "https://randomuser.me/api/portraits/med/women/52.jpg",
        "birth": "2014-02-01T12:44:41 -01:00",
        "email": "benitanavarro@centice.com",
        "address": "Allentown",
        "password": "5dc118008e8751b0d3b7c475",
        "weight": 106.44,
        "height": 198.52,
        "registered": "2019-11-05T19:28:16.451Z",
        "box": "Crossfit",
        "plan": {
            "customers": [],
            "_id": "5dc0b75eb73fc84c308441ef",
            "name": "ÉLITE",
            "price": 10.95,
            "index": 1,
            "icon": "elite.svg",
            "options": [
                {
                    "_id": "5dc0b6ac63d6814c30992aa6",
                    "option": "Acceso a sesión completa"
                },
                {
                    "option": "Acceso a sesión completa",
                    "_id": "5dc0b72863d6814c30992aa7"
                },
                {
                    "option": "Acceso a sesión completa",
                    "_id": "5dc0b73663d6814c30992aa8"
                }
            ]
        },
        "packList": "DEFINITION / RUNNING"
    }

Example Request
Get usuarios

curl --location --request GET "http://localhost:3000/customers" \
--header "Content-Type: application/json" \
--data "{

		\"name\":\"dani2\",
		\"email\":\"dani@estudiosdwi.com\",
		\"password\":\"12345678\"
	
}"

Example Response200 OK

[
  {
    "name": {
      "first": "MALINDA",
      "last": "Booth"
    },
    "packs": [
      {
        "customers": [],
        "_id": "5dc0b37db73fc84c308441e8",

GET Get usuario por `id`
(0)
http://localhost:3000/customers/5dc11a5903bf2803b71b7fe0

Obtiene un usuario pasandole el id como parametro de busqueda
Headers
Content-Type	application/json
Bodyraw (application/json)

{

		"name":"dani2",
		"email":"dani@estudiosdwi.com",
		"password":"12345678"
	
}

Example Request
Get usuarios

curl --location --request GET "http://localhost:3000/customers" \
--header "Content-Type: application/json" \
--data "{

		\"name\":\"dani2\",
		\"email\":\"dani@estudiosdwi.com\",
		\"password\":\"12345678\"
	
}"

Example Response200 OK

[
  {
    "name": {
      "first": "MALINDA",
      "last": "Booth"
    },
    "packs": [
      {
        "customers": [],
        "_id": "5dc0b37db73fc84c308441e8",

PUT Put usuario por `id`
(0)
http://localhost:3000/customers/5dc11a5903bf2803b71b7fe0

Actualiza los datos del documento pasandole el parametro id como indice de busqueda y actualizacion
Headers
Content-Type	application/json
Bodyraw (application/json)

{
    "name": {
        "first": "Patrick",
        "last": "Skinner"
    },
    "packs": [
        {
            "customers": [],
            "_id": "5dc0b2f063d6814c30992aa3",
            "name": "COMPETITION",
            "image": "Pack-Competition.png",
            "price": 10.95,
            "description": "Lorem ipsum Dolor"
        },
        {
            "customers": [],
            "_id": "5dc0b416b73fc84c308441ee",
            "name": "BARS",
            "image": "Pack-Bars.png",
            "price": 10.95,
            "description": "Lorem ipsum Dolor"
        }
    ],
    "_id": "5dc11a5903bf2803b71b7fe0",
    "user_id": "afcbc910-b478-4d8b-89a4-5c4e427113ea",
    "index": 20,
    "isActive": true,
    "gender": "male",
    "picture": "https://randomuser.me/api/portraits/med/men/84.jpg",
    "birth": "2014-06-03T11:37:30 -02:00",
    "email": "natashaskinner@centice.com",
    "address": "Ilchester",
    "password": "5dc118001676049878d3ddd6",
    "weight": 79.21,
    "height": 174.49,
    "box": "Crossfit",
    "plan": {
        "customers": [],
        "_id": "5dc0b64063d6814c30992aa5",
        "name": "BUILDER",
        "price": 10.95,
        "index": 5,
        "icon": "builder.svg",
        "options": [
            {
                "_id": "5dc0b6ac63d6814c30992aa6",
                "option": "Acceso a sesión completa"
            },
            {
                "option": "Acceso a sesión completa",
                "_id": "5dc0b72863d6814c30992aa7"
            },
            {
                "option": "Acceso a sesión completa",
                "_id": "5dc0b73663d6814c30992aa8"
            }
        ]
    },
    "registered": "2019-11-09T11:06:09.442Z",
    "packList": "COMPETITION / BARS"
}

Example Request
Get usuario por `id`

curl --location --request GET "http://localhost:3000/customers/5dc11a5903bf2803b71b7fe0" \
--header "Content-Type: application/json" \
--data "{

		\"name\":\"dani2\",
		\"email\":\"dani@estudiosdwi.com\",
		\"password\":\"12345678\"
	
}"

Example Response200 OK

{
  "name": {
    "first": "Natasha",
    "last": "Skinner"
  },
  "packs": [
    {
      "customers": [],
      "_id": "5dc0b2f063d6814c30992aa3",
      "name": "COMPETITION",

DELETE Delete usuario
(0)
http://localhost:3000/customers/5dc6a30ad55a507cc296e223

Elimina un usuario pasandole el id como parametro de busqueda y destruccion
Headers
Content-Type	application/json
Bodyraw (application/json)

    {
        "name": {
            "first": "Jason",
            "last": "McPherson"
        },
        "packs": [
            {
                "customers": [],
                "_id": "5dc0b3d3b73fc84c308441eb",
                "name": "DEFINITION",
                "image": "Pack-Definition.png",
                "price": 10.95,
                "description": "Lorem ipsum Dolor"
            },
            {
                "customers": [],
                "_id": "5dc0b37db73fc84c308441e8",
                "name": "RUNNING",
                "image": "Pack-running.png",
                "price": 10.95,
                "description": "Lorem ipsum Dolor"
            }
        ],
        "user_id": "8f0eb26a-4603-4ecc-91bf-76b561078d97",
        "index": 4,
        "isActive": false,
        "gender": "female",
        "picture": "https://randomuser.me/api/portraits/med/women/52.jpg",
        "birth": "2014-02-01T12:44:41 -01:00",
        "email": "benitanavarro@centice.com",
        "address": "Allentown",
        "password": "5dc118008e8751b0d3b7c475",
        "weight": 106.44,
        "height": 198.52,
        "registered": "2019-11-05T19:28:16.451Z",
        "box": "Crossfit",
        "plan": {
            "customers": [],
            "_id": "5dc0b75eb73fc84c308441ef",
            "name": "ÉLITE",
            "price": 10.95,
            "index": 1,
            "icon": "elite.svg",
            "options": [
                {
                    "_id": "5dc0b6ac63d6814c30992aa6",
                    "option": "Acceso a sesión completa"
                },
                {
                    "option": "Acceso a sesión completa",
                    "_id": "5dc0b72863d6814c30992aa7"
                },
                {
                    "option": "Acceso a sesión completa",
                    "_id": "5dc0b73663d6814c30992aa8"
                }
            ]
        },
        "packList": "DEFINITION / RUNNING"
    }

Example Request
Post usuario nuevo

curl --location --request POST "http://localhost:3000/customers" \
--header "Content-Type: application/json" \
--data "    {
        \"name\": {
            \"first\": \"Elle\",
            \"last\": \"McPherson\"
        },
        \"packs\": [
            {
                \"customers\": [],
                \"_id\": \"5dc0b3d3b73fc84c308441eb\",
                \"name\": \"DEFINITION\",
                \"image\": \"Pack-Definition.png\",
                \"price\": 10.95,
                \"description\": \"Lorem ipsum Dolor\"

Example Response200 OK

{
  "name": {
    "first": "ELLE",
    "last": "McPherson"
  },
  "packs": [
    "5dc0b3d3b73fc84c308441eb",
    "5dc0b37db73fc84c308441e8"
  ],
  "_id": "5dc698668fa790727db26774",

GET Get usuario por Plan
(0)
http://localhost:3000/customers/plan/5dc0b64063d6814c30992aa5

Obtiene el listado de usuarios de un plan en concreto pasandole el parametro id del plan
Headers
Content-Type	application/json
Bodyraw (application/json)

{

		"name":"dani2",
		"email":"dani@estudiosdwi.com",
		"password":"12345678"
	
}

Example Request
Get usuario por `id`

curl --location --request GET "http://localhost:3000/customers/5dc11a5903bf2803b71b7fe0" \
--header "Content-Type: application/json" \
--data "{

		\"name\":\"dani2\",
		\"email\":\"dani@estudiosdwi.com\",
		\"password\":\"12345678\"
	
}"

Example Response200 OK

{
  "name": {
    "first": "Natasha",
    "last": "Skinner"
  },
  "packs": [
    {
      "customers": [],
      "_id": "5dc0b2f063d6814c30992aa3",
      "name": "COMPETITION",

DELETE Delete packs del usuario
(0)
http://localhost:3000/customers/5dc11a5903bf2803b71b7fce/packs

Elimina los packs del usuario pasandole el paramentro id como parametro de busqueda y actualizacion
Headers
Content-Type	application/json
Bodyraw (application/json)

    {
        "name": {
            "first": "Jason",
            "last": "McPherson"
        },
        "packs": [
            {
                "customers": [],
                "_id": "5dc0b3d3b73fc84c308441eb",
                "name": "DEFINITION",
                "image": "Pack-Definition.png",
                "price": 10.95,
                "description": "Lorem ipsum Dolor"
            },
            {
                "customers": [],
                "_id": "5dc0b37db73fc84c308441e8",
                "name": "RUNNING",
                "image": "Pack-running.png",
                "price": 10.95,
                "description": "Lorem ipsum Dolor"
            }
        ],
        "user_id": "8f0eb26a-4603-4ecc-91bf-76b561078d97",
        "index": 4,
        "isActive": false,
        "gender": "female",
        "picture": "https://randomuser.me/api/portraits/med/women/52.jpg",
        "birth": "2014-02-01T12:44:41 -01:00",
        "email": "benitanavarro@centice.com",
        "address": "Allentown",
        "password": "5dc118008e8751b0d3b7c475",
        "weight": 106.44,
        "height": 198.52,
        "registered": "2019-11-05T19:28:16.451Z",
        "box": "Crossfit",
        "plan": {
            "customers": [],
            "_id": "5dc0b75eb73fc84c308441ef",
            "name": "ÉLITE",
            "price": 10.95,
            "index": 1,
            "icon": "elite.svg",
            "options": [
                {
                    "_id": "5dc0b6ac63d6814c30992aa6",
                    "option": "Acceso a sesión completa"
                },
                {
                    "option": "Acceso a sesión completa",
                    "_id": "5dc0b72863d6814c30992aa7"
                },
                {
                    "option": "Acceso a sesión completa",
                    "_id": "5dc0b73663d6814c30992aa8"
                }
            ]
        },
        "packList": "DEFINITION / RUNNING"
    }

Example Request
Post usuario nuevo

curl --location --request POST "http://localhost:3000/customers" \
--header "Content-Type: application/json" \
--data "    {
        \"name\": {
            \"first\": \"Elle\",
            \"last\": \"McPherson\"
        },
        \"packs\": [
            {
                \"customers\": [],
                \"_id\": \"5dc0b3d3b73fc84c308441eb\",
                \"name\": \"DEFINITION\",
                \"image\": \"Pack-Definition.png\",
                \"price\": 10.95,
                \"description\": \"Lorem ipsum Dolor\"

Example Response200 OK

{
  "name": {
    "first": "ELLE",
    "last": "McPherson"
  },
  "packs": [
    "5dc0b3d3b73fc84c308441eb",
    "5dc0b37db73fc84c308441e8"
  ],
  "_id": "5dc698668fa790727db26774",

GET Get plans
(0)
http://localhost:3000/plans/

Lista los documentos de la coleccion planes
Headers
Content-Type	application/json
Bodyraw (application/json)

    { }

Example Request
Post usuario nuevo

curl --location --request POST "http://localhost:3000/customers" \
--header "Content-Type: application/json" \
--data "    {
        \"name\": {
            \"first\": \"Elle\",
            \"last\": \"McPherson\"
        },
        \"packs\": [
            {
                \"customers\": [],
                \"_id\": \"5dc0b3d3b73fc84c308441eb\",
                \"name\": \"DEFINITION\",
                \"image\": \"Pack-Definition.png\",
                \"price\": 10.95,
                \"description\": \"Lorem ipsum Dolor\"

Example Response200 OK

{
  "name": {
    "first": "ELLE",
    "last": "McPherson"
  },
  "packs": [
    "5dc0b3d3b73fc84c308441eb",
    "5dc0b37db73fc84c308441e8"
  ],
  "_id": "5dc698668fa790727db26774",

GET Get packs
(0)
http://localhost:3000/packs/

Lista los documentos de la coleccion packs
Headers
Content-Type	application/json
Bodyraw (application/json)

    { }

Example Request
Get plans

curl --location --request GET "http://localhost:3000/plans/" \
--header "Content-Type: application/json" \
--data "    { }"

Example Response200 OK

[
  {
    "customers": [],
    "_id": "5dc29ca21c9d4400007dd917",
    "name": "VIP",
    "price": 0,
    "index": 0,
    "icon": "vip.png",
    "options": [
      {

POST Post packs
(0)
http://localhost:3000/packs/

Crea un nuevo dicumento en la coleccion packs
Headers
Content-Type	application/json
Bodyraw (application/json)

{
    "customers": [],
    "name": "FITNESS",
    "image": "Pack-Fitness.png",
    "price": 10.95,
    "description": "Lorem ipsum Dolor"
}

Example Request
Delete packs del usuario

curl --location --request DELETE "http://localhost:3000/customers/5dc11a5903bf2803b71b7fce/packs" \
--header "Content-Type: application/json" \
--data "    {
        \"name\": {
            \"first\": \"Jason\",
            \"last\": \"McPherson\"
        },
        \"packs\": [
            {
                \"customers\": [],
                \"_id\": \"5dc0b3d3b73fc84c308441eb\",
                \"name\": \"DEFINITION\",
                \"image\": \"Pack-Definition.png\",
                \"price\": 10.95,
                \"description\": \"Lorem ipsum Dolor\"

Example Response200 OK

{
  "name": {
    "first": "MALINDA",
    "last": "Booth"
  },
  "packs": [],
  "_id": "5dc11a5903bf2803b71b7fce",
  "user_id": "d8b6bd04-97e5-4bfb-bce2-8aba10725c72",
  "index": 1,
  "isActive": true,

POST Post plans
(0)
http://localhost:3000/plans/

Añade un nuevo dccumento a la coleccion plan
Headers
Content-Type	application/json
Bodyraw (application/json)

	{
        "customers": [],
        "name": "ONE",
        "price": 10.95,
        "index": 6,
        "icon": "one.png",
        "options": [
            {
                "_id": "5dc0b6ac63d6814c30992aa6",
                "option": "Acceso a sesión completa"
            },
            {
                "option": "Acceso a sesión completa",
                "_id": "5dc0b72863d6814c30992aa7"
            },
            {
                "option": "Acceso a sesión completa",
                "_id": "5dc0b73663d6814c30992aa8"
            }
        ]
    }

Example Request
Get plans

curl --location --request GET "http://localhost:3000/plans/" \
--header "Content-Type: application/json" \
--data "    { }"

Example Response200 OK

[
  {
    "customers": [],
    "_id": "5dc29ca21c9d4400007dd917",
    "name": "VIP",
    "price": 0,
    "index": 0,
    "icon": "vip.png",
    "options": [
      {

GET Get packs por id
(0)
http://localhost:3000/packs/5dc6af79d6c75309570eaec6

Obtiene un documento de la coleccion packs pasandole el parametro id para buscar y listar
Headers
Content-Type	application/json
Bodyraw (application/json)

{ }

Example Request
Get packs

curl --location --request GET "http://localhost:3000/packs/" \
--header "Content-Type: application/json" \
--data "    { }"

Example Response200 OK

[
  {
    "customers": [],
    "_id": "5dc0b2f063d6814c30992aa3",
    "name": "COMPETITION",
    "image": "Pack-Competition.png",
    "price": 10.95,
    "description": "Lorem ipsum Dolor"
  },
  {

GET Get plans por id
(0)
http://localhost:3000/plans/5dc29ca21c9d4400007dd917

Obtiene un documento filtrado por id
Headers
Content-Type	application/json
Bodyraw (application/json)

    { }

Example Request
Get usuarios

curl --location --request GET "http://localhost:3000/customers" \
--header "Content-Type: application/json" \
--data "{

		\"name\":\"dani2\",
		\"email\":\"dani@estudiosdwi.com\",
		\"password\":\"12345678\"
	
}"

Example Response200 OK

[
  {
    "name": {
      "first": "MALINDA",
      "last": "Booth"
    },
    "packs": [
      {
        "customers": [],
        "_id": "5dc0b37db73fc84c308441e8",

PUT Put pack por id
(0)
http://localhost:3000/packs/5dc6af79d6c75309570eaec6

Actualiza los datos del documento referenciado por id
Headers
Content-Type	application/json
Bodyraw (application/json)

{
    "customers": [],
    "_id": "5dc6af79d6c75309570eaec6",
    "name": "FITNESS PLUS",
    "image": "Pack-Fitness.png",
    "price": 10.95,
    "description": "Lorem ipsum Dolor",
    "__v": 0
}

Example Request
Delete packs del usuario

curl --location --request DELETE "http://localhost:3000/customers/5dc11a5903bf2803b71b7fce/packs" \
--header "Content-Type: application/json" \
--data "    {
        \"name\": {
            \"first\": \"Jason\",
            \"last\": \"McPherson\"
        },
        \"packs\": [
            {
                \"customers\": [],
                \"_id\": \"5dc0b3d3b73fc84c308441eb\",
                \"name\": \"DEFINITION\",
                \"image\": \"Pack-Definition.png\",
                \"price\": 10.95,
                \"description\": \"Lorem ipsum Dolor\"

Example Response200 OK

{
  "name": {
    "first": "MALINDA",
    "last": "Booth"
  },
  "packs": [],
  "_id": "5dc11a5903bf2803b71b7fce",
  "user_id": "d8b6bd04-97e5-4bfb-bce2-8aba10725c72",
  "index": 1,
  "isActive": true,

PUT Put plan por id
(0)
http://localhost:3000/plans/5dc29ca21c9d4400007dd917

Actualiza el documento referenciado por id
Headers
Content-Type	application/json
Bodyraw (application/json)

{
    "customers": [],
    "_id": "5dc29ca21c9d4400007dd917",
    "name": "VIP PLUS",
    "price": 0,
    "index": 0,
    "icon": "vip.png",
    "options": [
        {
            "_id": "5dc0b6ac63d6814c30992aa6",
            "option": "Acceso a sesión completa"
        },
        {
            "option": "Acceso a sesión completa",
            "_id": "5dc0b72863d6814c30992aa7"
        },
        {
            "option": "Acceso a sesión completa",
            "_id": "5dc0b73663d6814c30992aa8"
        }
    ]
}

Example Request
Post usuario nuevo

curl --location --request POST "http://localhost:3000/customers" \
--header "Content-Type: application/json" \
--data "    {
        \"name\": {
            \"first\": \"Elle\",
            \"last\": \"McPherson\"
        },
        \"packs\": [
            {
                \"customers\": [],
                \"_id\": \"5dc0b3d3b73fc84c308441eb\",
                \"name\": \"DEFINITION\",
                \"image\": \"Pack-Definition.png\",
                \"price\": 10.95,
                \"description\": \"Lorem ipsum Dolor\"

Example Response200 OK

{
  "name": {
    "first": "ELLE",
    "last": "McPherson"
  },
  "packs": [
    "5dc0b3d3b73fc84c308441eb",
    "5dc0b37db73fc84c308441e8"
  ],
  "_id": "5dc698668fa790727db26774",

DELETE Delete plan por id
(0)
http://localhost:3000/plans/5dc29ca21c9d4400007dd917

elimina un documento de la coleccion plan referenciado por id
Headers
Content-Type	application/json
Bodyraw (application/json)

{
    "customers": [],
    "_id": "5dc29ca21c9d4400007dd917",
    "name": "VIP PLUS",
    "price": 0,
    "index": 0,
    "icon": "vip.png",
    "options": [
        {
            "_id": "5dc0b6ac63d6814c30992aa6",
            "option": "Acceso a sesión completa"
        },
        {
            "option": "Acceso a sesión completa",
            "_id": "5dc0b72863d6814c30992aa7"
        },
        {
            "option": "Acceso a sesión completa",
            "_id": "5dc0b73663d6814c30992aa8"
        }
    ]
}

Example Request
Delete packs del usuario

curl --location --request DELETE "http://localhost:3000/customers/5dc11a5903bf2803b71b7fce/packs" \
--header "Content-Type: application/json" \
--data "    {
        \"name\": {
            \"first\": \"Jason\",
            \"last\": \"McPherson\"
        },
        \"packs\": [
            {
                \"customers\": [],
                \"_id\": \"5dc0b3d3b73fc84c308441eb\",
                \"name\": \"DEFINITION\",
                \"image\": \"Pack-Definition.png\",
                \"price\": 10.95,
                \"description\": \"Lorem ipsum Dolor\"

Example Response200 OK

{
  "name": {
    "first": "MALINDA",
    "last": "Booth"
  },
  "packs": [],
  "_id": "5dc11a5903bf2803b71b7fce",
  "user_id": "d8b6bd04-97e5-4bfb-bce2-8aba10725c72",
  "index": 1,
  "isActive": true,

DELETE Delete pack por id
(0)
http://localhost:3000/packs/5dc6af79d6c75309570eaec6

Elimina un documento de la coleccion packs referenciado por id
Headers
Content-Type	application/json
Bodyraw (application/json)

{
    "customers": [],
    "_id": "5dc6af79d6c75309570eaec6",
    "name": "FITNESS PLUS",
    "image": "Pack-Fitness.png",
    "price": 10.95,
    "description": "Lorem ipsum Dolor",
    "__v": 0
}

Example Request
Get usuarios

curl --location --request GET "http://localhost:3000/customers" \
--header "Content-Type: application/json" \
--data "{

		\"name\":\"dani2\",
		\"email\":\"dani@estudiosdwi.com\",
		\"password\":\"12345678\"
	
}"

Example Response200 OK

[
  {
    "name": {
      "first": "MALINDA",
      "last": "Booth"
    },
    "packs": [
      {
        "customers": [],
        "_id": "5dc0b37db73fc84c308441e8",

GET Get ToDoes
(0)
http://localhost:3000/todos/

Obtiene el listado de todos los documentos de la coleccion todo
Headers
Content-Type	application/json
Bodyraw (application/json)

{ }

Example Request
Post usuario nuevo

curl --location --request POST "http://localhost:3000/customers" \
--header "Content-Type: application/json" \
--data "    {
        \"name\": {
            \"first\": \"Elle\",
            \"last\": \"McPherson\"
        },
        \"packs\": [
            {
                \"customers\": [],
                \"_id\": \"5dc0b3d3b73fc84c308441eb\",
                \"name\": \"DEFINITION\",
                \"image\": \"Pack-Definition.png\",
                \"price\": 10.95,
                \"description\": \"Lorem ipsum Dolor\"

Example Response200 OK

{
  "name": {
    "first": "ELLE",
    "last": "McPherson"
  },
  "packs": [
    "5dc0b3d3b73fc84c308441eb",
    "5dc0b37db73fc84c308441e8"
  ],
  "_id": "5dc698668fa790727db26774",

GET Get ToDoes por id
(0)
http://localhost:3000/todos/5dc6136322ad4ef1c370193b

Obtiene un documento de la coleccion todo referenciado por id
Headers
Content-Type	application/json
Bodyraw (application/json)

{ }

Example Request
Get usuarios

curl --location --request GET "http://localhost:3000/customers" \
--header "Content-Type: application/json" \
--data "{

		\"name\":\"dani2\",
		\"email\":\"dani@estudiosdwi.com\",
		\"password\":\"12345678\"
	
}"

Example Response200 OK

[
  {
    "name": {
      "first": "MALINDA",
      "last": "Booth"
    },
    "packs": [
      {
        "customers": [],
        "_id": "5dc0b37db73fc84c308441e8",

PUT Put ToDo por id
(0)
http://localhost:3000/todos/5dc6136322ad4ef1c370193b

Actualiza un documento de la coleccion todo referenciado por id
Headers
Content-Type	application/json
Bodyraw (application/json)

{
    "_id": "5dc6136322ad4ef1c370193b",
    "registerdate": "2019-11-09T01:16:19.650Z",
    "todotask": [
        {
            "registerdate": "2019-11-09T01:16:47.840Z",
            "_id": "5dc6137f9c4b3d00048d02a9"
        }
    ],
    "task": "AA-updated",
    "type": 0,
    "section": 0,
    "state": "0",
    "description": "",
    "disabled": false,
    "__v": 0
}

Example Request
Get plans

curl --location --request GET "http://localhost:3000/plans/" \
--header "Content-Type: application/json" \
--data "    { }"

Example Response200 OK

[
  {
    "customers": [],
    "_id": "5dc29ca21c9d4400007dd917",
    "name": "VIP",
    "price": 0,
    "index": 0,
    "icon": "vip.png",
    "options": [
      {

POST Post ToDo
(0)
http://localhost:3000/todos/

Añade documento a la coleccion todo
Headers
Content-Type	application/json
Bodyraw (application/json)

{
    "todotask": [
        {
            "registerdate": "2019-11-09T01:16:47.840Z",
            "_id": "5dc6137f9c4b3d00048d02a9"
        }
    ],
    "task": "NEW",
    "type": 0,
    "section": 0,
    "state": "0",
    "description": "",
    "disabled": false,
    "__v": 0
}

Example Request
Get ToDoes

curl --location --request GET "http://localhost:3000/todos/" \
--header "Content-Type: application/json" \
--data "{ }"

Example Response200 OK

[
  {
    "_id": "5dc5165e910eb8159cbbe4a4",
    "registerdate": "2019-11-08T07:16:46.100Z",
    "todotask": [
      {
        "registerdate": "2019-11-08T10:47:00.688Z",
        "_id": "5dc5165e910eb8159cbbe4a4",
        "todotaskid": "e0037c63-dfe9-447f-9567-d52011c19a85",
        "task": "añadir contador usuarios",

DELETE Delete ToDo por id
(0)
http://localhost:3000/todos/5dc6b790d6c75309570eaed2

elimina documento de la coleccion todo referenciado por id
Headers
Content-Type	application/json
Bodyraw (application/json)

{}

## Posteriores iteraciones

- Completar CRUD, productos Planes y Packs
    - adicción
    - edición
    - eliminación
		
- Añadir funciones 
		
    - Notificaciones a clientes
    - Estadísticas 
    - Gráficas
    - Informes
    - ...


