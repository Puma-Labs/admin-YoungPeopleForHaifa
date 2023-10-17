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

    return (
        <div className={`qr ${isSelected ? 'selected' : ''}`}>
            <div className="img-container">
                <img src={qr.svgURL} alt="svg" />
            </div>
            <div className="qr-desc">
                <h4 className="qr-title">
                    { qr.title }
                </h4>
                <button className="qr-btn" onClick={selectQR}>
                    Edit
                </button>
            </div>
        </div>
    );
};

export default QRItem;

