CRUD Pagos
Este proyecto es un Micro Frontend (MFE) construido con Next.js y TypeScript para consumir y gestionar las entidades de la API de Pagos. Permite a los usuarios visualizar, crear, editar y eliminar pagos y clientes.

Tecnologías Utilizadas en FE
--------------------------------------------
Framework: Next.js 13+

TypeScript

Librería de UI: Material-UI (MUI)

Llamadas a API: Axios

Gestión de Formularios: Formik

Validación de Formularios: Yup

Notificaciones: React-Toastify

Estilos: Tema con Material-UI (MUI)

Prerrequisitos
--------------------------------------------
Instalaciones:

Node.js: Versión 18.x o superior.

Docker y Docker Compose: Para levantar el entorno de la base de datos y la API de backend.

SDK de .NET: Versión 8.x o superior para ejecutar la API de backend.

Git: Para clonar el repositorio.


Guía de Instalación y Puesta en Marcha en entorno local
--------------------------------------------

1. Configuración del Backend (API de Pagos)

git clone https://github.com/Andres-Prog/CRUD_Pagos.git

cd PaymentsAPI

Levantar la base de datos y la API que este frontend consumirá.

navega a su carpeta raíz.

Levanta la Base de Datos con Docker: En la raíz del proyecto del backend, ejecuta el siguiente comando para iniciar el contenedor de PostgreSQL.

docker-compose up -d

Esto creará e iniciará un contenedor con una base de datos PostgreSQL.

Ejecuta la API del Backend: Abre la solución del backend en Visual Studio.

¡IMPORTANTE! La primera vez que ejecutes la API en modo de desarrollo, el sistema aplicará las migraciones y poblará la base de datos automáticamente con datos de prueba(por medio de la clase DataSeeder).

2. Configuración del Frontend

Clona este repositorio y navega a la carpeta del proyecto.

git clone https://github.com/Andres-Prog/CRUD_Pagos_Front.git

cd payments-frontend

Instala las dependencias del proyecto usando npm.

npm install

Crea el archivo de entorno:

Crea un nuevo archivo llamado .env.local en la raíz del proyecto.

Añade la siguiente variable, verificando que el puerto con el que se ejecuta tu API backend coincida:.

NEXT_PUBLIC_API_URL=https://localhost:5001/api

Importante: El prefijo NEXT_PUBLIC_ es fundamental para que Next.js exponga esta variable al navegador.

3. Ejecutar la Aplicación y Probar con el backend y el frontend configurados, ya puedes iniciar la aplicación.

Inicia el servidor de desarrollo del frontend:

npm run dev

Abre tu navegador: Visita http://localhost:3000 para ver la aplicación en funcionamiento.

Inicia Sesión con el Usuario de Prueba:

Email: zarate@example.com

Contraseña: 123456