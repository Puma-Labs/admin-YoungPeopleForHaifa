import "./styles.sass";

import React, { FC, useState, useRef } from "react";
import useClickOutside from "../../../customHooks/useClickOutside";

interface MenuDropdownProps {
    onChange: (value: string) => void;
    type: "optionsMenu" | "datePicker";
    optionsList?: string[];
    defaultOption?: string;
    disabled?: boolean;
}

const MenuDropdown: FC<MenuDropdownProps> = ({ onChange, type, optionsList = [], defaultOption = "", disabled = false }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const [selectedDate, setSelectedDate] = useState("не выбрано");
    const menuRef = useRef<HTMLDivElement>(null);

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
        setShowMenu(false);
        onChange(option);
    };

    useClickOutside(menuRef, () => setShowMenu(false));

    return (
        <div className="menu-dropdown" ref={menuRef}>
            <div className="menu-btn">
                <button
                    onClick={() => setShowMenu((prev) => !prev)}
                    className={`btn-dropdown ${disabled ? "disabled" : ""} ${showMenu ? "active" : ""}`}
                >
                    <span className={`icon ${type === "optionsMenu" ? "_icon-ico-star" : "_icon-ico-calendar"}`}></span>
                    <span className="status-text">
                        {type === "optionsMenu" ? `Статус: ${selectedOption}` : `Дата: ${selectedDate}`}
                    </span>
                    <span className="arrow _icon-ico-arrow-filled"></span>
                </button>
            </div>
            {showMenu && !disabled && (
                <div className={`menu ${type === "optionsMenu" ? "optionsMenu" : "datePicker"}`}>
                    {optionsList?.map(
                        (option, index) =>
                            option !== selectedOption && (
                                <div className="menu-item" key={index}>
                                    <span onClick={() => handleOptionChange(option)} className="menu-text">
                                        {option}
                                    </span>
                                </div>
                            )
                    )}
                </div>
            )}
        </div>
    );
};

export default MenuDropdown;

