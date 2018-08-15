import express from 'express'
import helmet from 'helmet'
import methodOverride from 'method-override'
import apiRouter from './routers'
import { serverPort } from './config'

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

export default app