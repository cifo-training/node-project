# Games4Education API<!-- omit in toc -->

## Índice de contenidos<!-- omit in toc -->

- [Introducción](#introducci%c3%b3n)
- [Utilización](#utilizaci%c3%b3n)
  - [Consumo](#consumo)
  - [Autenticación](#autenticaci%c3%b3n)
- [Endpoints de la API](#endpoints-de-la-api)
  - [Usuarios](#usuarios)
  - [Juegos](#juegos)

### Introducción

[Volver al índice](#games4education-api)  

El objetivo de esta API es proporcionar y recibir datos para y del uso de la aplicación cliente Games4Education. En su primera versión, dicha aplicación utilizaba una API basada en ficheros JSON. Con este proyecto se pretende extender para poder implementar todas las funcionalidades previstas a medio y largo plazo, así como tener una mayor potencia.
La información que maneja está vinculada a los usuarios (Users, autenticación y información relativa al uso) de la aplicación y a los objetos juego (Game) y partida (GamePlay).

### Utilización

[Volver al índice](#games4education-api)  

La API está servida por Heroku, bajo la URL [https://g4e-server2.herokuapp.com](https://g4e-server2.herokuapp.com/unauthorized).

- La API responde a todas las peticiones mediante el protocolo `HTTP`, en formato `JSON`, utilizando los estados HTTP pertinentes al tipo de respuesta.
- En operaciones de consulta, simplemente devuelve los datos, mientras que en operaciones de inserción, modificación o borrado de datos, incluye un mensaje de estado informando de que la petición ha sido realizada con éxito y los datos que ha tratado.
- Para las peticiones de **consulta** se utiliza el método http `GET`, para las operaciones de **inserción de datos** y otras **operaciones especiales** (`login/register`) se utiliza el método http `POST`, para operaciones de **edición** el método http `PUT` y para operaciones de **borrado**, el método http `DELETE`.
- Los parámetros de las operaciones `POST` y `PUT` a almacenar viajan en el **Request Body**, mientras que los identificadores generalmente viajan como **Request Params**.

#### Consumo

[Volver al índice](#games4education-api)  

Por ejemplo, una petición de todos los juegos, tendría la siguiente estructura:

EJEMPLO PETICIÓN POR GET: `<API_URL>/games`

RESPUESTA (status: `200`):

```javascript
[
    {
    "description": "Descripción del juego",
    "category": "default",
    "_id": "identificadordejuego",
    "name": "Juego de prueba",
    "script": "ScriptFile.js"
    },
    [...más juegos...]
]
```

En cambio, una operación de inserción podría ser ésta:

EJEMPLO PETICIÓN POR POST: `<API_URL>/games`

REQUEST BODY:

```json
{
    "name": "Nuevo juego",
    "category": "math",
    "description": "Descripción del nuevo juego",
    "script": "nuevoScript.js"
}
```

RESPUESTA (status: 200):

```json
{
    result: "success",
    inserted: {
        "_id": "idAutogenerada",
        "name": "Nuevo juego",
        "category": "math",
        "description": "Descripción del nuevo juego",
        "script": "nuevoScript.js"
    }
}
```

#### Autenticación

[Volver al índice](#games4education-api)  

Para autenticarte, debes estar registrado como usuario, primeramente.

Para ello, debes usar la ruta relativa `/users/register` (ver apartado endpoints '*registro*').

Para realizar la autenticación, una vez tengas tu usuario creado, debes loguearte a través de la ruta `/users/login` (ver apartado endpoints '*obtener un token de autenticación*')

Si la autenticación ha sido exitosa, se enviará un token al usuario (**bearer token**).

Dicha token debe ser utilizada en el campo `Authorization` de la petición para aquellos endpoints que requieran tener un usuario autenticado.

### Endpoints de la API

[Volver al índice](#games4education-api)  

#### Usuarios

>
> Obtener un token de autenticación
> ---
> ---
> 
>**Método de petición:** `POST`  
**URI:** `/users/login`  
**Parámetros del Body:**
>
>- **`username`**  
    **Tipo:** `string` (`required`, `unique`)  
    **Ejemplo:** davemour  
    Nombre de identificación del usuario. No pueden existir dos usuarios con el mismo nombre de usuario.
>- **`password`**  
    **Tipo:** `string` (`required`)  
    **Example:** mypassword  
    Una contraseña válida. Al guardarse, será encriptada.  
>
>**Respuestas**:
>
>___
>
>`200` - OK
>
>**Header:**
>
> ```http
> Content-Type: application/json
>```
> 
> **Body:**
>
>    ```json
>    {
>        "message": "Logged in",
>        "token": "eyJXXXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLm1lbnNhZgghLmRldi92MS9sb2dpbiIsImlhdCI6MTQ2NDM1NDY5OSwiZXhwIjoxNDY0MzU4Mjk5LCJuYmYisfE0NjQzNTQ2OTksImp0aSI6IjIyNDg4Y2IxM2RkNzZlODZjM2NhZWZhZjNhMDBkMjkzIiwic3ViIjoxNH0.F3q4ckNbI8sMg9RX_iRSyrEmGWW3oyO8dMcasKl5xer"
>    }
>```
>
> ---
>
>`401` - Credenciales incorrectas  
> **Header:**
>
>```http
> Content-Type: application/json
>```
>
>**Body:**
>
>```json
>{
>    "error": {
>        "result": "error",
>        "error": "VALIDATION_FAIL",
>        "message": "The username field is required. The password field is required."
>    }
>}
>```
>
>___
>`400` - Parámetros de petición incorrectos
> **Header:**
>
> ```json
> Content-Type: application/json
> ```
>
>**Body:**
>
>```json
>{
>    "error": {
>        "result": "error",
>        "error": "WRONG_ARGS",
>        "message": "Request body must have an username and a password"
>    }
>}
>```

___

> Registro de nuevo usuario
> ---
> ---
>
>**Método de petición:** `POST`  
**URI:** `/users/register`  
**Parámetros del Body:**
>
>- **`username`**  
    **Tipo:** `string` (`required`, `unique`)  
    **Ejemplo:** davemour  
    Nombre de identificación del usuario. No pueden existir dos usuarios con el mismo nombre de usuario.
>- **`password`**  
    **Tipo:** `string` (`required`)  
    **Example:** mypassword  
    Una contraseña válida. Al guardarse, será encriptada.  
>- **`retypePassword`**  
    **Tipo:** `string` (`required`)  
    **Example:** mypassword  
    Comprobación de la contraseña. La única finalidad es minimizar la posibilidad de que el usuario haya errado al escribir la contraseña que quiere utilizar. Debe coincidir con el campo `password`.
>- **`email`**  
    **Tipo:** `string` (`required, unique`)  
    **Example:** davemour@fakemail.com  
    Una dirección de correo válida. Por ahora no tiene mayor utilidad. En futuras versiones de la API puede utilizarse para enviar correo de verificación o como identificador alternativo.  
>
>**Respuestas**:
>
>___
>
>`200` - OK
>
>**Header:**
>
> ```http
> Content-Type: application/json
>```
> 
> **Body:**
>
>    ```json
>    {
>       "result": "success",
>       "message": "Registered successfully"
>    }
>```
>
> ---
>
>`400` - Parámetros incorrectos
>
>**Header:**
>
> ```json
> Content-Type: application/json
> ```
>
>**Body:**
>
>```json
>{
>    "error": {
>        "code": "WRONG_ARGS",
>        "http_code": 400,
>        "message": "Request body must have an username, a password and a retypePassword. Password and retypePassword must match"
>    }
>}
>```

___

> Obtener todos los usuarios
> ---
> ---
>
>**Método de petición:** `GET`  
**URI:** `/users`  
>**Respuestas**:
>
>`200` - OK
>
>**Header:**
>
> ```http
> Content-Type: application/json
>```
> 
> **Body:**
>
>    ```json
> [
>    {
>       "_id": "user_ID",
>       "username": "davemour",
>       "email": "davemour@fakemail.com"
>    },
>    // ...
> ]
>```
>
> ---
>


___

> Obtener un usuario por ID
> ---
> ---
>
>**Método de petición:** `GET`  
>**URI:** `/users/id/:id`  
>**Parámetros URL:**
>
>- **`id`**  
    **Tipo:** `string` (`required`)  
    **Ejemplo:** 5dc1fcff1c9d440000ca94ff  
    Identificador de jugador. El jugador dado debe existir.
>
>**Respuestas**:
>
>`200` - OK
>
>**Header:**
>
> ```http
> Content-Type: application/json
>```
>
> **Body:**
>
>    ```json
>    {
>       "_id": "user_ID",
>       "username": "davemour",
>       "email": "davemour@fakemail.com"
>    }
>```
>
> ---
>
> `404` - Usuario no encontrado  
> **Header:**
>
> ```http
> Content-Type: application/json
>```
>
> **Body:**
>
> ```json
>{
>   "result": "error",
>   "error": "NOT_FOUND",
>   "message": "User not found."
> }
> ```

___

> Obtener puntuación total de un usuario
> ---
> 
>**Método de petición:** `GET`  
**URI:** `/users/id/:id/score`  
>**Parámetros URL:**
>
>- **`id`**  
    **Tipo:** `string` (`required`)  
    **Ejemplo:** 5dc1fcff1c9d440000ca94ff  
    Identificador de jugador. El jugador dado debe existir.
>
>**Respuestas**:
>
>`200` - OK
>
>**Header:**
>
> ```http
> Content-Type: application/json
>```
>
> **Body:**
>
>    ```json
>    {
>       "_id": "user_ID",
>       "username": "davemour",
>       "email": "davemour@fakemail.com"
>    }
>```
>
> ---
>
> `404` - Usuario no encontrado  
> **Header:**
>
> ```http
> Content-Type: application/json
>```
>
> **Body:**
>
> ```json
>{
>   "result": "error",
>   "error": "NOT_FOUND",
>   "message": "User not found."
> }
> ```

___

> Borrar usuario
> ---
> 
>**Método de petición:** `DELETE`  
**URI:** `/users/id/:id`
>**Parámetros URL:**
>
>- **`id`**  
    **Tipo:** `string` (`required`)  
    **Ejemplo:** 5dc1fcff1c9d440000ca94ff  
    Identificador de jugador. El jugador dado debe existir.
>
>**Respuestas**:
>
>`200` - OK
>
>**Header:**
>
> ```http
> Content-Type: application/json
>```
>
> **Body:**
>
>    ```json
>    {
>         "result": "success",
>         "deleted": {
>             "_id": "user_ID",
>             "username": "davemour",
>             "email": "davemour@fakemail.com"
>         }
>    }
>```
>
> ---
>
> `404` - Usuario no encontrado  
> **Header:**
>
> ```http
> Content-Type: application/json
>```
>
> **Body:**
>
> ```json
>{
>   "result": "error",
>   "error": "NOT_FOUND",
>   "message": "Deletion failed. User not found."
> }
> ```

#### Juegos

> Obtener todos los juegos
> ---
> ---
>
>**Método de petición:** `GET`  
**URI:** `/games`  
>**Respuestas**:
>
>`200` - OK
>
>**Header:**
>
> ```http
> Content-Type: application/json
>```
> 
> **Body:**
>
>    ```json
> [
>     {
>          "_id": "5dc403471c9d440000cecdd9",
>          "name": "Clickbait",
>          "category": "default",
>          "description": "A game for practising clicking. Honestly, this is more for boring and testing the application than for educational purposes...",
>        "script": "Game1"
>     },
>     {
>          "_id": "5dc403721c9d440000cecddb",
>          "name": "Colors",
>          "category": "default",
>          "description": "A game for practising color identification.",
>        "script": "Game2"
>     },
>    // ...
> ]
>```
>---

---

___

> Insertar nuevo juego
> ---
> ---
>
>**Método de petición:** `POST`  
**URI:** `/games/`  
**Parámetros del Body:**
>
>- **`name`**  
    **Tipo:** `string` (`required`, `unique`)  
    **Ejemplo:** Sum1  
    Nombre del juego. Es único para cada juego.
>- **`description`**  
    **Tipo:** `string`  
    **Example:** A game for practising 1-digit sum.  
    Breve descripción de cómo funciona y para qué sirve el juego. Es completamente opcional.  
>- **`category`**  
    **Tipo:** `string` (`default value: default`, `possible values: [default, math]`),  
    **Example:** math  
    Categoría a la que pertenece el juego. Los valores están restringidos a los indicados. En futuras versiones se permitirá añadir nuevas categorías para utilizar con este campo.
    Si no se especifica este campo, la categoría del juego nuevo será `default`.
>- **`script`**  
    **Tipo:** `string` (`required, unique`)  
    **Example:** myGameScriptFileName  
    El nombre del archivo de script que contiene la lógica del juego. Por el momento, esta funcionalidad se encuentra en fase de desarrollo, por lo que esta información por ahora solamente es útil para gestionar dichos ficheros en el cliente.
>
>**Respuestas**:
>
>___
>
>`200` - OK
>
>**Header:**
>
> ```http
> Content-Type: application/json
>```
> 
> **Body:**
>
>    ```json
>    {
>       "result": "success",
>       "inserted": {
>          "_id": "5dc403721c9d440000cecddb",
>          "name": "Sum1",
>          "category": "math",
>          "description": "A game for practising 1-digit sum.",
>          "script": "myGameScriptFileName"
>       }
>    }
>```
>
> ---
>
>`400` - Parámetros incorrectos
>
>**Header:**
>
> ```json
> Content-Type: application/json
> ```
>
>**Body:**
>
>```json
>{
>    "error": {
>        "code": "WRONG_ARGS",
>        "http_code": 400,
>        "message": "Game insertion failure. Perhaps request body data is wrong. Required fields: name, script[, category, description]"
>    }
>}
>```

___

> Obtener todos los juegos de una categoría dada
> ---
> ---
>
>**Método de petición:** `GET`  
**URI:** `/games/category/:category`  
>**Parámetros URL:**
>
>- **`id`**  
    **Tipo:** `string` (`required`, `possible values: [default, math]`
    **Ejemplo:** math  
    Nombre de la categoría. Debe ser uno de los valores de categorías indicado.
>
>**Respuestas**:
>
>`200` - OK
>
>**Header:**
>
> ```http
> Content-Type: application/json
>```
> 
> **Body:**
>
>    ```json
> [
>     {
>          "_id": "5dc403721c9d440000cecddb",
>          "name": "Product",
>          "category": "math",
>          "description": "A game for practising multiplication.",
>        "script": "MultiplyScriptGame"
>     },
>    // ...
> ]
>```
>---

---

> Obtener un juego por ID
> ---
> ---
>
>**Método de petición:** `GET`  
>**URI:** `/games/id/:id`  
>**Parámetros URL:**
>
>- **`id`**  
    **Tipo:** `string` (`required`)  
    **Ejemplo:** 5dc1fcff1c9d440000ca94ff  
    Identificador de juego. El juego dado debe existir.
>
>**Respuestas**:
>
>`200` - OK
>
>**Header:**
>
> ```http
> Content-Type: application/json
>```
>
> **Body:**
>
> ```json
> {
>     "_id": "5dc403721c9d440000cecddb",
>     "name": "Product",
>     "category": "math",
>     "description": "A game for practising multiplication.",
>     "script": "MultiplyScriptGame"
> }
>    
>```
>
> ---
>
> `404` - Juego no encontrado  
> **Header:**
>
> ```http
> Content-Type: application/json
>```
>
> **Body:**
>
> ```json
>{
>   "result": "error",
>   "error": "NOT_FOUND",
>   "message": "Game not found."
> }
> ```

---

> Obtener un juego por nombre
> ---
> ---
>
>**Método de petición:** `GET`  
>**URI:** `/games/name/:name`  
>**Parámetros URL:**
>
>- **`name`**  
    **Tipo:** `string` (`required`)  
    **Ejemplo:** Colors  
    Nombre del juego. El nombre ha de coincidir exactamente (con el del juego a buscar (sin tener en cuenta mayúsculas o minúsculas).
>
>**Respuestas**:
>
>`200` - OK
>
>**Header:**
>
> ```http
> Content-Type: application/json
>```
>
> **Body:**
>
> ```json
> {
>     "description": "A game for practising color identification.",
>     "category": "default",
>     "_id": "5dc403721c9d440000cecddb",
>     "name": "Colors",
>     "script": "Game2"
> }  
>```
>
> ---
>
> `404` - Juego no encontrado  
> **Header:**
>
> ```http
> Content-Type: application/json
>```
>
> **Body:**
>
> ```json
>{
>   "result": "error",
>   "error": "NOT_FOUND",
>   "message": "Game not found."
> }
> ```

___

> Editar juego
> ---
> ---
>
>**Método de petición:** `PUT`  
**URI:** `/games/id/:id`  
**Parámetros de la URL:**
>
>- **`id`**  
    **Tipo:** `string` (`required`)  
    **Ejemplo:** 5dc1fcff1c9d440000ca94ff  
    Identificador de juego a editar. El juego dado debe existir.
>
>**Parámetros del Body:**
>
> _**Nota:** todos los campos aquí indicados son omisibles. El hecho de omitir un campo implica que dicho campo será ignorado en la edición. El no introducir ningún campo implica un error de entrada de argumentos._
>
>- **`name`**  
    **Tipo:** `string`  
    **Ejemplo:** Sum1  
    Nombre del juego. Es único para cada juego. Si bien es posible editarlo, no debe existir previamente ningún juego cuyo nombre coincida con el nuevo nombre.
>- **`description`**  
    **Tipo:** `string`  
    **Example:** A game for practising 1-digit sum.  
    Breve descripción de cómo funciona y para qué sirve el juego. Es completamente opcional.  
>- **`category`**  
    **Tipo:** `string` (`default value: default`, `possible values: [default, math]`),  
    **Example:** math  
    Categoría a la que pertenece el juego. Los valores están restringidos a los indicados. En futuras versiones se permitirá añadir nuevas categorías para utilizar con este campo.
>- **`script`**  
    **Tipo:** `string`  
    **Example:** myGameScriptFileName  
    El nombre del archivo de script que contiene la lógica del juego. Por el momento, esta funcionalidad se encuentra en fase de desarrollo, por lo que esta información por ahora solamente es útil para gestionar dichos ficheros en el cliente.
>
>**Respuestas**:
>
>___
>
>`200` - OK
>
>**Header:**
>
> ```http
> Content-Type: application/json
>```
> 
> **Body:**
>
>    ```json
>    {
>       "result": "success",
>       "inserted": {
>          "_id": "5dc403721c9d440000cecddb",
>          "name": "Sum1",
>          "category": "math",
>          "description": "A game for practising 1-digit sum.",
>          "script": "myGameScriptFileName"
>       }
>    }
>```
>
> ---
>
>`400` - Parámetros incorrectos
>
>**Header:**
>
> ```json
> Content-Type: application/json
> ```
>
>**Body:**
>
>```json
>{
>    // TODO: DEFINIR
>}
>```
>---

___

> Borrar juego
> ---
> ---
>
>**Método de petición:** `DELETE`  
**URI:** `/games/id/:id`  
>**Parámetros URL:**
>
>- **`id`**  
    **Tipo:** `string` (`required`)  
    **Ejemplo:** 5dc403721c9d440000cecddb  
    Identificador de juego. El juego dado debe existir.
>
>**Respuestas**:
>
>`200` - OK
>
>**Header:**
>
> ```http
> Content-Type: application/json
>```
>
> **Body:**
>
>    ```json
>    {
>         "result": "success",
>         "deleted":  {
>            "_id": "5dc403721c9d440000cecddb",
>            "name": "Sum1",
>            "category": "math",
>            "description": "A game for practising 1-digit sum.",
>            "script": "myGameScriptFileName"
>        }
>    }
>```
>
> ---
>
> `404` - Juego no encontrado  
> **Header:**
>
> ```http
> Content-Type: application/json
>```
>
> **Body:**
>
> ```json
>{
>   "result": "error",
>   "error": "NOT_FOUND",
>   "message": "Deletion failed. Game not found."
> }
> ```
> ---


___
TODO: Añadir los endpoints de gamePlays