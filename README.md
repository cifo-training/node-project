
Proyecto: API-Gramanyam

Acceso al repositorio: https://github.com/fparrar/API-REST-GRAMANYAM

# 1. Team Members
    
- Miguel Manzanares Garcés
- Francesc Parra Rodríguez

# 2. Tree Structure

![](https://i.imgur.com/tG1ZN2v.png)

#  3. Introducción: Objetivos y desarrollo de la API  

La API-Gramanyam se construye como parte del Back-end para la APP Gramanyam desarrollada en Angular. 

Cuando se diseño la APP gramanyam en Angular, los datos se servían y se consumían mediante los packages *json-server* y *json-server-auth*. Por ello, tuvimos que dar determinadas lógicas de autenticación, validacion y creación de registros, que deberían haber dependido del Back-End. 

Así pues, la API-Gramanyam nace en sustitución a los packages *json-server* y *json-server-auth para poder controlar la autenticación (con JWT-simple), la validación (schemas mongoose) y la creación de registros (modelos mongoose). 

El mayor reto ha sido lidiar con la deuda técnica que dejamos en el front-end por no haber desacoplado sus funciones correctamente y por tener que depender excesivamente de qué necesitaba que le devolviéramos y cómo.       

# 4. Utilización: 

 - LINK de acceso al host de la API --> [https://gramanyam-api.herokuapp.com/](https://gramanyam-api.herokuapp.com/)
 - LINK de acceso al cliente --> https://fparrar.github.io/Gramanyam/
	
	Es posible que sea necesario instalar el plugin CORS everywhere en el navegador desde donde se ejecute el cliente, para solucionar el siguiente error: 
	```Access to XMLHttpRequest at 'https://gramanyam-api.herokuapp.com/restaurantes' from origin 'https://fparrar.github.io' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'https://gramanyam-api.herokuapp.com/restaurantes' that is not equal to the supplied origin.```

	
 - Formato de respuesta de la API:
		 - La respuesta la enviamos generalmente como String cuando la petición se realiza correctamente (con alguna excepción concreta en la que el cliente la necesita en formato JSON).
		 - La respuesta errónea la capturamos con catch(error) y la devolvemos sin tratar. 
		 - Se podrá ver con más detalle en el siguiente apartado. 
 - Descripción de los endpoints:
	 - **Registrar un usuario**: 	 
```
         Método: POST
         uri: /register
         body parameters:
	         name:  String,
	         password: {
		         type:  String,
		         minlength: [8, `no válida. Debe contener 8 o más caracteres, mayúsculas y un simbolo especial.`]
			         },
	         email: {
		         type:String,
		         required:  /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
		         },	         direccion:  String,
	         telefono: {
		         type:  Number,
		         min: [600000000, 'no válido'],
		         max: [999999999, 'no válido']
		         }         
         Respuestas:
             try{
             const  user  =  await userDAO.create(Object.assign({/* user */}, req.body));
             res.status(200).send({user:  user})
             }       
             catch(err){
             res.status(400).send(`${err}`)
}
}```

```
 - **Login**: 	

    ```  Método: POST
         uri: /login
         body parameters:	         
	         password: 
	         email: 
	         try{
    userLogin = await userDao.listOne(req.body.email);
    if(userLogin==null){
      res.status(400).send("Usuario no existe") 
    } 
        
    bcrypt.compare(req.body.password, userLogin.password, function(err, res){
      if(err) console.log(err.message);
      if(res){
         res.send({message: 'Logueado', accessToken:token, idCliente:userLogin.id}
      }else{
        res.status(510).send("Password erroneo");
      }
    })
    }
    catch(err){
    console.log(err.message);
    }
    }
    ```
 
- **Listar Restaurantes**
 
 ```
		 Método: GET
         uri: /restaurantes
         body parameters:	          
	          none;
         Respuestas:
	         try{
	             userLogin  =  await  userDao.listOne(req.body.email);
	             if(userLogin==null){
	             res.status(400).send("Usuario no existe")
	             }
	             if(userLogin.password!=req.body.password){
	             res.status(510).send("Password erroneo");
	             }
	             let  token=generateAccesToken(userLogin.id);
	             res.send({message:  'Logueado',accessToken:token})
	             }
	             catch(err){
	             console.log(err.message);
	             }
```

 - **Listar uno (restaurante):**
 
 ```
 Método: GET
         uri: /restaurantes/:id
            request body parameters:
                none;
            request params:	
                id
Respuesta: 
    
   try{
      let restaurantID = req.params.id;       
      listoneRest = await restaurantDAO.listOne(restaurantID);
      res.send(listoneRest);
   }
   catch(err){
      console.log(err);
   }
```

 - **Edit restaurant:**

```

Método: POST
         uri: /restaurantes/:id
            request body parameters:
                none;
            request params:	
                id
Respuesta: 
    
try{
        if(req.body.idCliente==req.params.id){
            id = req.params.id;        
            restEdit = await restaurantDAO.edit(id,req.body); 
            res.send(restEdit);
            console.log('Id usuario e Id restaurante iguales');
        }else{
            console.log('Id usuario e Id restaurante diferentes');
            res.status(510).send('No estás autorizado a editar este restaurante');
        }

    }
    catch(err){
        console.log(err);
    }
 }

```

 - **Create restaurant:**
 
 
 ```
 Método: POST
         uri: /restaurantes/
            request body parameters:
                id: String,
                name: String,
                email: {
                    type:String,
                    required: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
                    },       
                direccion: String,
                poblacion: String,
                telefono: {
                    type: Number,
                    min: [600000000, 'no válido'],
                    max: [999999999, 'no válido']
                },
                website: String,    
                categoria: String,
                descripcion: String  
                       
Respuesta: 
    
 try{
        const restaurant = await restaurantDAO.create(req.body);
        res.send({message: `${restaurant.id}introducido`})
     }
     catch(err){
        res.status(400).send({message: `MENSAJE DE CREATE RESTAURANT ERROR ${err}`});
        console.log(err);
     }
 ```
