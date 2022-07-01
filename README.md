# APP Cancha PicAPPdito

Alumnos: Felicitas Melino, Matías Imoff, Santiago Valiño.
Curso: 2do 1er D Belgrano

La aplicación es un sistema de gestión de reservas de canchas. Contamos con regitro e ingreso de ususariios y gestión de sus reservas.
También con varios endpoint para manejo de las canchas, turnos y las diferentes reservas y usuarios.


# Canchas:: 

- Todas las canchas: GET /canchas 
- Alta de una cancha: POST /cancha (dentro del código)
- Borrar una cancha: DELETE /canchas/:id
- Bucar una cancha: GET /canchas/:id
- Modificar tamaño de cancha: PUT /canchas/size/:nro
- Modificar nombre de cancha: PUT /canchas/modificarNombre/:id
- Modificar precio de cancha: PUT /canchas/modificarPrecio/:id


# Reservas:

- Todas las reservas: GET /reservas
- Una reserva: GET /reservas/:id
- Agregar reserva: POST /reservas
http://localhost:3000/reservas/ (se pasan los datos por Body)
Body 
{
    "idCancha": {
        "$oid": "62bcefe46dbb7437c849b5ae"
    },
    "fecha": "29-06-2022 17",
    "email": "matias@gmial.com"
}

- Reservas por cancha: GET /reservas/filtrar/:id
- Borrar una reserva: DELETE /reservas/borrarReserva/:id
- Borrar todas las reservas: DELETE /reservas/borrarReservas
- Traer una reserva por facha y hora: GET /reservas/fecha

# Usuarios:

- Todos los ususarios GET /users requiriendo token
- Alta usuario POST /users (se psasn los datos por Body)
- LogIn POST /users/logIn (se pasan los datos por body)
- Reservas de usuario GET /users/misReservas/:email
- Actualización de contraseña PUT /users/update (datos por body)
- Borrar un usuario DELETE /users/deleteUsuario/:id



