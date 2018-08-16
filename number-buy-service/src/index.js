import express from 'express'
import helmet from 'helmet'
import methodOverride from 'method-override'
import apiRouter from './routers'
import { serverPort } from './config'
import { container } from './di/container'
import { addToCache } from './util/cacheClient'

const app = express()

// temporarily for dev
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(helmet())
app.use([express.json(), express.urlencoded({ extended: true })])
app.use(methodOverride())

app.use('/api', apiRouter)

app.use((req, res, next) => {
  res.status(404).send({ url: req.originalUrl })
})

app.listen(serverPort)

const dataAccess = container.resolve('dataAccess')

for(let x =0; x < 100; x++) {
  const number =  Math.floor(Math.random() * (6599999999 - 6590000000) + 6590000000)
  const status = 'NEW'
  dataAccess.add({ number, status })
}


dataAccess.getAvailable().then(record => {
  const payload = record.map(item => item)
  addToCache(JSON.stringify({ data: payload }))
  console.log("HELLO", record.length)
})

export default app