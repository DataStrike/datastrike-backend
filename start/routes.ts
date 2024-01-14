/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/send', 'KafkaController.sendMessage')

Route.group(() => {
  Route.get('/:provider/redirect', 'UsersController.redirect')
  Route.get('/:provider/callback', 'UsersController.handleCallback')
})

Route.group(() => {
  Route.get('/me', 'UsersController.me')
  Route.get('/logout', 'UsersController.logout')
  Route.post('/teams', 'TeamsController.addTeam')
  Route.post('/teams/:code', 'TeamsController.joinTeam')
  Route.delete('/teams/:code', 'TeamsController.leaveTeam')
  Route.get('/teams', 'TeamsController.getTeams')
  Route.get('/tracker/:teamId', 'TrackerController.getTrackerResults')
  Route.post('/tracker/:teamId', 'TrackerController.addTrackerResults')
}).middleware('auth')
