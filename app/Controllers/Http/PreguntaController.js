'use strict'

const Pregunta = use('App/Models/Pregunta')
class PreguntaController {

    async getPregunta ({params, response}) {
        const pregunta = await Pregunta.find(params.id_pregunta)
        return response.json(pregunta)
    }
}

module.exports = PreguntaController
