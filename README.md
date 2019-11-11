
Proyecto: API-Decision_Helper

  

# Team Members

### . Carlos Jordan

### . Roberto Garcia

  

## Tree Structure

  

![](https://imgur.com/O3w0uUO.png)

![](https://imgur.com/rAc3NLf.png)

  

# Objetivos y desarrollo de la API

  

La API nace bajo el concepto de dotar de servidor y base de datos al Front-End (Decision Maker) realizado en el segundo módulo (Angular) del curso Mean-Stack.

  

. La función de la APP es resolver, de una manera objetiva y matemática, las preguntas que los usuarios puedan realizar.

  

. La función de la API es la recogida de esos datos, el CRUD de los mismos y su almacenaje en la BD.

  
  
  

## UTILIZACIÓN

  

### URL'S

  

Url del servidor. Se crea en el documento server.mjs (método *https para localhost) pero con el puerto definido en el doc .env

*Debemos recordar que al subir al nuestra aplicación al servidor HEROKU, el mismo nos crea el https, con lo cual debemos modificar en nuestro documento server.js

  

##### https.createServer(opt, app).listen(process.env.PORT)

por

  

##### http.createServer(app).listen(process.env.PORT)

  

En el documento .env es donde definiremos las rutas de:

  
------------------
- Puerto servidor

- localhost

- Heroku (modo producción)

  

- Base de datos

- localhost://27017

- mongo Atlass

---------  

![](https://imgur.com/0Mtrk03.png)

  

## Creación del token

  

Objeto creación token 
		
			./api/middleware/jwt_auth.js

  

En el documento jwt_auth definimos la manera en que el token será creado:

  

- Duración del token

- Fecha finalización token

- Codificación token

  

		export default {

		createToken(user) {

		const f1 = moment().unix();

		const f2 = moment().add(14, "days");

		const payload = {sub: user,iat: f1,exp: f2.unix()};

		const salidaToken = {orig: payload,fech: f2,token: jwt.encode(payload, process.env.SECRET_TOKEN)

		};

		return salidaToken;

		},



Pasos para obtener un token válido:

  

- SignUp https://documenter.getpostman.com/view/9175109/SW18waJN

  

![](https://imgur.com/Vbovdsg.png)

  

- SignIn https://documenter.getpostman.com/view/9175109/SW18waDu

  

![](https://imgur.com/0uUe1xh.png)

  

- Enlace postman

  

https://documenter.getpostman.com/view/9175109/SW18waDu

  
# Endpoints

## Formatos de respuesta

  
  
  

### Servidor

  

En la creación del servidor hemos dejado el único console.log de todo el documento, informando de la conexión del servidor al puerto (local o Heroku) seleccionado.

  

![](https://imgur.com/2AH61RE.png)

  

### Base de datos

  

- ÉXITO

  

https://documenter.getpostman.com/view/9175109/SW7T6r2j

- ERRORES

  

https://documenter.getpostman.com/view/9175109/SW18waE4

  

### Error Handlers

  

![](https://imgur.com/OuO9UTq.png)

  

- NotFound

  

https://documenter.getpostman.com/view/9175109/SW18waJL
