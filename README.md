# Proyecto: Application MEAN Full-stack: Back-End

### 1. Introducción

En el curso __Mean-Stack 2__, construimos la parte de __Front-End__ de una **aplicación full-stack**. En Mean-Stack 3, construiremos el __Back-End__ utilizando Node.js, Express.js y MongoDB.

El proyecto consiste en crear una __API Rest__ funcional. Esta API expondrá una serie de _end-points_ que podrán ser consumidos por la aplicación de _Front-end_.

### 2. Diseño de la API

Previo al desarrollo toda aplicación debe contar con una fase de diseño. Durante este periodo tendremos en cuenta las entidades que tenemos que modelar y la estrategia con la que abordaremos el desarrollo.

La API de este ejercicio debe contar con, __al menos__, dos modelos principales, uno de ellos será la entidad __User__, a la que añadiremos otra entidad principal.

Partiendo del _Front-end_ que queremos desarrollar (o ya tenemos desarrollado) debemos obtener todas las consultas que se realizarán desde la capa de cliente. Estas consultas irán desde el registro o la conexión del usuario hasta la exposición de listados de datos, actualización de información, etc. En el apartado siguiente se recogen las consultas mínimas que se han de desarrollar:


#### 3. Consultas

| Entidad | Acción | Descripción |
|--------|--------|-------------|
|User | Register | El usuario se registra desde la aplicación cliente |
|User | Log in | El usuario se autentica desde la aplicación cliente |
|Otra | List | El usuario, autenticado, accede a una lista completa de elementos |
|Otra | List One | El usuario, autenticado, obtiene un elemento |
|Otra | Create One | El usuario, autenticado, crea un elemento |
|Otra | Update One | El usuario, autenticado, actualiza un elemento |
|Otra | Remove One | El usuario, autenticado, elimina un elemento |

Se pueden implementar tantas consultas como se quieran, atendiendo a que todas las que se planifiquen se han de desarrollar y deben ser completamente funcionales.

### 4. Estrategia de desarrollo

Construiremos una API que después deberá ser desplegada en el servidor __Heroku__ y al que conectaremos una base de datos alojada en __Mongo Atlas__.

El código de la aplicación debe mantener el patrón de diseño __MVC__ y se incluirá dentro de un directorio denominado __`src`__. La estructura de la aplicación deberá ser la siguiente:

            Proyecto
            |_src
                |_model
                    |_dao
                    |_model
                    |_schema
                |_controller
                    |_entity
                        |_index.mjs
                        |_controller(1).mjs
                        |_controller(2).mjs
                        |_...
                    |_user
                        |_index.mjs
                        |_login.mjs
                        |_register.mjs
                    |_ ...
                |_middleware
                    |_error-handler
                    |_auth.mjs
                    |_...
                |_Mongo Connection Module
                |_Others Helper Modules
                |_app.mjs
                |_server.mjs


Si se incluye cualquier otro tipo de código dentro de la aplicación, servidor Express de páginas estáticas, recursos públicos, etc., entonces se incluirá el código de la API dentro de una carpeta __`api`__ para diferenciarla del resto del código.

### 5. Requisitos del modelo

La capa de persistencia de la aplicación contará con una base de datos desarrollada en MongoDB y configurada dentro del servidor Mongo Atlas.

1. Requisitos de MongoDB:

    - dos colecciones: una será __users__ y otra corresponderá a la otra entidad principal.
    - las colecciones deben estar indexadas en función de las consultas que reciben.

2. Requisitos de la aplicación:

   - En la aplicación se utilizará el framework __Mongoose.js__ para las consultas obligatorias. Es optativo utilizar la api de MongoDb para otro tipo de consultas: administración, etc. 
  
   - Se valorará que existan mecanismos de validación implementados en los esquemas.

### 6. Requisitos de los controladores

Los controladores deben estar separados del fichero de rutas. Los controladores implementarán las llamadas a la capa de persistencia y devolverán la respuesta al cliente. La respuesta debería ser en formato `JSON`.

Existirá un fichero de rutas por cada entidad de la aplicación. Las rutas deben aparecer agrupadas y deberían ser las mínimas imprescindibles.

Dentro de los ficheros de rutas se incorporará la protección de las rutas con middlewares.

### 7. Archivo de Express (app)

 Éste es el __entry point__ de la API, contendrá todos los middlewares que sean necesarios para desarrollar la petición: _parsing_ de la request, compresión, cors, etc., menos los de autenticación, que se referirán dentro de las rutas.

### 8. Autenticación

La autenticación se implementará por reconocimiento de __usuario__ y __password__, y devolución de un __bearer token__ en formato __JWT__.
Se incorporará dentro de la carpeta __middleware__.

### 9. readme.md

Fichero de información de la API. Esta información es muy importante y debe ser clara y estructurada. Sigue los siguientes apartados:

1. Índice de apartados del documento
   
2. Introducción: _Objetivo de la API, tipo de información que devuelve._

3. Utilización

    - API Host    _Incluye aquí la URL de la API_

    - Formato de respuesta de la API    _Indica que tipo de respuesta se obtendrá si la llamada a la API se hace correctamente (Ejemplo) o si devuelve un error. (Ejemplo)_

    - Autenticación de la API        _Describe como obtener un token de acceso válido y como debe ser incorporado en la petición. (Ejemplo formato petición y respuesta).  Indica el tipo de respuesta en caso de token inválido o expirado._

4. Descripción de los endpoints por apartados:

    4.1 Obtener un Token _Ejemplo de formato:_

                endpoint: Obtener un token
                Método: POST
                uri: /user/login
                body parameters:
                    
                    email
                        string (required) Example: email@myemail.com
                        Un email válido

                    password
                        string (required) Example: mypassword
                        Una contraseña válida
                
                Respuestas:
                    200 - Header: Content-Type: application/json
                        Body: {
                                "data": {
                                    "token": "eyJXXXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLm1lbnNhZgghLmRldi92MS9sb2dpbiIsImlhdCI6MTQ2NDM1NDY5OSwiZXhwIjoxNDY0MzU4Mjk5LCJuYmYisfE0NjQzNTQ2OTksImp0aSI6IjIyNDg4Y2IxM2RkNzZlODZjM2NhZWZhZjNhMDBkMjkzIiwic3ViIjoxNH0.F3q4ckNbI8sMg9RX_iRSyrEmGWW3oyO8dMcasKl5xer",
                                    "expires_in": 60,
                                    "expires_at": "2016-05-27 14:11:39 GMT"
                                }
                        }

                    400 - Header: Content-Type: application/json
                        Body: {
                                    "error": {
                                        "code": "VALIDATION_FAIL",
                                        "http_code": 400,
                                        "message": "The email field is required. The password field is required. "
                                    }
                                    } 
                    400 - Header: Content-Type: application/json
                        Body: {
                                "error": {
                                    "code": "WRONG_ARGS",
                                    "http_code": 400,
                                    "message": "message can not be null"
                                }
                                } 

5. Incluir los datos de prueba por _end-point_


### 10. Requisitos de entrega:

1. Se creará un repositorio en __GitHub__ con el código de la aplicación, estructurado como se ha comentado anteriormente.
2. Se incorporará un fichero __readme.md__ con la estructura descrita en el apartado [readme.md](#readme.md)
3. Generar un repositorio en Heroku conectado al repositorio de GitHub que contiene el código.
4. Hacer un _fork_ de este repositorio __proyecto-node__ y una vez finalizado el ejercicio realizar un pull request que contenga la siguiente información:
   -  Subject: Nombre del o de los miembros del equipo en la cabecera.
   -  Mensaje: Dirección git del repositorio, url de la aplicación cliente(si la hubiera), url heroku de la API.
