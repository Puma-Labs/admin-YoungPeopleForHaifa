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
import { ReactComponent as EditIcon } from "../../../assets/icons/edit-icon.svg";
import { ReactComponent as HideIcon } from "../../../assets/icons/eye-hide-icon.svg";

interface OptionsMenuProps {
    event: IEvent | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit: (event: IEvent) => void;
    onDelete: (event: IEvent) => void;
}

const OptionsMenu: FC<OptionsMenuProps> = ({ event, isOpen, onClose, onEdit, onDelete }) => {
    const handleEdit = () => {
      if (event) {
        onClose();
        onEdit(event);
      }
    };

    const handleDelete = () => {
      if (event) {
        onClose();
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
                                <span className="icon _icon-ico-download"></span>
                                <span className="name">Добавить в архив</span>
                            </div>
                            <div onClick={handleEdit} className="menu-item">
                                <span className="icon">
                                    <EditIcon />
                                </span>
                                <span className="name">Изменить событие</span>
                            </div>
                            <div className="menu-item">
                                <span className="icon">
                                    <HideIcon />
                                </span>
                                <span className="name">Скрыть событие</span>
                            </div>
                            <div onClick={handleDelete} className="menu-item">
                                <span className="icon _icon-ico-trash"></span>
                                <span className="name">Удалить событие</span>
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

