import { FaFilm } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
    const navigate = useNavigate();

    return (
        <div className="relative border-dashed border-t-4 sm:border-t-8 border-b-4 sm:border-b-8 border-[#92260d] w-full min-h-screen bg-[#190a05] flex items-center justify-center text-center overflow-hidden px-4">

            {/* background glow */}
            <div className="absolute w-60 sm:w-96 h-60 sm:h-96 bg-red-500/20 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
            <div className="absolute w-60 sm:w-96 h-60 sm:h-96 bg-orange-500/20 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

            <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 max-w-3xl"
            >

                {/* logo */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.8,
                        type: "spring",
                        stiffness: 120
                    }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                >

                    <motion.div
                        animate={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="p-2 rounded-md bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-2xl"
                    >
                        <FaFilm size={30} className="sm:w-[40px] sm:h-[40px]" />
                    </motion.div>

                    <motion.h1
                        initial={{ letterSpacing: "-10px", opacity: 0 }}
                        animate={{ letterSpacing: "0px", opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-4xl sm:text-6xl md:text-7xl font-bold text-white"
                    >
                        Seatify.
                    </motion.h1>

                </motion.div>

                {/* subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-4 text-base sm:text-xl md:text-2xl text-gray-300 font-medium leading-relaxed tracking-wide"
                >
                    Book <span className="text-violet-400">·</span> Watch{" "}
                    <span className="text-teal-400">·</span> Experience
                </motion.p>

                {/* description */}
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="p-3 sm:p-4 text-base sm:text-2xl md:text-3xl text-white leading-relaxed"
                >
                    Your premium destination for movie{" "}
                    <span className="text-red-500">seat booking</span>. Every seat, perfectly yours.
                </motion.p>

                {/* buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 sm:mt-8"
                >

                    <motion.button
                        whileHover={{
                            scale: 1.08,
                            boxShadow: "0px 0px 25px rgba(255,80,80,0.5)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/user-signin')}
                        className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white bg-[#92260d] hover:bg-[#a83214] transition-all duration-200"
                    >
                        User SignUp
                    </motion.button>

                    <motion.button
                        whileHover={{
                            scale: 1.08,
                            backgroundColor: "rgba(146,38,13,0.2)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/admin-signin')}
                        className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white border border-[#92260d] transition-all duration-200"
                    >
                        Admin Portal
                    </motion.button>

                </motion.div>

            </motion.div>
        </div>
    );
}