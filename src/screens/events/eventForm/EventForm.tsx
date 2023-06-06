import "./styles.sass";

import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../../../context/StoreContext";
import { useModal } from "../../../customHooks/useModal";
import { IEvent } from "../../../models/IEvent";
import Input from "../../../components/UI/input/Input";
import Emptiness from "../../../components/UI/emptiness_/Emptiness";
import AddButton from "../../../components/UI/addButton/AddButton";
import SearchInput from "../../../components/UI/searchInput/SearchInput";
import MenuDropdown from "../../../components/UI/menuDropdown/MenuDropdown";
import StatItem from "../../../components/statItem/statItem";
import { log } from "console";
import coverEmpty from "../../../assets/images/preview-empty.png";
import coverImg from "../../../assets/images/preview.png";

interface EventFormProps {
    showForm: boolean;
    onCloseForm: () => void;
    event?: IEvent;
}

const EventForm: FC<EventFormProps> = ({ showForm, onCloseForm, event }) => {
    const modal = useModal();
    const navigate = useNavigate();

    const { events } = useStore();

    const [formData, setFormData] = useState<IEvent>({} as IEvent);

    const [title, setTitle] = useState<string>(event ? "Редактирование" : "Новое событие");

    const [isFormValid, setIsFormValid] = useState(false);
    const [isFormEmpty, setIsFormEmpty] = useState(!!event);
    const [isPosting, setIsPosting] = useState(false);
    const [showError, setShowError] = useState(false);
    const [clearAll, setClearAll] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
        if (event) {
            setFormData(event);
        }
    }, [event]);

    const handleInputChange = (name: string, value: string) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCloseForm = () => {
        onCloseForm();
    };

    return (
        <>
            {showForm && (
                <div className="event-form">
                    <div className="background"></div>
                    <div className="form-card">
                        <div className="top">
                            <div className="title">{title}</div>
                            <button onClick={handleCloseForm} className="close-btn">
                                <span className="_icon-ico-plus"></span>
                            </button>
                        </div>
                        <div className="content">
                            <form>
                                <div className="section">
                                    <div className="section-title">Основная информация</div>
                                    <Input
                                        label="Название события"
                                        onChange={(title) => {
                                            handleInputChange("title", title);
                                        }}
                                        value={formData?.title || ""}
                                    />
                                    <Input
                                        label="Место проведения события"
                                        onChange={(place) => {
                                            handleInputChange("place", place);
                                        }}
                                        value={formData?.place || ""}
                                    />
                                    <Input
                                        label="Дата проведения"
                                        onChange={(date) => {
                                            handleInputChange("date", date);
                                        }}
                                        value={formData?.date || ""}
                                        placeholder="ДД.ММ.ГГ"
                                    />
                                    <Input
                                        label="Время проведения"
                                        onChange={(time) => {
                                            handleInputChange("time", time);
                                        }}
                                        value={formData?.time || ""}
                                    />
                                </div>
                                <div className="section">
                                    <div className="section-title">Обложка</div>
                                </div>
                                <div className="section">
                                    <div className="section-title">Текст статьи</div>
                                </div>
                                <div className="preview section">
                                    <div className="section-title">Превью</div>
                                    <div className="preview-card">
                                        <span className="dots _icon-ico-menu"></span>
                                        <div className="img-container">
                                            <img src={formData?.cover ? formData?.cover : coverEmpty} alt="cover"></img>
                                        </div>
                                        <div className="event-title">{formData?.title || ""}</div>
                                        <div className="event-info">
                                            {`${formData?.date && formData.date + " —"} ${formData?.time && formData.time + " —"} ${formData?.place || ""}`}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="bottom">
                            <button className="btn-delete">
                                <span className="_icon-ico-trash"></span>
                            </button>
                            <button className="submit-btn" type="submit">
                                {event ? "Обновить публикацию" : "Опубликовать"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EventForm;

