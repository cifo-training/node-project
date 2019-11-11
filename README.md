[![logo-proyecto](https://i.imgur.com/bbISOvdm.png)](https://i.imgur.com/bbISOvdm.png)

# Proyecto: Application MEAN Full-stack: Back-End 

> Por Toni Reis & Angela Turizo

### Objetivo

- Crear una aplicación funcional en la que se presenta una selección de películas con la posibilidad de ver el detalle de cada una con información como:

    • Título

    • Año de estreno

    • Cartel

    • Y sobretodo con la clasificación que tienen las películas en la imdb

- Usando la clasificación de la imdb hacer un sistema propio de votos para que las 5 más votadas sean proyectadas en una sala de cine. La votación se podrá realizar una vez el usuario este logueado.

- Desde el modelo anterior en el Back-End de la aplicación el objetivo es incluir unos end-points que se usarán en el front-end para la interacción con el cliente.

Para el desarrollo del back-end hemos utilizando **Node.js**, **Express**, **MongoDB(_Mongo Atlas_)** y **Mongoose**. 

- Las consultas que se han implementado están separadas en tres controladores :

    • Films 
    
    • Usuarios 
    
    • Votos

         Proyecto Film Vote
            |_api
                |_controllers
                    |_films
                        |_create.js
                        |_index.js
                        |_list.js
                        |_listOne.js
                        |_remove.js
                        |_update.js
                    |_usuarios
                        |_index.js
                        |_login.js
                        |_register.js
                    |_votos
                        |_create.js
                        |_index.js
                        |_list.js
                        |_listOne.js
                        |_remove.js
                        |_update.js
                |_middleware
                    |_auth.js
                    |_error-handler.js
                |_models
                    |_films
                        |_dao.js
                        |_model.js
                    |_usuarios
                        |_dao.js
                        |_model.js
                    |_votos
                        |_dao.js
                        |_model.js
                    |_user
                        |_dao.js
                        |_model.js
                        |_register.js
                |_Mongo Connection Module
                    |_mongoManager.js
                |_services
                    |_index.js
                |_.env
                |_app.js
                |_server.js


Podemos encontrar la API en :

**API Host :**
(https://filmvote-api.herokuapp.com/film)

**Repositorio GitHub :** (https://github.com/kifka81/api)

### Endpoints por apartados

#### Usuarios :

**Usuario | Register | El usuario se registra desde la aplicación cliente**

    endpoint: Registro de Usuario
    Método: POST
    uri: /usuarios/register
    body parameters:
        nombre
        string
        email
        string (required) 
        Ejemplo:  angela@gmail.com
                        
        password
        string (required) 
        Example: 123456      
        
        Resultado: Registro de nuevo usuario, creación del TOKEN
                        
[![logo-proyecto](https://i.imgur.com/RvYkG5B.jpg)](https://i.imgur.com/RvYkG5B.jpg)

**Usuario | Login | El usuario se autentica desde la aplicación cliente**

     endpoint: Login de Usuario
     Método: POST
     uri: /usuarios/login
     body parameters:
        email
        string (required) 
        Ejemplo:  toni@gmail.com
                        
        password
        string (required) 
        Ejemplo: 123456
        
        Resultado: Login de entrada de un usuario ya registrado, creación del TOKEN 

[![logo-proyecto](https://i.imgur.com/5XpSuXG.jpg)](https://i.imgur.com/5XpSuXG.jpg)

#### Films :

**Films | List | El usuario, autenticado, accede a ver el listado completo de películas**

     endpoint: List
     Método: GET
     uri: /film
     
     Resultado: Listado en json de todas las películas

**Films | List One | El usuario, autenticado, obtiene un elemento**

    endpoint: List One
    Método: GET
    uri: /film/5dc6931d8e3242fd911a8f17
     
    Resultado: Muestra la película buscada por la _id

[![logo-proyecto](https://i.imgur.com/zSJr6Xp.jpg)](https://i.imgur.com/zSJr6Xp.jpg)

**Films | Create One | El usuario, autenticado, crea un nuevo documento**

    endpoint: Create
    Método: POST
    uri: /film
    body parameters:
      id: Number,
      Title : String,
      Year : String,
      Released : String,
      Runtime : String,
      Genre : String,
      Director : String,
      Actors : String,
      Plot : String,
      Language : String,
      Country : String,
      Awards : String,
      Poster : String,
      imdbRating : String,
      votos : Number
     
    Resultado: La entrada de un nuevo documento en la colección Films
    
[![logo-proyecto](https://i.imgur.com/P3vNzJe.jpg)](https://i.imgur.com/P3vNzJe.jpg)

**Films | Update One | El usuario, autenticado, actualiza un campo de una película**

    endpoint: upDate
    Método: PUT
    uri: /film/5dc6931d8e3242fd911a8f17
    body parameters:
      id: Number,
      Title : String,
      Year : String,
      Released : String,
      Runtime : String,
      Genre : String,
      Director : String,
      Actors : String,
      Plot : String,
      Language : String,
      Country : String,
      Awards : String,
      Poster : String,
      imdbRating : String,
      votos : Number
     
    Resultado: Actualiza el valor necesario dentro del documento

**Films | Remove One | El usuario, autenticado, elimina una película**

    endpoint: Remove
    Método: DELETE
    uri: /film/5dc6931d8e3242fd911a8f17
     
    Resultado: Elimina por completo el documento de la película, buscada por _id

[![logo-proyecto](https://i.imgur.com/yoUpMXC.jpg)](https://i.imgur.com/yoUpMXC.jpg)

#### Votos :

**Votos | Create One | El usuario, autenticado, crea una nueva película para ser votada**

     endpoint: Listado en la página Ranking
     Método: GET
     uri: /votos
     body parameters:
        Title : String,
        Poster : String,
        votos : Number
     
     Resultado: Crea una nueva película en la página de Ranking, para que pueda ser valorada, sumando o restando votos de 1 en 1 
     
[![logo-proyecto](https://i.imgur.com/avrpsF7.jpg)](https://i.imgur.com/avrpsF7.jpg)

**Films | Update One | El usuario, autenticado, graba el voto generado en el front-end**

     endpoint: List
     Método: POST
     uri: /votos/5dc6b11a4770f08d6add2487
     
     Resultado: En la página de Ranking, se montrará el incremento de votos. Guardando las votaciones para ir listando las películas más votadas, ordenandolas ascendentemente
     
[![logo-proyecto](https://i.imgur.com/3mAAdfF.jpg)](https://i.imgur.com/3mAAdfF.jpg)


                
