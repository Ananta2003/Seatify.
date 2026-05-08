import { CiBookmark } from "react-icons/ci";
import { LuCircleArrowRight } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import type { movieProps } from "../pages/Dashboard";

type CardProp = "admin" | "user"

interface CardProps {
    onClick?: () => void
    type: CardProp
    movie: movieProps
}

export default function Card(props: CardProps) {

    return (
        <div onClick={props.onClick}  className="w-52 h-64 rounded-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] m-2 ">
            <div style={{
                backgroundImage: `url(${props.movie.movieImg || ""})`
            }} className="w-full h-full hover:opacity-100 opacity-70 text-white  bg-cover bg-center bg-no-repeat flex flex-col justify-between">

                {props.type === "user"
                    ?
                    <div className="flex justify-end p-4"><CiBookmark size={30} /></div>
                    :
                    <div className="flex justify-end p-4"><CiEdit size={30} /></div>}


                {/* bottom */}
                <div className="flex justify-between items-center px-4">
                    <h1 className="p-4 text-lg  font-serif font-bold">
                        {props.movie.movie}
                    </h1>
                    <LuCircleArrowRight size={30} />
                </div>


            </div>
        </div>
    )
}