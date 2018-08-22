import http from 'http'

exports.addToCache = payload => new Promise((resolve, reject) => {
    const options = {
        host: `localhost`,
        port: 8882,
        headers: { 'Content-Type': 'application/json' },
        path: '/api/numbers',
        method: 'POST'
    }

    const req = http.request(options, res => {
        let body = [];
        res.on('data', chunk => {
            body.push(chunk)
        })
        res.on('end', () => {
            resolve(body.join(''))
        })
    })
    req.write(payload)
    req.end()
    req.on('error', e => {
        reject(e)
    })
})