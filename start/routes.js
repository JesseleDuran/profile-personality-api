'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/user/register', 'UserController.registerManual').validator('StoreUser')
Route.post('/save/respuesta', 'RespuestaController.saveRespuesta').validator('SaveRespuesta')

Route.get('/get/pregunta/:id_pregunta', 'PreguntaController.getPregunta')

Route.get('/get/resultado/:id_user', 'RespuestaController.calculateResultado')

Route.get('/start/simulator/:cantidad', 'SimulatorController.startSimulator')
