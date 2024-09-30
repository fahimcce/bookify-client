import React from 'react';
import { Empty } from 'antd';
import { motion } from 'framer-motion';

const NoDataFound: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center items-center h-full w-full mt-10 mb-4"
        >
            <motion.div
                animate={{
                    y: [0, -20, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "easeInOut",
                }}
                className="text-6xl mb-4"
            >
                ?
            </motion.div>
            <Empty
                description={
                    <span className="text-gray-500 text-lg md:text-xl">
                        No Data Found
                    </span>
                }
            />
        </motion.div>
    );
};

export default NoDataFound;
