'use strict'

class InvoiceGenerationController {
  index({ response }) {
    console.log('supriseeee motherfuckaaaaah')
    return response.send({
      hell: 'yeah'
    })
  }
}

module.exports = InvoiceGenerationController
