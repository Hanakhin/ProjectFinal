import React from "react";

const GameDetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex items-center">
        <div className="text-orange mr-2">{icon}</div>
        <div>
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="text-white">{value}</p>
        </div>
    </div>
);

export default GameDetailItem;