import "./styles.sass";

import React, { FC, useEffect, useState, FormEvent } from "react";
import { useStore } from "../../../context/StoreContext";
import { IEvent } from "../../../models/IEvent";
import { getImageURL } from "../../../utils";
import Input from "../../../components/UI/input/Input";
import ImageLoader from "../../../components/imageLoader_/ImageLoader";
import coverEmpty from "../../../assets/images/preview-empty.png";
import { DateFieldComponent, TimeFieldComponent } from "../../../components/dateTimeFields/DateTimeFieldComponents";
import TextEditor from "../../../components/textEditor/TextEditor";
import moment from "moment";

interface EventFormProps {
    isOpen: boolean;
    onClose: () => void;
    event: IEvent | null;
    onDelete: (event: IEvent | null) => void;
}

const EventForm: FC<EventFormProps> = ({ isOpen, onClose, event, onDelete }) => {
    const { events } = useStore();

    const [formData, setFormData] = useState<IEvent>(event || ({} as IEvent));
    const [title, setTitle] = useState<"Редактирование" | "Новое событие">("Новое событие");
    const [submitBtnText, setSubmitBtnText] = useState<"Обновить публикацию" | "Опубликовать">("Опубликовать");
    const [isFormEmpty, setIsFormEmpty] = useState<boolean>(true);
    const [isPosting, setIsPosting] = useState<boolean>(false);
    const [previewImg, setPreviewImg] = useState<string>("");

    useEffect(() => {
        if (event) {
            setFormData(event);
            setTitle("Редактирование");
            setSubmitBtnText("Обновить публикацию");
            setIsFormEmpty(false);
        } else {
            setFormData({} as IEvent);
            setTitle("Новое событие");
            setSubmitBtnText("Опубликовать");
        }
    }, [event]);

    useEffect(() => {
        setIsFormEmpty(checkIsFormEmpty());
    }, [formData]);

    const checkIsFormEmpty = () => {
        if (Object.keys(formData).length === 0) {
            return true;
        }

        const { title, place, date, cover, text } = formData;
        if (title || place || date || cover || text) {
            return false;
        }

        return true;
    };

    const handleInputChange = (name: string, value: string | Date | null) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImgChange = (newImage: string) => {
      setPreviewImg(newImage);
      setFormData((prevData) => ({ ...prevData, cover: newImage }));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // if (error) {
        //   setShowError(true);
        // } else {
        //   setIsPosting(true);
        console.log('data', formData);


        if (!event) {
            events
                .createOne(formData)
                .then(() => {
                    setIsPosting(false);
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            events
                .updateOne(formData)
                .then(() => {
                    setIsPosting(false);
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        handleClose();
    };

    const handleDelete = () => {
        if (!isFormEmpty) {
            onDelete(event);
        }
    };

    const handleClose = () => {
        setTitle("Новое событие");
        setSubmitBtnText("Опубликовать");
        setFormData({} as IEvent);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="event-form">
                    <div className="background"></div>
                    <div className="form-card">
                        <div className="top">
                            <div className="title">{title}</div>
                            <button onClick={handleClose} className="close-btn">
                                <span className="_icon-ico-plus"></span>
                            </button>
                        </div>
                        <div className="content">
                            <form onSubmit={handleSubmit}>
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
                                    <DateFieldComponent
                                        label="Дата проведения"
                                        onChange={(date) => {
                                            console.log('date', date)
                                            handleInputChange("date", date);
                                        }}
                                        value={formData?.date || null}
                                    />
                                    <TimeFieldComponent
                                        label="Время проведения"
                                        onChange={(time) => {
                                            console.log('time', time)
                                            handleInputChange("date", time);
                                        }}
                                        value={formData?.date || null}
                                    />
                                </div>
                                <div className="section">
                                    <div className="section-title">Обложка</div>
                                    <ImageLoader onChange={handleImgChange} image={formData?.cover || ""} />
                                </div>
                                <div className="section">
                                    <div className="section-title">Текст статьи</div>
                                    <TextEditor
                                        onChange={(text) => handleInputChange("text", text)}
                                        value={formData?.text || ""}
                                    />
                                </div>
                                <div className="preview section">
                                    <div className="section-title">Превью</div>
                                    <div className="preview-card">
                                        <span className="dots _icon-ico-menu"></span>
                                        <div className="img-container">
                                            {/* <img src={formData?.cover ? formData?.cover : coverEmpty} alt="cover"></img> */}
                                            <img src={formData.cover? getImageURL(formData.cover) : coverEmpty} alt="cover"></img>
                                        </div>
                                        <div className="event-title">{formData?.title || ""}</div>
                                        <div className="event-info">
                                            {`${
                                                formData?.date ? moment(formData.date).format("DD.MM.YYYY") + " —" : ""
                                            } ${formData?.date ? moment(formData.date).format("HH:mm") + " —" : ""} ${
                                                formData?.place || ""
                                            }`}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="bottom">
                            <button className="btn-delete" onClick={handleDelete}>
                                <span className="_icon-ico-trash"></span>
                            </button>
                            <button className="submit-btn" onClick={handleSubmit}>
                                {submitBtnText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EventForm;

