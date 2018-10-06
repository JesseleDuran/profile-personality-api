'use strict'
const User = use('App/Models/User')

class UserController {

    async registerManual ({request, response}) {
        const userInfo = request.only(['cedula', 'genero', 'fecha_nacimiento', 'edad', 'pais', 'estado_nacimiento', 
        'ciudad_nacimiento', 'profesion', 'is_casado', 'is_trabaja', 'is_vive_padres', 'have_hermanos', 'cantidad_hermanos'])

        const user = new User()
        user.cedula = userInfo.cedula
        user.genero = userInfo.genero
        user.fecha_nacimiento = userInfo.fecha_nacimiento
        user.edad = userInfo.edad
        user.pais = userInfo.pais
        user.estado_nacimiento = userInfo.estado_nacimiento
        user.ciudad_nacimiento = userInfo.ciudad_nacimiento
        user.profesion = userInfo.profesion
        user.is_casado = userInfo.is_casado
        user.is_trabaja = userInfo.is_trabaja
        user.is_vive_padres = userInfo.is_vive_padres
        user.have_hermanos = userInfo.have_hermanos
        user.cantidad_hermanos = userInfo.cantidad_hermanos

        try {
            await user.save()
            return response.status(201).json({"user": user})
        } catch (error) {
            return response.status(401).send({"error": error.message})
        }
    }
}

module.exports = UserController
