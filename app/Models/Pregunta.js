'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pregunta extends Model {

    static get table () {
        return 'tests'
    }

    static get primaryKey () {
        return 'id_pregunta'
    }
    
    static get createdAtColumn () {
        return null
    }
    
    static get updatedAtColumn () {
        return null
    }
}

module.exports = Pregunta
