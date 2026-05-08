import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './modules/user/user.js'
import adminRouter from './modules/admin/admin.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CLIENT_URL
}));

app.use(express.json());

app.use('/api/v1/user',userRouter)
app.use('/api/v1/admin',adminRouter)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});