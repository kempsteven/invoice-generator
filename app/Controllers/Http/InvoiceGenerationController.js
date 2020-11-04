'use strict'

class InvoiceGenerationController {
  index({ request, response }) {
    const ip = request.ip()
    console.log('ippppp', ip)
    return response.send({
      hell: 'yeah'
    })
  }
}

module.exports = InvoiceGenerationController
