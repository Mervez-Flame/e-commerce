import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Dropdown = () => {
    const [selectedOption, setSelectedOption] = useState("Sort By");
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        { label: "Men", link: "/mens" },
        { label: "Women", link: "/womens" },
        { label: "Kids", link: "/kids" },
    ];

    const handleOptionClick = (option) => {
        setSelectedOption(option.label);
        setIsOpen(false);
        // Change the link (you can use a router like react-router-dom)
        window.location.href = option.link;
    };

    return (
        <div className="relative z-10">
            {/* Dropdown button */}
            <div
                className="flex items-center justify-between max-sm:px-4 gap-x-4 px-8 py-2 ring-1 rounded-lg ring-neutral-900 cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {selectedOption} <FaChevronDown />
            </div>

            {/* Dropdown options */}
            {isOpen && (
                <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-md">
                    {options.map((option) => (
                        <div
                            key={option.label}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer "
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
