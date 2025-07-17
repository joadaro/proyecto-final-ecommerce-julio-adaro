# TALENTO TECH 2025
- ***Curso:*** API REST en NODE.js con Express.js
- ***Asunto:*** Proyecto Final Talento Tech 2025
- ***Autor:*** Julio Oscar Adaro
- ***Año:*** 2025
--------------------------------------------------
<details>
<summary><b>Descripción del Proyecto Final</b></summary><br>

## Descripción
El objetivo del proyecto es diseñar, desarrollar  desplegar una API RESTful funcional que permita gestionar los productos de una tienda en línea o E-Commerce. Este sistema debe permitir a los usuarios autorizados a realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los productos de la tienda y tener la capacidad de almacenar los datos tanto de manera local (JSON) como en la nube (Firebase/Firestore). El desarrollo de este proyecto te permitirá implementar todos los conocimientos adquiridos a lo largo de la cursada y sin dudas plantará algunas semillas para que sigas investigando y aprendiendo sobre el mundo backend y su enorme cantidad de alternativas y aplicaciones en el mundo del desarrollo web.

**El proyecto consistirá en:**
1. Construir un servidor web utilizando Node.js y Express.js.
2. Implementar una estructura de proyecto modular y organizada basada en los principios de arquitectura RESTful.
3. Integrar el manejo de datos mediante archivos JSON y, posteriormente, conectarlo con un servicio de base de datos en la nube (Firestore)
4. Asegurar la correcta comunicación entre cliente y servidor mediante métodos y códigos HTTP.
5. Crear y configurar capas lógicas de seguridad y autenticación.
6. Desplegar el proyecto en un entorno de producción funcional, accesible mediante una URL pública.

### Requerimientos específicos:
1. Estructura del proyecto
    - Crear una estructura clara con las siguientes carpetas principales:
        - /controllers: Contendrá la lógica del negocio.
        - /models: Definirá la estructura de los datos.
        - /routes: Definirá las rutas de acceso a la API.
        - /services: Gestionará el acceso de datos y la interacción con la base de datos.
        - /public: Archivos estáticos (opcional).
2. Funcionalidades
    - Gestión de productos:
        - Crear nuevos productos para la tienda.
        - Listar, filtrar, buscar y cualquier acción de consulta sobre el listado de productos.
        - Actualizar parcial o totalmente un producto.
        - Eliminar productos mediante id.
    - Manejo de errores: Implementar controladores de errores para manejar respuestas adecuadas en caso de solicitudes inválidas o fallas del servidor.
    - CORS: Configuración para permitir solicitudes desde diferentes dominios.
3. Seguridad
    - Autenticación y Autorización: Validar el acceso de los usuarios registrados mediante el uso de JWT y tokens.
4. Base de datos
    - Acceso inicial a los datos utilizando un archivo JSON.
    - Migrar el manejo de datos a Firebase/Firestore, implementando un servicio para consumir esta base de datos.
5. Despliegue
    - Subir la API a un servicio de producción como Vercel, Railway, entre otros.

### Funcionalidad Esperada:
- La API debe responder correctamente a los métodos HTTP (GET, POST, PUT, PATCH, DELETE).
- La API debe devolver los productos o el producto seleccionado.
- Las rutas definidas deben ser claras y tener una responsabilidad única.
- El sistema debe manejar errores comunes (404, 500) y debe devolver mensajes claros y escriptivos.
- Los datos deben almacenarse y recuperarse correctamente desde la base de datos local (JSON) y la nube (Firestore).
- La API debe permitir el uso de la herramienta solo a usuarios autorizados y autenticados.

### Entrega del Proyecto:
- Formato de Entrega: El proyecto debe ser subido a un repositorio de GitHub. Se deberá compartir el enlace del repositorio en el aula virtual antes de la fecha límite.
- Nombre del Repositorio: proyecto-final-ecommerce-[nombre-apellido]
- Documentación: El archivo README.md debe estar incluido en el repositorio, explicando claramente el objetivo del proyecto, las tecnologías utilizadas, cómo configurarlo y cualquier otro detalle relevante.

### Evaluación:
1. Organización del Código:
    - Estructura modular y limpieza del código.
    - Uso adecuado de las capas de la aplicación: controladores, modelos, rutas y servicios.
2. Funcionalidad:
    - Cumplimiento de los requerimientos funcionales.
    - Correcto manejo de datos en JSON y Firestore.
3. Manejo de Errores:
    - Implementación de controladores de errores y códigos HTTP adecuados.
4. Documentación:
    - Claridad en la descripción y alcance del proyecto y cómo ejecutarlo en el README principal del repositorio remoto.
5. Despliegue:
    - La API debe estar accesible mediante una URL pública.
- - -
### Notas Adicionales:
- ***Originalidad:*** Se espera que el proyecto final sea un trabajo original del estudiante. La copia o el uso de proyectos preexistentes será motivo de descalificación.
- ***Presentación:*** Los estudiantes deben presentar su proyecto, explicando su arquitectura, decisiones técnicas y desafíos enfrentados.
- ***Soporte:*** Durante el desarrollo del proyecto, los estudiantes podrán hacer preguntas durante las clases destinadas a la resolución de dudas, donde se les proporcionará asistencia técnica y orientación.
- - -
</details   >
<details>
<summary><b>Premisa del Proyecto</b></summary><br>

## Premisa
Actualmente nuestro cliente tiene diversos productos en catálogo y precisa disponer de una API Rest desde donde su tienda oficial pueda administrarlos, habilitando la posibilidad de Leer, Crear, Actualizar y Eliminar la información sobre los productos.
La aplicación debe contar con una capa de autenticación para resguardad la seguridad de los datos que estarán alojados en una base de datos en la nube mediante el servicio Firestore de Firebase.


> *Es importante definir una arquitectura escalable, separando las distintas responsabilidades de la aplicación en capas que permitan establecer rutas, controladores, servicios y modelos de forma clara y prolija, además de las carpetas necesarias para guardar middlewares y configuración a servicios externos.*

Finalmente, la aplicación debe contemplar el manejo de errores de forma clara, teniendo en cuenta fallos del tipo 404 para rutas no definidas, los estados 401 y 403 ante errores de autenticación y códigos de estado 400 y 500 cuando las peticiones contienen errores o nuestros servicios externos de datos no responden.

### Requerimientos del Proyecto:

#### Requerimiento #1: Configuración Inicial

- Crea un directorio donde alojarás tu proyecto e incluye un archivo index.js como punto de entrada.
- Inicia Node.js y configura npm usando el comando npm init -y.
- Agrega la propiedad "type": "module" en el archivo package.json para habilitar ESModules.
- Configura un script llamado start para ejecutar el programa con el comando npm run start.

#### Requerimiento #2: Instalación de dependencias

- Instala express, cors, body-parser, dotenv, firebase y jsonwebtoken como dependencias del proyecto.

#### Requerimiento #3: Configuración del servidor

- Crea un servidor web con express y realiza su configuración en el archivo index.js.
- Configura CORS para habilitar las peticiones de origen cruzado, así las aplicaciones Frontend de la empresa pueden consultar al servicio sin problemas.
- Configura el middleware global de body-parser para interpretar los body en formato JSON de las peticiones.
- Establece un middleware que maneje las rutas desconocidas, devolviendo el estado 404 y un mensaje.
- Crea un archivo .env donde se alojarán las variables de entorno del proyecto.

#### Requerimiento #4: Rutas

- Crea la capa de rutas del proyecto.
- Establece las rutas necesarias para atender las peticiones que interactúan con productos, así como también la ruta de login para autenticar usuarios:
    - products.routes.js:
        - GET /api/products devuelve todos los productos.
        - GET /api/products/:id devuelve el producto con el ID indicado.
        - POST /api/products/create recibe en el cuerpo (body) de la petición la información sobre el nuevo producto para ser guardado en el servicio de datos en la nube.
        - DELETE /api/products/:id elimina el producto con el ID indicado.
    - auth.routes.js:
        - POST /auth/login recibe las credenciales de usuario en el cuerpo (body) de la petición y devuelve el Bearer token si son válidas o un error de autenticación en caso contrario.

#### Requerimiento #5: Controladores y Servicios

- Crea la capa de controladores para cada una de las rutas establecidas en el requerimiento anterior.
- Crea la capa de servicios para atender a cada uno de los controladores.

#### Requerimiento #6: Acceso a los datos

- Crea la capa de modelos de la aplicación.
- Crea un nuevo proyecto de Firestore en Firebase, agrega una colección para registrar nuevos productos y crea el primer documento de producto para darle estructura y tipos de datos.
- Configura y conecta Firebase en el proyecto.
- Utiliza la instancia de Firebase creada y crea los métodos necesarios para que el modelo pueda interactuar con la base de datos remota.
- Conecta los servicios con los modelos.

#### Requerimiento #7: Protege tus rutas

- Configura JWT en el proyecto.
- Crea un middleware de autenticación y protege las rutas correspondientes.
- Agrega la lógica necesaria en la en controlador de login para validar la identidad del usuario y devolver un Bearer Token.

#### Requerimiento #8: Despliegue a producción
- Configura tu archivo vercel.json
- Crea un nuevo proyecto en vercel
- Despliega tu proyecto a producción
</details>

--------------------------------------------------

## Documentación
### Acerca de esta API
El desarrollo de la API está basado en el trabajo de comisionista en el rubro calzado e indumentaria. Su uso está pensado para el manejo de datos de productos cuya compra es solicitada por revendedores. Los productos pueden ser cargados tanto por quien trabaja en comisión como por los revendedores que encargan la tarea de comprar los productos a su comisionista bajo la comisión establecida por cada producto comprado de acuerdo a su categoría, tipo de producto y precio.
A su vez se encuentra cargada una pequeña base de datos de las comisiones fijadas que será utilizada para incrustar por código las que correspondan al producto requerido sin necesidad de que éste sea ingresado por quien carga los datos.

Instalación
