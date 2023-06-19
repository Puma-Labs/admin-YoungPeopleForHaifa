import "./styles.sass";

import React, { FC, useState, useRef } from "react";
import useClickOutside from "../../customHooks/useClickOutside";

import { StaticDatePicker } from "@mui/x-date-pickers";
import Button from "../UI/button/Button";
import moment from "moment";

interface DatePickerComponentProps {
    value?: string;
    onChange: (date: Date | null) => void;
    disabled?: boolean;
}

const DatePickerComponent: FC<DatePickerComponentProps> = ({ value, onChange, disabled = false }) => {
    const [selectedDate, setSelectedDate] = useState(value || null);
    const [showCalendar, setShowCalendar] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useClickOutside(menuRef, () => setShowCalendar(false));

    return (
        <div className="menu-dropdown" ref={menuRef}>
            <div className="menu-btn">
                <button
                    onClick={() => setShowCalendar((prev) => !prev)}
                    className={`btn-dropdown ${disabled ? "disabled" : ""} ${showCalendar ? "active" : ""}`}
                >
                    <span className={`icon _icon-ico-calendar`}></span>
                    <span className="status-text">{`Дата: ${
                        selectedDate ? moment(selectedDate).format("DD.MM.YYYY") : "не выбрано"
                    }`}</span>
                    <span className="arrow _icon-ico-arrow-filled"></span>
                </button>
            </div>
            {showCalendar && !disabled && (
                <div className={`menu datePicker`}>
                    <StaticDatePicker
                        value={selectedDate}
                        onChange={(newDate) => {
                            setSelectedDate(newDate);
                            setShowCalendar(false);
                            onChange(newDate ? new Date(newDate) : null)
                        }}
                    />
                    <div className="action-buttons">
                      <Button label="Очистить" stylesType="text" onClick={() => {
                        setSelectedDate(null);
                        onChange(null);
                      }} />
                      <Button label="Закрыть" stylesType="text" onClick={() => {
                        setShowCalendar(false);
                      }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatePickerComponent;

