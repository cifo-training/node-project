# API Thesaurus

## 1. Introducció:

La **API Thesaurus** s'ofereix com una eina per tal de repertoriar i localitzar objectes perduts.

## 2. Utilització:

  * <u>API Host</u>: **https://217.61.97.40**

  * <u>Format de la resposta</u>: **JSON**

    Tant pel que fa als casos d'èxit, retornant el document sol·licitat; com en cas d'error, apareixent la indicació de les causes de l'error (en anglès) sota el camp "message".

    Per exemple, en cas de sol·licitar algun recurs a través d'alguna ruta inexistent (desconeguda, com ara, per exemple: GET /ruta/genial/), obtindrem: {"message": "Unknown route"}

  * <u>Autenticació de la API</u>: L' **autenticació** es fa a través del mètode bàsic, assumint que les comunicacions són xifrades i per tant, segures.

    Pel que fa a l'obtenció del __token JWT__ (JSON web token), necessari per tal de poder accedir a la base d'objectes perduts, serà necessari estar registrat prèviament a través d'una petició PUT /user/register (vegeu apartat 3).

    __Nota:__ Tingueu present, a més, que el __token JWT__ no serà operatiu fins que l'administrador de l'API no us validi passant de *false* a *true* el valor del camp ***active*** del vostre registre que teniu com a usuari a la base de dades.

## 3. Descripció dels ***endpoints*** per apartats:

###3.1. Registre

* Mètode: POST
* URI: /user/register
* Body Parameters:
<pre>
    {
        "user":{
            "name": Nom d'usuari (cadena, obligatori). Exemple: "user1",
            "password": Contrasenya (cadena, obligatori). Exemple: "pass1",
            "email": Correu electrònic (cadena, obligatori). Exemple: "user1@correu.com"
        }
    }
</pre>
* Respostes:

200 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "active": false,
    "_id": "5dc7032f618da9139d8da9b4",
    "name": "user",
    "email": "user1@correu.com"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "User already exists in BD"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Missing fields: name password email"
}
</pre>


###3.2. Obtenció del Token JWT

* Mètode: POST
* URI: /user/login
* Header Authorization
* Respostes:

200 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGM3MDY4NTYxOGRhOTEzOWQ4ZGE5YjUiLCJpYXQiOjE1NzMzMjQ0NDYsImV4cCI6MTU3MzMyNjI0Nn0.WNdVWho_jxAwSV68sBk2V1Qw1Fi5lnG4YMiTUJnYXgw",
    "active": false
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Bad credentials"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "User does not exist in DB"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Credentials not supplied"
}
</pre>

403 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Cannot proceed"
}
</pre>


###3.3. Operacions reservades a l'administrador

Si qualsevol de les peticions d'aquest sub-apartat no les formula l'administrador, obtenim una resposta 403.

403 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Not enough grants"
}
</pre>

###3.3.1. Llistar els usuaris registrats

* Mètode: GET
* URI: /user
* Header Authorization: (admin)
* Respostes:

200 - Header: Content-Type: application/json<br />
Body:
<pre>
[
    {
        "_id": "5dc70685618da9139d8da9b5",
        "active": false,
        "name": "user1",
        "email": "user1@email.com"
    },
    {
        "_id": "5dc70917618da9139d8da9b6",
        "active": true,
        "name": "user2",
        "email": "user2@mail.com"
    }
]
</pre>

* Mètode: GET
* URI: /user?active=true
* Header Authorization: (admin)
* Respostes:

200 - Header: Content-Type: application/json<br />
Body:
<pre>
[
    {
        "_id": "5dc70917618da9139d8da9b6",
        "active": true,
        "name": "user2",
        "email": "user2@mail.com"
    }
]
</pre>

* Mètode: GET
* URI: /user?active=false
* Header Authorization: (admin)
* Respostes:

200 - Header: Content-Type: application/json<br />
Body:
<pre>
[
    {
        "_id": "5dc70685618da9139d8da9b5",
        "active": false,
        "name": "user1",
        "email": "user1@email.com"
    }
]
</pre>

###3.3.2. Bloquejar usuaris registrats

* Mètode: PATCH
* URI: /user/down/:id
* Header Authorization: (admin)
* Respostes:

200 - Header: Content-Type: application/json<br />
Body:
<pre>
[
    {
        "_id": "5dc70917618da9139d8da9b6",
        "active": false,
        "name": "user2",
        "email": "user2@mail.com"
    }
]
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "User does not exist in DB"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Bad parameter"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Missing parameter"
}
</pre>

###3.3.3. Desbloquejar usuaris registrats

* Mètode: PATCH
* URI: /user/up/:id
* Header Authorization: (admin)
* Respostes:

200 - Header: Content-Type: application/json<br />
Body:
<pre>
[
    {
        "_id": "5dc70685618da9139d8da9b5",
        "active": true,
        "name": "user1",
        "email": "user1@email.com"
    }
]
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "User does not exist in DB"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Bad parameter"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Missing parameter"
}
</pre>

###3.3.4. Modificar usuaris registrats

* Mètode: PUT
* URI: /user/:id
* Header Authorization: (admin)
* Body Parameters:
<pre>
    {
        "user":{
            "name": Nom d'usuari (cadena, obligatori). Exemple: "user1",
            "password": Contrasenya (cadena, obligatori). Exemple: "pass1",
            "email": Correu electrònic (cadena, obligatori). Exemple: "user1@correu.com"
        }
    }
</pre>
* Respostes:

200 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "_id": "5dc70685618da9139d8da9b5",
    "active": true,
    "name": "user1",
    "email": "user1@mail.com"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "User not found"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Missing fields"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Bad parameter"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Missing parameter"
}
</pre>

###3.3.5. Donar de baixa usuaris registrats

* Mètode: DELETE
* URI: /user/:id
* Header Authorization: (admin)
* Respostes:

200 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "User successfully deleted: user1"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "User not found"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Bad parameter"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Missing parameter"
}
</pre>

###3.4. Operacions reservades a l'usuari autoritzat

Aquestes operacions només podran dur-se terme mitjançant el __token JWT__. Ni tant sols estaran a l'abast de l'administrador, connectat per mètode bàsic (l'Administrador sempre podrà crear-se i autoritzar un usuari registrat).

###3.4.1. Visualització de dades personals

* Mètode: GET
* URI: /user/me
* Respostes:

200 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "_id": "5dc70917618da9139d8da9b6",
    "active": true,
    "name": "user2",
    "email": "user2@mail.com"
}
</pre>

###3.4.2. Modificació de dades personals

* Mètode: PUT
* URI: /user/:id
* Respostes:

200 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "_id": "5dc70917618da9139d8da9b6",
    "active": true,
    "name": "user2",
    "email": "user2@email.com"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "User not found"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Missing fields"
}
</pre>

###3.4.3. Creació del registre d'objecte perdut

* Mètode: POST
* URI: /thesaurus
* Body Parameters:
<pre>
    {
        "thesaurus":{
            "object": Nom de l'objecte (cadena, obligatori). Exemple: "Bossa",
            "description": Descripció de l'objecte (cadena). Exemple: "Contingut: ulleres de sol, llibreta",
            "found": Data de la troballa (cadena, obligatori, format AAAAMMDDHHMM). Exemple: "201911110900",
            "stored": Referència d'emmagatzematge (cadena, obligatori). Exemple: "5552/41",
            "weight": Pes (decimal -en gr.). Exemple: "250.0",
            "height": Alçada (decimal -en cm.). Exemple: "25.0",
            "length": Longitut (decimal -en cm.). Exemple: "27.0",
            "weight": Amplitut (decimal -en cm.). Exemple: "1.5",
            "contact": Responsable de la gestió (cadena, obligatori). Exemple: "Oficina B"
        }
    }
</pre>
* Respostes:

200 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "_id": "5dc8391a5615b50b6a089c33",
    "object": "Bossa",
    "description": "Contingut: unes ulleres de sol, una llibreta",
    "found": "201911110900",
    "stored": "ABC-123",
    "weight": "150.5",
    "contact": "Oficina B"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Missing data"
}
</pre>

###3.4.4. Visualització d'objectes perduts

* Mètode: GET
* URI: /thesaurus
* Respostes:

200 - Header: Content-Type: application/json<br />
Body:
<pre>
[
    {
        "_id": "5dc6df44cea0fc0638b51d0e",
        "object": "Bossa color negre",
        "found": "201911091600",
        "stored": "Magatzem B 13/151",
        "contact": "Oficina A",
        "description": "Llamborda, 1 paquet de menjar per a gos",
        "weight": {
            "$numberDecimal": "13.8"
        }
    },
    {
        "_id": "5dc6df6bcea0fc0638b51d0f",
        "object": "Pilota",
        "found": "201911091610",
        "stored": "Magatzem B 13/152",
        "contact": "Oficina A"
    },
    {
        "_id": "5dc8391a5615b50b6a089c33",
        "object": "Bossa",
        "description": "Contingut: unes ulleres de sol, una llibreta",
        "found": "201911110900",
        "stored": "ABC-123",
        "weight": {
            "$numberDecimal": "150.5"
        },
        "contact": "Oficina B"
    }
]
</pre>

###3.4.5. Visualització d'un objecte perdut

* Mètode: GET
* URI: /thesaurus/:id
* Respostes:

200 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "_id": "5dc8391a5615b50b6a089c33",
    "object": "Bossa",
    "description": "Contingut: unes ulleres de sol, una llibreta",
    "found": "201911110900",
    "stored": "ABC-123",
    "weight": "150.5",
    "contact": "Oficina B"
}
</pre>

404 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Object not found"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Bad parameter"
}
</pre>

###3.4.6. Modificació del registre d'objecte perdut

* Mètode: PUT
* URI: /thesaurus/:id
* Body Parameters:
<pre>
    {
        "thesaurus":{
            "object": Nom de l'objecte (cadena, obligatori). Exemple: "Bossa",
            "description": Descripció de l'objecte (cadena). Exemple: "Contingut: ulleres de sol, llibreta",
            "found": Data de la troballa (cadena, obligatori, format AAAAMMDDHHMM). Exemple: "201911110900",
            "stored": Referència d'emmagatzematge (cadena, obligatori). Exemple: "5552/41",
            "weight": Pes (decimal -en gr.). Exemple: "250.0",
            "height": Alçada (decimal -en cm.). Exemple: "25.0",
            "length": Longitut (decimal -en cm.). Exemple: "27.0",
            "weight": Amplitut (decimal -en cm.). Exemple: "1.5",
            "contact": Responsable de la gestió (cadena, obligatori). Exemple: "Oficina B"
        }
    }
* Respostes:

200 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "_id": "5dc8391a5615b50b6a089c33",
    "object": "Bossa",
    "description": "Contingut: unes ulleres de sol, una llibreta",
    "found": "201911110900",
    "stored": "ABC-123",
    "weight": "150.5",
    "contact": "Oficina B"
}
</pre>

404 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Object not found"
}
</pre>

500 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Nothing to be changed"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Bad parameter"
}
</pre>

###3.4.7. Esborrat d'un objecte perdut

* Mètode: DELETE
* URI: /thesaurus/:id
* Respostes:

200 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Object successfully deleted: Bossa"
}
</pre>

400 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Bad parameter"
}
</pre>

404 - Header: Content-Type: application/json<br />
Body:
<pre>
{
    "message": "Object identifier does not exist"
}
</pre>

## 4. Dades de prova:

