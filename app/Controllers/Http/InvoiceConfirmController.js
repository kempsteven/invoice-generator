'use strict'
const sendGrid = use('App/Common/SendGrid')
const Env = use('Env')

class InvoiceConfirmController {
  async index({ request, response, view }) { 
    const sendToEmail = Env.get('SEND_TO_EMAIL')
    await sendGrid(
      sendToEmail,
      'Invoice Generation - Confirmation',
      [],
      view.render('invoice-confirm')
    )

    return 'Confirmation sent!'
  }
}

module.exports = InvoiceConfirmController
