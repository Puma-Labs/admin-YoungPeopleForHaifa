import "./styles.sass";

import React, { FC, useState } from "react";
import SearchInput from "../../../components/UI/searchInput/SearchInput";
import MenuDropdown from "../../../components/UI/menuDropdown/MenuDropdown";
import DatePickerComponent from "../../../components/datePicker/DatePickerComponent";
import { IEvent } from "../../../models/IEvent";
import { EventStatus } from "../../../models/IEvent";
import archiveOpenedIcon from "../../../assets/icons/archive-icon-active.svg";

interface FilterBarProps {
    events: IEvent[];
    disabled: boolean;
    onFilterByDate: (date: Date | null) => void;
    onFilterByCategory: (category: "all" | "active" | "archived" | "hidden") => void;
    onShowArchive: () => void;
    archivedCount: number | null;
}

const FilterBar: FC<FilterBarProps> = ({
    events,
    disabled,
    onFilterByDate,
    onFilterByCategory,
    onShowArchive,
    archivedCount,
}) => {
    const defaultStatus = "Активные";
    const [status, setStatus] = useState(defaultStatus);
    const [showArchive, setShowArchive] = useState<boolean>(false);

    const handleStatusChange = (newStatus: string) => {
        setShowArchive(false);
        setStatus(newStatus);

        switch (newStatus) {
            case "Все":
                onFilterByCategory("all");
                break;
            case "Активные":
                onFilterByCategory("active");
                break;
            case "Скрытые":
                onFilterByCategory("hidden");
                break;
            default:
                onFilterByCategory("all");
                break;
        }
    };

    const handleShowArchive = () => {
        if (showArchive) {
            setShowArchive(false);
            handleStatusChange("Активные");
        } else {
            setShowArchive(true);
            setStatus("Архив");
            onShowArchive();
        }
    };

    return (
        <div className="filter-bar">
            <div className="title-container">
                <div className="title _icon-ico-list">
                    События /<span className="totalCount">{`Всего - ${events.length || 0}`}</span>
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
                        optionsList={["Все", "Активные", "Скрытые"]}
                        defaultOption={defaultStatus}
                        value={status}
                        disabled={disabled || showArchive}
                    />
                    <DatePickerComponent onChange={onFilterByDate} disabled={disabled} />
                    <button onClick={handleShowArchive} className="archive-btn" disabled={disabled}>
                        {showArchive ? (
                            <span className="icon active">
                                <img src={archiveOpenedIcon} alt="" />
                            </span>
                        ) : (
                            <>
                                <span className="icon _icon-ico-download"></span>
                                {archivedCount && <span className="badge">{archivedCount}</span>}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;

