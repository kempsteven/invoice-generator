'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')
const pdf = require('html-pdf')
const moment = require('moment')
const sendGrid = use('App/Common/SendGrid')

class InvoiceGeneration extends Model {
  static computeFinalIncome(request) {
    // const { absences = 0 } = request.get()
    // const daysInMonth = moment().daysInMonth()
    // const income = parseFloat(Env.get('INCOME'))
    // const perDayIncome = income / daysInMonth
    return parseFloat(Env.get('INCOME'))
  }

  static getPdfData(request) {
    const finalIncome = this.computeFinalIncome(request)
    const paidLeave = parseFloat(Env.get('LEAVE_AMOUNT'))
    const name = Env.get('NAME')
    const addressLineOne = Env.get('ADDRESS_LINE_ONE')
    const suburb = Env.get('SUBURB')
    const cityCountry = Env.get('CITY_COUNTRY')
    const email = Env.get('EMAIL')

    const billTo = Env.get('BILL_TO')
    const attn = Env.get('ATTN')
    const billToAddress = Env.get('BILL_TO_ADDRESS')

    const accountNo = Env.get('ACCOUNT_NO')
    const bankName = Env.get('BANK_NAME')
    const bankCode = Env.get('BANK_CODE')
    
    // const date = `${moment().endOf('month').format('MMMM DD, YYYY')}`
    const date = `March 14, 2021`
    // const currentMonth = moment().format('YYYY-MM-01')
    // const invoiceNumber = moment(currentMonth).diff(moment('2020-04-01'), 'months', true) + 1

    return {
      invoiceNumber: 12,
      paidLeave,
      date,
      finalIncome: finalIncome.toLocaleString(),
      name,
      addressLineOne,
      suburb,
      cityCountry,
      email,
      billTo,
      attn,
      billToAddress,
      accountNo,
      bankName,
      bankCode
    }
  }

  static generatePdf(pdfTemplate) {
    /*
    * This options is only needed in production,
    * not sure why the hell they have different results when deployed
    * compared on my local machine.
    */
    const options = {
      width: '793px',
      height: '1122px'
    }

    return new Promise((resolve, reject) => {
      pdf.create(pdfTemplate, options).toBuffer(async (err, buffer) => {
        if (err) {
          reject(err)
          return
        }
  
        const base64Pdf = Buffer
          .from(buffer)
          .toString('base64')
        
        resolve(base64Pdf)
      })
    })
  }

  static async sendEmail(base64File, invoiceNumber) { 
    const sendToEmail = Env.get('SEND_TO_EMAIL')
    const attachments = [
      {
        filename: `Invoice No. ${invoiceNumber}.pdf`,
        content: base64File,
        type: 'application/pdf',
        disposition: 'attachment'
      }
    ]
    
    try {
      await sendGrid(
        sendToEmail,
        'Invoice Generation',
        attachments
      )
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = InvoiceGeneration
