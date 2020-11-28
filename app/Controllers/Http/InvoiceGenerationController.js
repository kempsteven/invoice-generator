'use strict'
const InvoiceGeneration = use('App/Models/InvoiceGeneration')

class InvoiceGenerationController {
  async index({ request, response, view }) {
    try {
      const pdfData = InvoiceGeneration.getPdfData(request)
      const pdfTemplate = view.render('invoice-template', pdfData)
      const base64File = await InvoiceGeneration.generatePdf(pdfTemplate)
      await InvoiceGeneration.sendEmail(base64File, pdfData.invoiceNumber)
  
      return 'Email Sent Yahoooo'
    } catch (error) {
      console.log(error)
      return response.status(500).send(`${error}`)
    }
  }
}

module.exports = InvoiceGenerationController
