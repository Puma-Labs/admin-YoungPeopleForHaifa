import "./styles.sass";

import React, { FC, useEffect } from "react";
import Button from "../UI/button/Button";

interface IButton {
  onPress: () => void;
  label: string;
}

interface IModal {
  showModal: boolean;
  title?: string;
  message: string;
  buttons: IButton[];
  cancelButton: IButton;
}

const Modal: FC<IModal> = ({ showModal, title, message, buttons, cancelButton }) => {

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && showModal) {
                cancelButton.onPress();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [cancelButton]);

    return (
        <>
            {showModal && (
                <div className="modal">
                    <div className="background" onClick={cancelButton.onPress}></div>
                    <div className="modal-card">
                        {title && <div className="title">{title}</div>}
                        <div className="message">{message}</div>
                        <div className="btn-container">
                          {buttons.map((button, index) => (
                                <Button
                                    label={button.label}
                                    stylesType="text"
                                    onClick={button.onPress}
                                    key={index}
                                />                           
                          ))}
                          <Button
                              label={cancelButton.label}
                              stylesType="text"
                              onClick={cancelButton.onPress}
                          />                          
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;

