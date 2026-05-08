import { Router } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Movie, Seat, User } from "../../db/db.js";
import { middleware } from "../../middleware/middleware.js";
import mongoose from "mongoose";
dotenv.config()

const userRouter = Router()
const JWT_PASSWORD: any = process.env.JWT_PASSWORD

userRouter.post('/signup', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(401).json({
            message: "Please Fill all Provided Inputs"
        })
    }

    try {
        const data = await User.create({
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

userRouter.post('/signin', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(401).json({
            message: "Please Fill all Provided Inputs"
        })
    }

    const user = await User.findOne({ username: username })

    if (!user) {
        return res.status(400).json({
            message: "No User Found "
        })
    }

    try {
        const token = jwt.sign({
            userId: user._id, role: 'user'
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

userRouter.put('/book-seat', middleware, async (req, res) => {
    const { movieId, showId, seat_number } = req.body;

    try {
        const updateSeat = await Seat.updateOne(
            {
                movieId,
                show_id: showId
            },
            {
                $set: {
                    "seats.$[seat].status": "unavailable",
                    "seats.$[seat].bookedBy": req.userId
                }
            },
            {
                arrayFilters: [
                    {
                        "seat.seat_number": { $in: seat_number },
                        "seat.status": "available"
                    }
                ]
            }
        );

        console.log("UPDATE RESULT:", updateSeat);

        return res.json({
            message: "Seat booked successfully",
            updateSeat
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

userRouter.put('/cancel-seat', middleware, async (req, res) => {
    const { movieId, showId, seat_number } = req.body

    if (!req.userId) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const userId = new mongoose.Types.ObjectId(req.userId);


    try {
        const updateSeat = await Seat.updateOne(
            {
                movieId,
                show_id: showId,
                "seats.seat_number": seat_number,
                "seats.bookedBy": req.userId
            },
            {
                $set: {
                    "seats.$.status": "available",
                    "seats.$.bookedBy": null
                }
            }
        );

        return res.status(200).json({
            message: "Seat booked successfully",
            updateSeat
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})


userRouter.get("/total-booked-seats", middleware, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const userId = new mongoose.Types.ObjectId(req.userId);

        const result = await Seat.aggregate([
            {
                $unwind: "$seats"
            },
            {
                $match: {
                    "seats.bookedBy": userId
                }
            },
            {
                $count: "totalBookedSeats"
            }
        ]);

        const totalBookedSeats =
            result.length > 0 ? result[0].totalBookedSeats : 0;

        return res.status(200).json({
            totalBookedSeats
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

userRouter.get('/bulk-movies', middleware, async (req, res) => {

    try {
        const movies = await Movie.find({})

        res.json({
            movies
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})

userRouter.post('/bulk-seat', middleware, async (req, res) => {

    try {
        const { show_id } = req.body;

        console.log("received:", show_id);

        const seatDoc = await Seat.findOne({
            show_id: new mongoose.Types.ObjectId(show_id)
        });

        res.json({
            seats: seatDoc?.seats || [],
            totalSeats: seatDoc?.seats?.length || 0
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})

export default userRouter