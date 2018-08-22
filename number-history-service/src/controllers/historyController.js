import autoBind from 'auto-bind'

export class HistoryController {
  constructor({ dataAccess }) {
    this.dataAccess = dataAccess
    autoBind(this)
  }

  post(req, res) {
    const { number, transactionType } = req.body
    console.log("log transaction", number, transactionType)

    const transaction = {
      number_id: number,
      transaction_type: transactionType
    }

    this.dataAccess.logTransaction(transaction)
    res.json({ message: 'OK' })
  }

  get(req, res) {
    const { number } = req.params
    console.log("get transaction history of", number)
    this.dataAccess.getHistoryOfANumber(number).then(result => res.json(result))
  }
}