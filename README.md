# Sistema de Inventarios

## Descripción

Esta es una aplicación de Inventarios que utiliza Spring con Java para el backend y Angular para el frontend. Se trata de una aplicación web diseñada para almacenar y administrar información de productos de inventarario. La aplicación ofrece a los usuarios la capacidad de registrar, editar y eliminar productos según sea necesario.

## Características

- **Registro de productos**: Los usuarios pueden registrar nuevos productos con detalles como el descripcion, precio y existencia (Stock).

## Tecnologías utilizadas

- Java 21 (JDK 21)
- Spring Boot
- Hibernate
- JPA
- MySQL
- Angular
- Css + Boostrap

## Herramientas de desarrollo

- IntelliJ IDEA 2023.2.4: utilizado para el desarrollo del backend.
- Visual Studio Code 1.85.1: utilizado para el desarrollo del frontend.
- MySQL Workbench 8.0: utilizado para consultas y pruebas con la Base de datos.

## Cómo ejecutar la aplicación

1. Clona el repositorio en tu máquina local usando `git clone [url-del-repositorio]`.

2. Navega a la carpeta del proyecto usando `cd inventarios-project`.

3. Para el backend:
   - Navega a la carpeta `inventarios-spring` con `cd inventarios-spring`.
   - Ejecuta la aplicación Spring Boot con el comando apropiado para tu IDE o build tool (por ejemplo, `mvn spring-boot:run` para Maven).

4. Para el frontend:
   - Navega a la carpeta `inventarios-angular` con `cd ../inventarios-angular`.
   - Instala las dependencias con `npm install`.
   - Inicia la aplicación React con `npm start`.

La aplicación ahora debería estar ejecutándose en tu máquina local.

**Nota**: Al ejecutar la aplicación, la base de datos y sus tablas se generarán automáticamente.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir lo que te gustaría cambiar o envía un pull request.

## Estado del Proyecto

Este proyecto está actualmente en desarrollo. Las funcionalidades básicas para el registro y la gestión de productos ya están implementadas. 

Los próximos pasos incluyen:

- Implementar la autenticación de usuarios.
- Añadir la capacidad de categorizar productos.
- Mejorar la interfaz de usuario para una mejor experiencia de usuario.

Por favor, ten en cuenta que este proyecto está sujeto a cambios y mejoras continuas. 