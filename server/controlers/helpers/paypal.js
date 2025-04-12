const paypal = require('paypal-rest-sdk')

paypal.configure({
    mode : 'sandbox',
    client_id: 'AVbBn2ZKmZJ6RqzKWhthH4Qizn-97dpF85UhIk6gtxaD2BSDTN5eGyuOYKrSEWy0KduZsKm-P86Hf3mt',
    client_secret: 'EJMdEcC5uH8zPTbp952gUHnA8vP-7xUA7ePuAX-FQ8R0acS6i4H2V1JVLqXoQ_MRLeItsrhJWNdq2TQS'
})

module.exports = paypal;