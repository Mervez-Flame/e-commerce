import { motion } from "framer-motion";

const LoadingSpinner = () => {
    // Define animation variants for ripple effect
    const rippleVariants = {
        hidden: { scale: 0.5, opacity: 0.8 },
        visible: { scale: 1.2, opacity: 0.4 },
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-80 z-[1000]">
            {[...Array(6)].map((_, index) => (
                <motion.div
                    key={index}
                    className="w-4 h-16 bg-[#fc823f] rounded-lg"
                    variants={rippleVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 0.5, // Reduced duration for better effect
                        delay: index * 0.1,
                    }}
                />
            ))}
        </div>
    );
};

export default LoadingSpinner;
