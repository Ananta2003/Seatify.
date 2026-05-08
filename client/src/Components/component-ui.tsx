
interface InputProp {
    label: string,
    placeholder?: string,
    ref?: any
    type?: string
}

export const Input = ({ ref, label, placeholder, type }: InputProp) => {

    return (
        <div className="m-2 text-white">
            <label className="block " htmlFor="">{label}</label>
            <input className="w-full px-4 py-2 rounded-md bg-[#1a1a1d] border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200 invalid:border-red-500 " type={type} placeholder={placeholder} ref={ref} />
        </div>
    )
}


interface ButtonProp {
    label: string,
    onClick?: () => void,
    style?: string
}

export const Button = (props: ButtonProp) => {

    return (
        <div>
            <button onClick={props.onClick} className={`bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 rounded cursor-pointer mt-2 w-full ${props.style}`}>{props.label}</button>
        </div>
    )
}


type UpcomingProps = {
    props: string;
};

export const Upcoming = ({ props }: UpcomingProps) => {
    return (
        <div className="w-1/2 h-28 overflow-hidden px-4">
            <img
                src={props}
                alt="upcoming"
                className="w-full h-full object-cover rounded-md blur-[1.5px]"
            />
        </div>
    );
};


type MainSliderProp = {
    aboutRef: React.RefObject<HTMLDivElement | null>;
    totalbooking: number
};


export const MainSlider = ({ aboutRef, totalbooking }: MainSliderProp) => {

    return (
        <div>
            {/* Main Layout */}
            <div className="flex flex-col lg:flex-row gap-4 p-3 sm:p-4">

                {/* LEFT SECTION */}
                <div className="w-full lg:w-3/4 flex flex-col gap-4">

                    {/* HERO SECTION */}
                    <div className="relative h-[220px] sm:h-[300px] md:h-[350px] rounded-xl overflow-hidden border border-white">

                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "url('https://www.beliefmedia.com.au/r/2022/03/560700/cdd66b7c29e6661e4c047aa1f629b484-40c2d8db1c50411827cfe14ce67036e6.jpg')",
                            }}
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40" />

                        {/* Title */}
                        <h1 className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-3xl sm:text-5xl md:text-7xl font-bold z-0">
                            Seatify..
                        </h1>

                    </div>

                </div>

                {/* RIGHT SECTION */}
                <div className="w-full lg:w-1/4 bg-[#121214] rounded-xl p-4 flex flex-col gap-4">

                    <h1 className="text-center text-xl sm:text-2xl font-bold">
                        Quick Book
                    </h1>

                    {/* Booking box */}
                    <div className="bg-black flex items-center gap-3 p-3 rounded-md">

                        <div>
                            <h1 className="bg-gradient-to-r from-red-500 to-orange-500 p-3 sm:p-4 px-5 sm:px-6 rounded-md text-sm sm:text-base">
                                {totalbooking}
                            </h1>
                        </div>

                        <h1 className="text-sm sm:text-base">
                            Total Booking
                        </h1>

                    </div>

                    {/* Coming soon */}
                    <h1 className="text-sm sm:text-base">Coming Soon:</h1>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 bg-black p-2 rounded-md">

                        <Upcoming props="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6MhKeoV7v58LfVc9pYyI8v9NTpu_jxfF_a46szxBCrqLxxWO1s19OKuR_Bu3StaxWr20F7-Wl9u8Hf0i0Zpz0NeBgsL3puWEg8Tc1OAzj&s=10" />

                        <Upcoming props="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8ZNXOrXPt_i_WP97UZjg3_iw1f3L5_08-3nVp-OiEW29pB6TyBWFn&usqp=CAE&s" />

                    </div>

                    {/* Button */}
                    <div className="mt-auto">
                        <Button
                            label="Quick Book"
                            onClick={() =>
                                aboutRef.current?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                })
                            }
                        />
                    </div>

                </div>

            </div>
        </div>
    )
}

interface checkoutProp {
    movieImg: string
}

export const CheckoutUi = (props: checkoutProp) => {

    return (
        <div className="w-52 h-62 overflow-hidden cursor-pointer  ">
            <div style={{
                backgroundImage: `url(${props.movieImg || ""})`
            }} className="w-full h-full  text-white bg-cover bg-center bg-no-repeat flex flex-col justify-between">
            </div>
        </div>
    )
}