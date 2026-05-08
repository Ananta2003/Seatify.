import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

const MONGO_CONNECT: any = process.env.MONGO_URL

mongoose.connect(MONGO_CONNECT)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const admminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const movieSchema = new mongoose.Schema({
    movie: {
        type: String,
        required: true,
    },
    movieImg:{
        type: String,
        required: true
    }
    ,
    addedBy: { type: mongoose.Types.ObjectId, ref: 'Admin' , required: true},
    shows:[{ startTime: Date, endTime: Date }]
})

const seatsSchema = new mongoose.Schema({
    movieId: { type: mongoose.Types.ObjectId, ref: 'Movie' },
    show_id: { type: mongoose.Types.ObjectId, required:true },
    seats: [
        {
            seat_number: Number,
            status: {
                type: String,
                enum: ['available', 'unavailable'],
                default: 'available'
            },
            bookedBy: {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                default: null
            }
        }
    ],
    user_id: { type: mongoose.Types.ObjectId, ref: 'User', default: null }
})



export const User = mongoose.model('User', userSchema)
export const Admin = mongoose.model('Admin', admminSchema)
export const Movie = mongoose.model('Movie', movieSchema)
export const Seat = mongoose.model('Seat', seatsSchema)
