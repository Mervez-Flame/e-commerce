import { useState } from 'react';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import { motion, AnimatePresence } from 'framer-motion';

const Credentials = () => {
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleBackToSignUp = () => {
        setShowLogin(false);
    };

    const containerVariants = {
        hidden: { x: '100%', opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 2 } },
        exit: { x: '-100%', opacity: 0, transition: { duration: 2 } },
    };

    const containerVariant = {
        hidden: { x: '-100%', opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 2 } },
        exit: { x: '100%', opacity: 0, transition: { duration: 2 } },
    };

    return (
        <section className="flex justify-center items-center h-screen mt-16 w-screen bg-[#fc823f]">
            <AnimatePresence mode="popLayout"> 
                {showLogin ? (
                    <motion.div
                        key="login"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <Login onBack={handleBackToSignUp} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="signup"
                        variants={containerVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <SignUp onLogin={handleLoginClick} />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Credentials;
