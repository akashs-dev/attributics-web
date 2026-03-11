import React from 'react';
import logo from '../../../assets/logo/AttributicsWordmark.png';

const GlobalLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <style>
                {`
                    @keyframes pulse-loader {
                        0% { opacity: 0.6; transform: scale(0.95); }
                        50% { opacity: 1; transform: scale(1.05); }
                        100% { opacity: 0.6; transform: scale(0.95); }
                    }
                `}
            </style>
            <div className="flex flex-col items-center gap-4">
                <div style={{ animation: 'pulse-loader 1s infinite ease-in-out' }}>
                    <img src={logo} alt="Loading..." className="max-w-[400px] w-[80vw] h-auto object-contain" />
                </div>
            </div>
        </div>
    );
};

export default GlobalLoader;
