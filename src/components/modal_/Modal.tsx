import "./styles.sass";

import React, { FC, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/UI/button/Button";
import { IEvent } from "../../models/IEvent";

interface IModal {
    showModal: boolean;
    title?: string;
    message: string;
    onCancel: () => void;
    onConfirm?: () => void;
    cancelButtonText: string;
    confirmButtonText?: string;
}

const Modal: FC<IModal> = ({ showModal, title, message, onCancel, onConfirm, cancelButtonText, confirmButtonText }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && showModal) {
                onCancel();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onCancel]);

    return (
        <>
            {showModal && (
                <div className="modal">
                    <div className="background" onClick={onCancel}></div>
                    <div className="modal-card">
                        {title && <div className="title">{title}</div>}
                        <div className="message">{message}</div>
                        <div className="btn-container">
                            {onConfirm && onCancel ? (
                                <>
                                    <Button label={cancelButtonText} stylesType="text" onClick={onCancel} />
                                    <Button
                                        label={confirmButtonText}
                                        stylesType="text"
                                        onClick={() => {
                                            onConfirm();
                                            onCancel();
                                        }}
                                    />
                                </>
                            ) : (
                                <Button label={cancelButtonText} stylesType="text" onClick={onCancel} />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;

