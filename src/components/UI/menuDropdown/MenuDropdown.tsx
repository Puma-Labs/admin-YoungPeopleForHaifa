import { type } from "os";
import "./styles.sass";

import React, { FC, useState } from "react";

interface MenuDropdownProps {
    onChange: (value: string) => void;
    type: "optionsMenu" | "datePicker";
    optionsList?: string[];
    defaultOption?: string;
    disabled?: boolean;
}

const MenuDropdown: FC<MenuDropdownProps> = ({ onChange, type, optionsList = [], defaultOption = "", disabled = false }) => {
    // const optionsList = ["Все", "Активные", "Удаленные"];
    // const defaultOption = "Активные";

    const [showMenu, setShowMenu] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const [selectedDate, setSelectedDate] = useState("не выбрано");

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
        setShowMenu(false);
        onChange(option);
    };

    return (
        <div className="menu-dropdown">
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
                        (option) =>
                            option !== selectedOption && (
                                <div className="menu-item">
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

