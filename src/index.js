import express, { json } from 'express' // require -> commonJS

import { citiesRouter } from './routes/citys.js'

const app = express()
app.use(json())
app.disable('x-powered-by')

app.use('/cities', citiesRouter)






app.listen(4200)
console.log("Estoy funcionando!");
