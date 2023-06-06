import './styles.sass'

import React from 'react';
import {INotification} from "../../../models/INotification";

interface NotificationProps {
    item: INotification
}

const Notification = ({item: {title, message, date, when, time, status}}: NotificationProps) => {
    const formattedStatus =  () => {
        if (typeof status !== 'undefined') {
            return status?.slice(0, 1).toUpperCase() + status?.slice(1)
        }
    }

    return (
        <li className={"listItem"}>
            <h3 className={"itemTitle"}>{title}</h3>
            <p className={"itemMessage"}>{message}</p>
            <div className="itemDates">
                <span className={"itemDateLabel"}>
                    {when === '2' ? "Scheduled for:" : "Sent at:"}
                </span>
                <span className={"itemDate"}>{date}</span>
                <span className={"itemDate"}>({time})</span>
            </div>
            <span className={"itemStatus"}>{formattedStatus()}</span>
        </li>
    );
};

export default Notification;

