import { FaFilm } from "react-icons/fa6";
import { LuBellRing } from "react-icons/lu";

type MainSliderProp = {
    aboutRef: React.RefObject<HTMLDivElement | null>;
};

export default function Navbar({aboutRef}:MainSliderProp) {
    return (
        <div className="w-full h-18 bg-[#121214] flex justify-between items-center p-4">
            {/* <div className="w-full h-1/2 text-white flex items-center justify-center">
                <div >
                    <h1 className="text-8xl text-[#faaa08]">Seatify.</h1>
                </div>
            </div> */}

            <div className="flex items-center gap-2">
                <div className="p-2 rounded-md bg-gradient-to-r from-red-500 to-orange-500">
                    <FaFilm size={20}/>
                </div>
                <h1 className="text-2xl text-white  font-serif font-bold">Seatify.</h1>
            </div>

            <div>
                <input type="text" placeholder="Search Movies"  className="w-98 rounded-full px-4 py-2 border-1 border-gray-600 text-white"onClick={() =>
                            aboutRef.current?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",

                            })
                        } ></input>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-md">
                <LuBellRing size={20}/>
            </div>

        </div>

    )
}