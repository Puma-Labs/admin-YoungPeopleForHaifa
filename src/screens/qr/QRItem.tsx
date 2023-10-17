import "./styles.sass";

import React, { FC } from "react";
import { IQR, QRId } from "../../models/IQR";
import moment from "moment";
import { getImageURL } from "../../utils";
import coverEmpty from "../../assets/images/preview-empty.png";

interface QRProps {
    qr: IQR;
    isSelected: boolean;
    onSelect: (id: QRId) => void;
}

const QRItem: FC<QRProps> = ({ qr, isSelected, onSelect }) => {
    const selectQR = () => {
      onSelect(qr._id);
    };

    const visit = () => {
        window.open(`${process.env.REACT_APP_SERVER_HOST}/qr/${qr._id}`, '_blank')
    }

    const openQR = () => {

        window.open(`${process.env.REACT_APP_SERVER_HOST}/qr/${qr._id}/image`, '_blank')
    }

    return (
        <div className={`qr ${isSelected ? 'selected' : ''}`}>
            <div className="img-container">
                <img src={qr.svgURL} alt="svg" />
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
                </div>
            </div>
        </div>
    );
};

export default QRItem;

