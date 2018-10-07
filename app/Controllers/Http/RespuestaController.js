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

    async calculateResultado ({response, params}) {
        const idUser = params.id_user

        const respuestas = await Respuesta
        .query()
        .where('id_user', idUser)
        .innerJoin('tests', 'respuesta.id_pregunta', 'tests.id_pregunta')
        .fetch()
        //object to array
        var array = Object.values(respuestas)

        //count how many true of every 'tipo_test' are
        var tipoTestMap = new Object()
        array[0].forEach(function(item) {
            var tipo_test = item['tipo_test']
            if (tipoTestMap[tipo_test] == null) {
                item['valor'] = 1
                tipoTestMap[tipo_test] = item
            } else { 
                if(item['valor']) {
                    tipoTestMap[tipo_test]['valor'] += 1
                }    
            }
        })

        //result to array
        var result = [];
        for (var key in tipoTestMap) {
            if (tipoTestMap.hasOwnProperty(key)) {
                result.push(tipoTestMap[key]);
            }
        }

        //array just with values
        var onlyValues = result.map(x => x.valor)
        //index of higher value
        let i = onlyValues.indexOf(Math.max(...onlyValues))

        try {
            return response.status(201).json(result[i])
        } catch (error) {
            return response.status(401).send({"error": error.message})
        }
    }

}

module.exports = RespuestaController
