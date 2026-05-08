import { useRef } from "react";
import { Button, Input } from "./component-ui";
import axios from "axios";


interface Addmovieprops {
    setSelect: React.Dispatch<React.SetStateAction<boolean>>;

}

export default function AddMovie({ setSelect }: Addmovieprops) {

    const movieRef = useRef<HTMLInputElement>(null)
    const movieImgRef = useRef<HTMLInputElement>(null)
    const seatRef = useRef<HTMLInputElement>(null)
    const startTimeRef = useRef<HTMLInputElement>(null)
    const endTimeRef = useRef<HTMLInputElement>(null)

    async function addMovie() {
        try {
            const Backend_Url = import.meta.env.VITE_BACKEND_URL;
            const token = localStorage.getItem("token");

            const movieName = movieRef.current?.value?.trim();
            const movieImg = movieImgRef.current?.value?.trim();
            const seats = seatRef.current?.value;
            const startTime = startTimeRef.current?.value;
            const endTime = endTimeRef.current?.value;

            // ❌ EMPTY FIELD VALIDATION
            if (!movieName || !movieImg || !seats || !startTime || !endTime) {
                alert("All fields are required");
                return;
            }

            const seatCount = Number(seats);

            // ❌ SEATS LIMIT (max 50)
            if (seatCount <= 0 || seatCount > 50) {
                alert("Seats must be between 1 and 50");
                return;
            }

            const start = new Date(startTime);
            const end = new Date(endTime);

            const diffInMin = (end.getTime() - start.getTime()) / (1000 * 60);

            // ❌ MIN DURATION (10 min)
            if (diffInMin < 10) {
                alert("Show duration must be at least 10 minutes");
                return;
            }

            // ❌ MAX DURATION (4 hours = 240 min)
            if (diffInMin > 240) {
                alert("Show duration cannot exceed 4 hours");
                return;
            }

            // 🚀 CALL BACKEND
            const response = await axios.post(
                `${Backend_Url}/admin/create-movie`,
                {
                    movie: movieName,
                    movieImg: movieImg,
                    totalSeats: seatCount,
                    shows: [
                        {
                            startTime: start,
                            endTime: end
                        }
                    ]
                },
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            console.log(response.data);
            window.location.reload()
            alert("Movie created successfully!");

        } catch (err: any) {
            console.log(err);
            alert(err?.response?.data?.message || "Something went wrong");
        }
    }
    return (
        <div className="fixed inset-0 z-50">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            ></div>

            <div className="absolute inset-0 flex items-center justify-center ">
                <div className="w-1/2 bg-black rounded-md p-4 border-dashed border-t-15  border-b-15 border-[#92260d]">
                    <div className="flex justify-between p-2 items-center">
                        <h1 className="text-2xl font-bold">Add Movie Details:</h1>
                        <Button label="Close" onClick={() => setSelect(false)} />
                    </div>
                    <div >
                        <Input ref={movieRef} label="Movie Name:" placeholder="Enter Movie Name" />
                        <Input ref={movieImgRef} label="Poster URL:" placeholder="Enter Movie Poster URL" />
                        <Input ref={seatRef} type="number" placeholder="Enter Number of Seats" label="Enter Seats" />
                        <div className="flex items-center justify-center">
                            <Input ref={startTimeRef} label="Show Start Time:" type="datetime-local" />
                            <Input ref={endTimeRef} label="Show End Time:" type="datetime-local" />
                        </div>
                        <Button onClick={addMovie} label="Add Movie" />
                    </div>


                </div>
            </div>

        </div>

    )
}