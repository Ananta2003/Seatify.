import { useLocation, useNavigate } from "react-router-dom";
import { Button, CheckoutUi } from "../Components/component-ui";
import { FaBarcode } from "react-icons/fa";
export default function Checkout() {

    const navigate = useNavigate()
    const location = useLocation();

    const { movie, selectedSeats, showTime , movieImg} = location.state || {};

    function formatShowTime(dateString: string) {
        const date = new Date(dateString);

        return date.toLocaleString("en-IN", {
            day: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    }

    return (
        <div className="fixed inset-0 z-50">

            {/* 🔲 Background overlay */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            ></div>

            {/* 📦 Foreground content */}
            <div className="absolute inset-0 flex items-center justify-center w-full">
                <div className="bg-black p-6 rounded-xl text-white shadow-xl">
                    <div className="flex justify-between p-2 items-center">
                        <h1 className="text-2xl font-bold">Your Booking</h1>

                    </div>
                    <div>
                        <CheckoutUi movieImg={movieImg}/>
                        <div className="w-52 h-32 bg-white text-black text-center">
                            <h1 className=" p-2">{movie?.movie}</h1>
                            <h1 className="text-sm">
                                {showTime ? formatShowTime(showTime) : "No show time"}
                            </h1>
                            <h1 className="text-sm">{selectedSeats} </h1>
                            <div className="flex items-center justify-center">
                                <FaBarcode size={50} /><FaBarcode size={50} />
                            </div>
                        </div>
                    </div>
                    <Button label="Share your Ticket" />

                    <button onClick={() => navigate('/dashboard')} className=" cursor-pointer w-full mt-2">Done</button>
                </div>

            </div>

        </div>
    )
}