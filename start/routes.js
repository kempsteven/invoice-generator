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
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('/warm-up', ({ response }) => {
    return response.status(200).send('Server Warmed Up!')
  })
  
  Route.get('invoice-generations', 'InvoiceGenerationController.index')
  Route.get('invoice-confirm', 'InvoiceConfirmController.index')
}).middleware(['private'])
