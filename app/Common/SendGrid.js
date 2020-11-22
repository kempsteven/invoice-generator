const sgMail = require('@sendgrid/mail')
const Env = use('Env')
const privateKey = Env.get('SENDGRID_API_KEY')
sgMail.setApiKey(privateKey)
const email = Env.get('SENDGRID_EMAIL_SENDER')

module.exports = async (
  to,
  subject,
  attachments = [],
  html = '<h1>Review your generated PDF.</h1>'
) => { 
  try {
    const msg = {
      to,
      from: {
        name: 'Invoice Generator',
        email
      },
      subject,
      attachments,
      html,
    }
    
    await sgMail.send(msg)
  } catch (error) {
    console.log(`${error}`)
  }
}