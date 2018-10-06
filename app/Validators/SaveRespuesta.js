'use strict'

class SaveRespuesta {
  get rules () {
    return {
      'id_pregunta': 'required|integer', 
      'id_user': 'required|integer', 
      'valor': 'required|boolean'
    }
  }
}

module.exports = SaveRespuesta
