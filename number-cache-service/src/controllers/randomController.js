import autoBind from 'auto-bind'

export class RandomController {
    constructor({ dataAccess }) {
        this.dataAccess = dataAccess
        autoBind(this)
    }

    get(req, res) {
        const { count } = req.params

        // for(let x = 0; x < 10000; x++) {
        //     this.dataAccess.add({ number: Math.random() })
        // }

        this.dataAccess
            .getRandom(count)
            .then(numberResult => res.json(numberResult))
            .catch(err => res.json({ error: 'NUMBER GET FAILED', msg: err }))
    }
}