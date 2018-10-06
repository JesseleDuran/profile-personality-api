'use strict'

const Model = use('Model')

class Respuesta extends Model {

    static get table () {
        return 'respuesta'
    }
    
    static get createdAtColumn () {
        return null
    }
    
    static get updatedAtColumn () {
        return null
    }
}

module.exports = Respuesta
