# Tienda
Este es un proyecto de ecommerce básico que se utiliza para el curso de backend. La aplicación permite ver una lista de productos genéricos y realizar compras en línea. Los productos y las órdenes de compra se almacenan en MongoDb.

## Tecnologías utilizadas
- Node
- Express
- Passport
- MongoDb
- Handlebars

## Funcionalidades
- Ver una lista de productos disponibles
- Agregar productos al carrito de compras
- Ver el carrito de compras
- Realizar una orden de compra

## Instalación

### Para instalar y ejecutar la aplicación en tu máquina local, sigue los siguientes pasos:

1. Clona el repositorio a tu máquina local.
2. Abre una terminal en el directorio del proyecto.
3. Ejecuta el comando npm install para instalar las dependencias.
4. Ejecuta el comando npm run dev para iniciar la aplicación.
5. Abre tu navegador y navega a http://localhost:4000 para ver la aplicación en acción.

## Pasos para utilizar la app

1. Cuenta de administrador: admin@admin.cl / admin
2. Cuenta de usuario: usuario@usuario.cl / usuario
3. El administrador tiene acceso al perfil y a crud de productos, en cambio el usuario puede ver el listado de productos y también hacer compras.
4. En esta parte de la app, a través de postman se puede agregar productos al carrito
5. Luego para poder acceder a la compra y generar un ticket, se debe ingresar a la app por el navegador con la cuenta de usuario y agregar la siguiente url: http://localhost:4000/carts/cid/purchase
6. De esta manera se generará el ticket y se agregará a la base de datos en Mongo Db

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para obtener más información.