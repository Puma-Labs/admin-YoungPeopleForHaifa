import "./styles.sass";

import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import Input from "../../../components/UI/input/Input";
import Emptiness from "../../../components/UI/emptiness_/Emptiness";
import AddButton from "../../../components/UI/addButton/AddButton";
import SearchInput from "../../../components/UI/searchInput/SearchInput";
import MenuDropdown from "../../../components/UI/menuDropdown/MenuDropdown";
import StatItem from "../../../components/statItem/statItem";
import { log } from "console";
import coverEmpty from "../../../assets/images/preview-empty.png";
import coverImg from "../../../assets/images/preview.png";
import editIcon from "../../../assets/icons/edit-icon.svg";
import { IEvent } from "../../../models/IEvent";
import { EventStatus } from "../../../models/IEvent";
import { ReactComponent as EditIcon } from "../../../assets/icons/edit-icon.svg";
import { ReactComponent as HideIcon } from "../../../assets/icons/eye-hide-icon.svg";

interface OptionsMenuProps {
    event: IEvent | null;
    isOpen: boolean;
    onClose: () => void;
    onStatusChange: (event: IEvent, status: EventStatus) => void;
    onEdit: (event: IEvent) => void;
    onDelete: (event: IEvent) => void;
}

const OptionsMenu: FC<OptionsMenuProps> = ({ event, isOpen, onClose, onStatusChange, onEdit, onDelete }) => {
    const handleStatusChange = (status: EventStatus) => {
        if (event) {
            const newStatus = !event.status || event.status !== status ? status : null;
            onStatusChange(event, newStatus);
        }
    };

    const handleEdit = () => {
        if (event) {
            onEdit(event);
        }
    };

    const handleDelete = () => {
        if (event) {
            onDelete(event);
        }
    };

    return (
        <>
            {isOpen && (
                <div className="options-menu">
                    <div className="background"></div>
                    <div className="menu-card">
                        <div className="top">
                            <div className="title">Настройки</div>
                        </div>
                        <div className="menu">
                            <div className="menu-item">
                                <label htmlFor="archive-checkbox" className="label checkbox-container">
                                    <span className="icon _icon-ico-download"></span>
                                    <span className="name">Добавить в архив</span>
                                    <input
                                        checked={event?.status === "archived"}
                                        onChange={() => handleStatusChange("archived")}
                                        type="checkbox"
                                        id="archive-checkbox"
                                    />
                                    <span className="checkmark">
                                        <img src="/icons/tick.svg" alt="checked" className="tick" />
                                    </span>
                                </label>
                            </div>
                            <div onClick={handleEdit} className="menu-item">
                                <label className="label">
                                    <span className="icon">
                                        <EditIcon />
                                    </span>
                                    <span className="name">Изменить событие</span>
                                </label>
                                <span className="arrow-icon _icon-ico-arrow-filled"></span>
                            </div>
                            <div className="menu-item">
                                <label htmlFor="hide-checkbox" className="label checkbox-container">
                                    <span className="icon">
                                        <HideIcon />
                                    </span>
                                    <span className="name">Скрыть событие</span>
                                    <input
                                        checked={event?.status === "hidden"}
                                        onChange={() => handleStatusChange("hidden")}
                                        type="checkbox"
                                        id="hide-checkbox"
                                    />
                                    <span className="checkmark">
                                        <img src="/icons/tick.svg" alt="checked" className="tick" />
                                    </span>
                                </label>
                            </div>
                            <div onClick={handleDelete} className="menu-item">
                                <label className="label">
                                    <span className="icon _icon-ico-trash"></span>
                                    <span className="name">Удалить событие</span>
                                </label>
                            </div>
                        </div>
                        <div className="bottom">
                            <button onClick={() => onClose()} className="close-btn">
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            )}
            ;
        </>
    );
};

export default OptionsMenu;

