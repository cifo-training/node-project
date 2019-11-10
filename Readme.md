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



__API Rest funcional__:  Heroku: https://thetraktor-api.herokuapp.com/

Repo Private Github: https://github.com/ArmandoRodGo/thetraktor-api 

Region Europe

Stack heroku-18

Framework Node.js

Slug Size
23.2 MiB of 500 MiB

GitHub Repo  ArmandoRodGo/thetraktor-api

Heroku Git URL https://git.heroku.com/thetraktor-api.git


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

[![Home](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_Home.png)](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_Home.png)

### Login Page

[![login](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_Login.png)](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_Login.png)

[![loging](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_Logging.png)](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_Logging.png)
### Errors Validation Login Page

#### Invalid Email

[![login Invalid Email](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_Validation-Invalid-login1.png)](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_Validation-Invalid-login1.png)

#### Unauthorized

[![login Unauthorized](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_Validation-Unauthorized-login.png)](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_Validation-Unauthorized-login.png)

### Pagina principal Logged

[![Home Logged](https://github.com/neollob/node-project/blob/master/readme-imgs/home-logged.png)](https://github.com/neollob/node-project/blob/master/readme-imgs/home-logged.png)


### Listado de clientes

[![Listado de clientes](https://github.com/neollob/node-project/blob/master/readme-imgs/Customers.png)](https://github.com/neollob/node-project/blob/master/readme-imgs/Customers.png)

### Detalle de cliente

[![Detalle de cliente](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_Customer-detail.png)](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_Customer-detail.png)

### Edición de cliente

[![Edición de cliente](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_edit-customer.png)](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_edit-customer.png)

### Alta de cliente

[![Alta de cliente](https://github.com/neollob/node-project/blob/master/readme-imgs/Create-customer.png)](https://github.com/neollob/node-project/blob/master/readme-imgs/Create-customer.png)

[![Alta de cliente1](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_creating-customer1.png)](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_creating-customer1.png)

[![Alta de cliente2](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_creating-customer2.png)](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_creating-customer2.png)

### Listado de Planes

[![Producto: Planes](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_Products-Plans.png)](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_Products-Plans.png)

### Sección ToDo (Tareas desarrollo - estado)

[![Demanda de stock](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_Todo-section.png)](https://github.com/neollob/node-project/blob/master/readme-imgs/admin.thetraktor.com_(iPad)_Todo-section.png)


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


