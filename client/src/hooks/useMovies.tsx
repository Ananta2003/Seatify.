import axios from "axios"
import { useEffect, useState } from "react"

export const useMovies = () => {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        const Backend_Url = import.meta.env.VITE_BACKEND_URL
        const token = localStorage.getItem('token')

        axios.get(`${Backend_Url}/user/bulk-movies`, {
            headers: {
                Authorization: token
            }
        }).then((response) => {
            setMovies(response.data.movies || [])
        })
    }, [])

    return movies
}

export const useAdminMovies = () => {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        const Backend_Url = import.meta.env.VITE_BACKEND_URL
        const token = localStorage.getItem('token')

        axios.get(`${Backend_Url}/admin/get-movies`, {
            headers: {
                Authorization: token
            }
        }).then((response) => {
            setMovies(response.data.movies || [])
        }).catch((err) => {
            console.log("Failed to fetch admin movies", err)
        })

    }, [])

    return movies
}

interface Seat {
  seat_number: number;
  status: "available" | "unavailable";
  bookedBy: string | null;
}

export const useShow = (showId: string) => {
    const [show, setShow] = useState<Seat[]>([]);

    useEffect(() => {
        if (!showId) return;

        const Backend_Url = import.meta.env.VITE_BACKEND_URL;
        const token = localStorage.getItem("token");

        axios
            .post(
                `${Backend_Url}/user/bulk-seat`,
                { show_id: showId },   
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then((response) => {
                setShow(response.data.seats || []); 
            });
    }, [showId]);

    return show;
};