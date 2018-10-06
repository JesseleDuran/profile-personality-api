'use strict'

class StoreUser {
  get rules () {
    return {
      'cedula': 'required|integer|unique:users',
      'genero': 'required|string', 
      'fecha_nacimiento': 'required|date', 
      'edad': 'required|integer', 
      'pais': 'required|string', 
      'estado_nacimiento': 'required|string', 
      'ciudad_nacimiento': 'required|string', 
      'profesion': 'required|string', 
      'is_casado': 'required|boolean', 
      'is_trabaja': 'required|boolean', 
      'is_vive_padres': 'required|boolean', 
      'have_hermanos': 'required|boolean', 
      'cantidad_hermanos':'required_when:have_hermanos|integer'
    }
  }
}

module.exports = StoreUser
