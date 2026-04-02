import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedPage - A wrapper component that adds cinematic transitions to pages.
 */
const AnimatedPage = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1] // Premium spring ease
            }}
            style={{ width: '100%' }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedPage;
