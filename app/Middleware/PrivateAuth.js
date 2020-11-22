'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Env = use('Env')

class PrivateAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response }, next) {
    const privateKey = Env.get('PRIVATE_KEY')
    const validIps = Env.get('VALID_IPS').split(',')
    const requestPrivateKey = request.get().privateKey
    const ip = request.ip()

    if (!validIps.includes(ip) || privateKey !== requestPrivateKey) { 
      return response.status(400).send({
        message: 'Authentication Failed.'
      }) 
    }

    await next()
  }
}

module.exports = PrivateAuth
