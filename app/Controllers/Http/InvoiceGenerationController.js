'use strict'
const Env = use('Env')

class InvoiceGenerationController {
  index({ request, response }) {
    const privateKey = Env.get('PRIVATE_KEY')
    const privateKey = request.get().privateKey

    const ip = request.ip()
    const cronJobIps = [
      '195.201.26.157',
      '116.203.134.67',
      '116.203.129.16'
    ]

    console.log('!cronJobIps.includes(ip)', !cronJobIps.includes(ip))
    console.log('privateKey !== privateKey', privateKey !== privateKey)

    if (!cronJobIps.includes(ip) || privateKey !== privateKey) { 
      return response.status(400).send({
        message: 'Authentication Failed.'
      }) 
    }

    console.log('ippppp', ip)
    return response.send({
      hell: 'yeah'
    })
  }
}

module.exports = InvoiceGenerationController
