import React from "react";

const CharacteristicItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-white">{value}</p>
    </div>
);

export default CharacteristicItem;