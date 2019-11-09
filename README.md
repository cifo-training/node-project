# API Thesaurus

__1. Introducción__: La API _Thesaurus_ se configura como una base de datos de objetos perdidos.

__2. Utilización__:

    - API Host: https://217.61.97.40

    - Formato de respuesta de la API: El formato de respuesta será siempre de tipo JSON; tanto en caso de éxito, devolviendo el documento o parte del documento solicitado, o un mensaje de error (bajo el campo "message") informando del tipo de dicho error o causa que lo ha generado. Por ejemplo, para una routa desconocida,
    
    GET /ruta/genial 


    - Autenticación de la API: 

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
