import "./styles.sass";

import React, { FC } from "react";
import { IQR, QRId } from "../../models/IQR";

interface QRProps {
    qr: IQR;
    isSelected: boolean;
    onSelect: (id: QRId) => void;
    onDelete: (id: QRId) => void;
}

const QRItem: FC<QRProps> = ({ qr, isSelected, onSelect, onDelete }) => {
    const selectQR = () => {
      onSelect(qr._id);
    };

    const visit = () => {
        window.open(`${process.env.REACT_APP_SERVER_HOST}/qr/${qr._id}`, '_blank')
    }

    const openQR = () => {
        window.open(`${process.env.REACT_APP_SERVER_HOST}/qr/${qr._id}/image`, '_blank')
    }

    const deleteQR = () => {
        onDelete(qr._id)
    }

    return (
        <div className={`qr ${isSelected ? 'selected' : ''}`}>
            <div className="img-container">
                <img src={qr.svgURL} alt="qr svg preview" />
            </div>
            <div className="qr-desc">
                <h4 className="qr-title">
                    { qr.title }
                </h4>
                <div className="qr-buttons">
                    <button className="qr-btn" onClick={openQR}>
                        QR
                    </button>
                    <button className="qr-btn" onClick={visit}>
                        Visit
                    </button>
                    <button className="qr-btn" onClick={selectQR}>
                        Edit
                    </button>
                    <button className="qr-btn" onClick={deleteQR}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QRItem;

