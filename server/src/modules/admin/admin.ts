import { Router } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Admin, Movie, Seat } from "../../db/db.js";
import { middleware } from "../../middleware/middleware.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import mongoose from "mongoose";
dotenv.config()

const adminRouter = Router()
const JWT_PASSWORD: any = process.env.JWT_PASSWORD

adminRouter.post('/signup', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(401).json({
            message: "Please Fill all Provided Inputs"
        })
    }

    try {
        const data = await Admin.create({
            username: username,
            password: password
        })

        res.status(200).json({
            message: "User Acount Created",
            data
        })
    } catch (err) {
        res.status(501).json({
            message: "Err Creating Accoun ",
            err
        })
    }

})

adminRouter.post('/signin', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(401).json({
            message: "Please Fill all Provided Inputs"
        })
    }

    const admin = await Admin.findOne({ username: username })

    if (!admin) {
        return res.status(400).json({
            message: "No User Found "
        })
    }

    try {
        const token = jwt.sign({
            userId: admin._id, role: 'admin'
        }, JWT_PASSWORD)

        res.status(201).json({
            token
        })
    } catch (err) {
        res.status(501).json({
            message: "Failed to signup ",
            err
        })
    }
})

adminRouter.post('/create-movie', middleware, adminMiddleware, async (req, res) => {
    try {
        const { movie, shows, totalSeats, movieImg } = req.body
        const adminId = new mongoose.Types.ObjectId(req.userId);

        const createMovie = await Movie.create({
            movie,
            movieImg,
            addedBy: adminId,
            shows
        })


        //Tricky Part
        for (const show of createMovie.shows) {
            const seatArray = Array.from(
                { length: totalSeats }, (__, index) => ({
                    seat_number: index + 1,
                    status: 'available',
                    bookedBy: null
                })
            )

            await Seat.create({
                movieId: createMovie._id,
                show_id: show._id,
                seats: seatArray
            });
        }
        //Tricky Part

        res.status(201).json({
            message: "Movie created successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }


})

adminRouter.delete('/delete-movie', middleware, adminMiddleware, async (req, res) => {
    try {
        const { movieId } = req.body
        if (!movieId) {
            return res.status(400).json({ message: "movieId required" });
        }

        const id = new mongoose.Types.ObjectId(movieId);

        const movieResult = await Movie.deleteOne({
            _id: id
        });

        const seatResult = await Seat.deleteMany({
            movieId: id
        });

        return res.json({
            message: "Movie, shows and seats deleted",
            movieDeleted: movieResult.deletedCount,
            seatsDeleted: seatResult.deletedCount
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})

adminRouter.delete('/delete-show', middleware, adminMiddleware, async (req, res) => {
    try {
        const { movieId, showId } = req.body

        //Tricky Part
        await Movie.updateOne(
            { _id: movieId },
            {
                $pull: {
                    shows: { _id: showId }
                }
            }
        );
        //Tricky Part


        await Seat.deleteMany({
            movieId,
            show_id: showId
        })

        return res.status(200).json({
            message: "Show seats deleted successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})

adminRouter.get('/get-movies', middleware, adminMiddleware, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const adminId = new mongoose.Types.ObjectId(req.userId);
        const movies = await Movie.find({ addedBy: adminId })

        return res.status(200).json({
            movies
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})

adminRouter.post('/clicked-movie', middleware, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const { movieId } = req.body
        const movies = await Movie.findById(movieId)

        return res.status(200).json({
            movies
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})

export default adminRouter