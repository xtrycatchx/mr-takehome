import autoBind from 'auto-bind'

export class BuyController {
  constructor({ dataAccess }) {
    this.dataAccess = dataAccess
    autoBind(this)
  }

  post(req, res) {
    const { number } = req.body
    console.log("customer buys", number)
    this.dataAccess.update(number)
    res.json({ message: 'OK' })
  }
}