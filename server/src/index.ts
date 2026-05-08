import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './modules/user/user.js'
import adminRouter from './modules/admin/admin.js'
dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors({
  origin: process.env.CLIENT_URL
}));
app.use(express.json());

app.use('/api/v1/user',userRouter)
app.use('/api/v1/admin',adminRouter)

app.listen(port ,()=>{
    console.log(`Server Running on ${port}`)
})