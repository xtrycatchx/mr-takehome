import autoBind from 'auto-bind'

export class UpdateController {
    constructor({ dataAccess }) {
        this.dataAccess = dataAccess
        autoBind(this)
    }

    post(req, res) {
      const { data } = req.body
      console.log("received logout/timeout", data)
      data.forEach(number => {
        this.dataAccess.add(number)
      })
      res.json({ message: 'OK' })
    }
}