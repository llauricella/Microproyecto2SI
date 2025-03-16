import React from 'react';
import './styles.css';

function InformacionCard({ title, text }) {
    return (
        <div className="card-container max-w-1/4 mx-auto p-6 bg-amber-600 rounded-xl shadow-2xl border-6 border-orange-300">
            <div className="flex">
                <div className="text-white w-full">
                    <h3 className="text-3xl font-bold mb-4 text-black bg-white rounded-xl p-3 text-center border-4">
                        {title}
                    </h3>
                    <ul className="list-disc list-inside pl-5 space-y-2">
                        {text.map((item, index) => (
                            <li key={index} className="text-lg">
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