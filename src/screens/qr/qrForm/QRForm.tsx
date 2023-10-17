import "./styles.sass";

import React, { FC, useEffect, useState, FormEvent } from "react";
import { useStore } from "../../../context/StoreContext";
import { IQR, QRId, QRPayload } from "../../../models/IQR";
import { getImageURL } from "../../../utils";
import Input from "../../../components/UI/input/Input";
import ImageLoader from "../../../components/imageLoader_/ImageLoader";
import coverEmpty from "../../../assets/images/preview-empty.png";
import { DateFieldComponent, TimeFieldComponent } from "../../../components/dateTimeFields/DateTimeFieldComponents";
import TextEditor from "../../../components/textEditor/TextEditor";
import moment from "moment";

interface QRFormProps {
    isOpen: boolean;
    onClose: () => void;
    qrData: IQR | null;
    onDelete: (id: QRId | null) => void;
}

const EventForm: FC<QRFormProps> = ({ isOpen, onClose, qrData, onDelete }) => {
    const { qr } = useStore();

    const [formData, setFormData] = useState<QRPayload>({});
    const [title, setTitle] = useState<"Редактирование" | "Новое событие">("Новое событие");
    const [submitBtnText, setSubmitBtnText] = useState<"Обновить публикацию" | "Опубликовать">("Опубликовать");
    const [isFormEmpty, setIsFormEmpty] = useState<boolean>(true);
    const [isPosting, setIsPosting] = useState<boolean>(false);
    const [previewImg, setPreviewImg] = useState<string>("");

    useEffect(() => {
        if (qrData) {
            console.log('if (qrData)', qrData);
            
            assignForm(qrData);

            console.log('if (qrData)', formData);
            setTitle("Редактирование");
            setSubmitBtnText("Обновить публикацию");
            setIsFormEmpty(false);
        } else {
            console.log('if (!qrData)', qrData);
            assignForm({} as IQR);
            setTitle("Новое событие");
            setSubmitBtnText("Опубликовать");
        }
    }, [qrData]);

    useEffect(() => {
        setIsFormEmpty(checkIsFormEmpty());
    }, [formData]);

    const checkIsFormEmpty = () => {
        if (Object.keys(formData).length > 0) {
            return true;
        }

        return false;
    };

    function assignForm (form: QRPayload): void {
        setFormData((old) => ({...form, ...old}))
    }

    const handleInputChange = (name: string, value: string | Date | null) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImgChange = (newImage: string) => {
      setPreviewImg(newImage);
      setFormData((prevData) => ({ ...prevData, cover: newImage }));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!qrData) {
            qr.createOne(formData).then(() => {
                setIsPosting(false);
            })
            .catch((err) => {
                console.error(err);
            });
        } else {
            console.log('else', {
                _id: qrData._id,
                ...formData
            });
            
            qr.updateOne({
                _id: qrData._id,
                ...formData
            }).then(() => {
                setIsPosting(false);
            }).catch((err) => {
                console.error(err);
            });
        }

        handleClose();
    };

    const handleDelete = () => {
        if (!isFormEmpty) {
            // onDelete();
        }
    };

    const handleClose = () => {
        setTitle("Новое событие");
        setSubmitBtnText("Опубликовать");
        setFormData({} as IQR);
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
                                        label="Заголовок"
                                        onChange={(title) => {
                                            handleInputChange("title", title);
                                        }}
                                        value={formData?.title || ""}
                                    />
                                </div>
                                <div className="section">
                                    <div className="section-title">Контент</div>
                                    <TextEditor
                                        onChange={(content) => handleInputChange("content", content)}
                                        value={formData?.content || ""}
                                    />
                                </div>
                                
                                <div className="section">
                                    <div className="section-title">Google sheet</div>
                                    <Input
                                        label="Google sheet"
                                        onChange={(url) => {
                                            handleInputChange("sheetURL", url);
                                        }}
                                        value={formData?.sheetURL || ""}
                                    />
                                </div>
                                {
                                    formData.svgURL && (
                                        <div className="section">
                                            <div className="section-title">QR</div>
                                            <a href={formData.svgURL} target="_blank">
                                                <img src={formData.svgURL} alt="QR" style={{
                                                    width: '100%',
                                                }} />    
                                            </a>        
                                        </div>
                                    )
                                }
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

