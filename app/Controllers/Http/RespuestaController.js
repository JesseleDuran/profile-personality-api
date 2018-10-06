'use strict'
const Respuesta = use('App/Models/Respuesta')

class RespuestaController {

    async saveRespuesta ({request, response}) {
        const respuestaInfo = request.only(['id_pregunta', 'id_user', 'valor'])

        const respuesta = new Respuesta()
        respuesta.id_pregunta = respuestaInfo.id_pregunta
        respuesta.id_user = respuestaInfo.id_user
        respuesta.valor = respuestaInfo.valor

        try {
            await respuesta.save()
            return response.status(201).json({"respuesta": respuesta})
        } catch (error) {
            return response.status(401).send({"error": error.message})
        }
    }
}

module.exports = RespuestaController
