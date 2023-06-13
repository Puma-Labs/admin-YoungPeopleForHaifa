import "./styles.sass";

import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import Emptiness from "../../../components/UI/emptiness_/Emptiness";
import AddButton from "../../../components/UI/addButton/AddButton";
import SearchInput from "../../../components/UI/searchInput/SearchInput";
import MenuDropdown from "../../../components/UI/menuDropdown/MenuDropdown";
import StatItem from "../../../components/statItem/statItem";
import DatePickerComponent from "../../../components/datePicker/DatePickerComponent";
import { IEvent } from "../../../models/IEvent";


interface FilterBarProps {
  events: IEvent[];
  disabled: boolean;
  onFilterByDate: (date: Date | null) => void;
}

const FilterBar: FC<FilterBarProps> = ({ events, disabled, onFilterByDate }) => {
    const defaultStatus = "Активные";
    const [status, setStatus] = useState(defaultStatus);
    const [date, setDate] = useState("");

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
    };

    return (
        <div className="filter-bar">
            <div className="title-container">
                <div className="title _icon-ico-list">
                    События /<span className="totalCount">{`Всего - ${events.length}`}</span>
                </div>
                <button className="button-share">
                    <span className="_icon-ico-share"></span>
                </button>
            </div>
            <div className="filter">
                <div className="container-left">
                    <span className={`status-info ${disabled && "disabled"}`}>{status}</span>
                    <SearchInput disabled={disabled} />
                </div>
                <div className="container-right">
                    <MenuDropdown
                        onChange={handleStatusChange}
                        type="optionsMenu"
                        optionsList={["Все", "Активные", "Удаленные", "Скрытые"]}
                        defaultOption={defaultStatus}
                        disabled={disabled}
                    />
                    <DatePickerComponent onChange={onFilterByDate} disabled={disabled} />
                    <button className="archive-btn" disabled={disabled}>
                        <span className="icon _icon-ico-download"></span>
                        <span className="badge">3</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;

