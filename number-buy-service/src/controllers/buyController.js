import autoBind from 'auto-bind'

export class BuyController {
  constructor({ dataAccess, messaging }) {
    this.dataAccess = dataAccess
    this.messaging = messaging
    autoBind(this)
  }

  post(req, res) {
    const { number } = req.body
    console.log("customer buys", number)
    this.dataAccess.update(number)
    const transaction = 'CONSUMED'
    this.messaging.publish('transaction-history-channel', { number, transaction } )
    res.json({ message: 'OK' })
  }
}