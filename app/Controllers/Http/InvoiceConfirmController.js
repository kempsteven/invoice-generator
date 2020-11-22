'use strict'
const sendGrid = use('App/Common/SendGrid')

class InvoiceConfirmController {
  async index({ request, response, view }) { 
    await sendGrid(
      'sayson2154@gmail.com',
      'Invoice Generation - Confirmation',
      [],
      view.render('invoice-confirm')
    )

    return 'Confirmation sent!'
  }
}

module.exports = InvoiceConfirmController
