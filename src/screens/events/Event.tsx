import "./styles.sass";

import React, { FC } from "react";
import { IEvent } from "../../models/IEvent";
import moment from "moment";
import coverEmpty from "../../assets/images/preview-empty.png";

interface EventProps {
    event: IEvent;
    isSelected: boolean;
    onOptionsClick: (event: IEvent) => void;
}

const Event: FC<EventProps> = ({ event, isSelected, onOptionsClick }) => {
    const handleOptionsClick = () => {
      onOptionsClick(event);
    };

    return (
        <div className={`event ${isSelected ? 'selected' : ''}`}>
            <div className="img-container">
                <img src={event.cover || coverEmpty} alt="cover"></img>
            </div>
            <div className="text">
                <div className="event-title">{event.title}</div>
                <div className="event-info">{`${moment(event.date).format("DD.MM.YYYY")} - ${moment(event.time).format(
                    "hh:mm"
                )} ${event.place}`}</div>
            </div>
            <button onClick={handleOptionsClick} className="menu-btn">
                <span className="_icon-ico-menu"></span>
            </button>
        </div>
    );
};

export default Event;

