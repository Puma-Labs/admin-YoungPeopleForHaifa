import "./styles.sass";

import React, { FC, useState } from "react";

import { StaticDatePicker } from "@mui/x-date-pickers";
import moment from "moment";

interface DatePickerComponentProps {
    value?: string;
    onChange: () => void;
    disabled?: boolean;
}

const DatePickerComponent: FC<DatePickerComponentProps> = ({ value, onChange, disabled = false }) => {
    const [selectedDate, setSelectedDate] = useState(value || null);
    const [showCalendar, setShowCalendar] = useState(false);

    const handleSelectDate = () => {
        setShowCalendar(false);
        onChange();
    };

    return (
        <div className="menu-dropdown">
            <div className="menu-btn">
                <button
                    onClick={() => setShowCalendar((prev) => !prev)}
                    className={`btn-dropdown ${disabled ? "disabled" : ""} ${showCalendar ? "active" : ""}`}
                >
                    <span className={`icon _icon-ico-calendar`}></span>
                    <span className="status-text">{`Дата: ${
                        selectedDate ? moment(selectedDate).format("DD/MM/YYYY") : "не выбрано"
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
                        }}
                        onAccept={handleSelectDate}
                    />
                </div>
            )}
        </div>
    );
};

export default DatePickerComponent;

