import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import productRoute from './routes/productRoutes'
import userRoute from './routes/userRoutes'
import orderRoute from './routes/orderRoutes'
import client from './database'


const app: express.Application = express()

app.use(bodyParser.json())


app.use(productRoute);
app.use(userRoute);
app.use(orderRoute);
app.listen(process.env.PORT, function () {
    console.log(`starting app`)
})
