import React from 'react';
import './styles.css';

function InformacionCard({ title, text }) {
    return (
        <div className="card-container max-w-full md:max-w-md mx-auto p-4 md:p-6 bg-amber-600 rounded-xl shadow-2xl border-4 border-orange-300">
            <div className="flex">
                <div className="text-white w-full">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-black bg-white rounded-xl p-3 text-center border-4">
                        {title}
                    </h3>
                    <ul className="list-disc list-inside pl-5 space-y-2">
                        {text.map((item, index) => (
                            <li key={index} className="text-base md:text-lg">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default InformacionCard;