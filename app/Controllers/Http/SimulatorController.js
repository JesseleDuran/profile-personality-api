'use strict'
const User = use('App/Models/User')
const Database = use('Database')
const Respuesta = use('App/Models/Respuesta')
const faker = use('faker')
const moment = use('moment')
var knex = use('knex')
var _ = use('lodash')

class SimulatorController {

    //probabilidad
    async startSimulator ({response, params}) {
        const cantidad = params.cantidad

        //array de posibles valores de respuestas
        var valorList = [0, 1]
        var valorGeneroList = ['F', 'M']
        const valor0Probability = await this.getProbability('id_pregunta', 0, 'respuesta')
        const valor1Probability = await this.getProbability('id_pregunta', 1, 'respuesta')
        const valorFProbability = await this.getProbability('genero', 'F', 'users')
        const valorMProbability = await this.getProbability('genero', 'M', 'users')
        const valorWeight = [valor0Probability, valor1Probability]
        const valorGeneroWeight = [valorFProbability, valorMProbability]
        for (var i = 0; i < cantidad; i++) {
            var weighed_list_genero = await this.generateWeighedList(valorGeneroList, valorGeneroWeight)
            var random_num_genero = await this.rand(0, weighed_list_genero.length-1)
            var user = new User()
                
            user.cedula = faker.random.number
            user.genero = weighed_list_genero[random_num_genero]
            user.fecha_nacimiento = faker.date.past
            user.edad = Math.random() * (80 - 15) + 15
            user.pais = faker.address.country
            user.estado_nacimiento = faker.address.state
            user.ciudad_nacimiento = faker.address.city
            user.profesion = faker.name.jobTitle
            user.is_casado = faker.random.boolean
            user.is_trabaja = faker.random.boolean
            user.is_vive_padres = faker.random.boolean
            user.have_hermanos = faker.random.boolean
            user.cantidad_hermanos = Math.random() * (4 - 1) + 1
            try {
                await user.save()
            } catch (error) {
                for (var i = 1; i <= 81; i++) {
                        var weighed_list = await this.generateWeighedList(valorList, valorWeight)
                        var random_num = await this.rand(0, weighed_list.length-1)
    
                        var respuesta = new Respuesta()
                        respuesta.id_pregunta = i
                        respuesta.id_user = user.id
                        respuesta.valor = weighed_list[random_num]
                        await respuesta.save()
                }
            }         
        }
        return response.status(201).json({"success": true})
    }

    async startSimulator2({response, params}) {
        const cantidad = params.cantidad
        for (var i = 0; i < cantidad; i++) {
            var user = new User()
            var date = faker.date.between('1950-01-01', '2000-12-31')
            var date2 = moment(date).format('YYYY/MM/DD')

            user.cedula = faker.random.number({
                'min': 10000000,
                'max': 50000000
            })
            user.genero = 'M'
            user.fecha_nacimiento = date2
            user.edad = faker.random.number({
                'min': 16,
                'max': 60
            })
            user.pais = faker.address.country()
            user.estado_nacimiento = faker.address.state()
            user.ciudad_nacimiento = faker.address.city()
            user.profesion = faker.name.jobTitle()
            user.is_casado = faker.random.boolean()
            user.is_trabaja = faker.random.boolean()
            user.is_vive_padres = faker.random.boolean()
            user.have_hermanos = faker.random.boolean()
            user.cantidad_hermanos = faker.random.number({
                'min': 1,
                'max': 5
            })
            await user.save()
            for (var i = 1; i <= 81; i++) {
                var respuesta = new Respuesta()
                respuesta.id_pregunta = i
                respuesta.id_user = user.id
                respuesta.valor = faker.random.number({
                    'min': 0,
                    'max': 1
                })
                await respuesta.save()
            }
        }
        try {
            return response.status(201).json({"success": true})
        } catch (error) {
            return response.status(401).send({"error": error.message})
        }
    }

    async rand(min, max) {
        const result =  Math.floor(Math.random() * (max - min + 1)) + min
        return await result
    }

    async generateWeighedList(list, weight) {
         
        var weighed_list = [];  
        // Loop over weights
        for (var i = 0; i < weight.length; i++) {
            var multiples = weight[i] * 100
                 
            // Loop over the list of items
            for (var j = 0; j < multiples; j++) {
                weighed_list.push(list[i])
            }
        }   
        return await weighed_list
    }

    // favorableCases/total
    async getProbability (atributo, valor, model) {

        const countTotal = await Database
        .from(model)
        .getCount()
        const favorableCases = await this.countFavorableCase(atributo, valor, model)
        const probability = (parseFloat(favorableCases)/parseFloat(countTotal))

        return probability
    }

    //cuantas veces aparece 'atributo' con 'valor'
    async countFavorableCase(atributo, valor, model) {

        const countFavCases = await Database
        .from(model)
        .where(atributo, valor)
        .getCount()
        
        return await countFavCases
    }

    async makeCube({response, request}) {
        var rules = request.post()
        var rulesArray = _.values(rules)
   
        var idsArray = rulesArray.map(function(x) {
            return x.id;
        })

        var idsString = idsArray.toString()

        var result = await Database
            .table('respuesta')
            .select(knex.raw(idsString))
            .innerJoin('users', 'users.id', 'respuesta.id_user')
            .innerJoin('tests', 'tests.id_pregunta', 'respuesta.id_pregunta')
            .groupByRaw(idsString)
            .count('* as total')

        try {
            return await response.status(201).json(result)
        } catch (error) {
            return await response.status(401).send({"error": error.message})
        }
    }
}

module.exports = SimulatorController
