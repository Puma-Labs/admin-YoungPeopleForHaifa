import "./styles.sass";

import React, { FC, useEffect, useState } from "react";
import { IEvent } from "../../models/IEvent";
import { GroupedEvents } from "../../store/Events";
import Event from "./Event";

interface MonthProps {
    monthYear: string;
    events: GroupedEvents;
    selectedEvent: IEvent | null;
    onOptionsClick: (event: IEvent) => void;
}

const Month: FC<MonthProps> = ({ monthYear, events, selectedEvent, onOptionsClick }) => {
    const [showEvents, setShowEvents] = useState<boolean>(true);

    useEffect(() => {
        setShowEvents(true);
    }, [events]);

    return (
        <div className="month-events">
            <div className="top">
                <button
                    className={`arrow-btn ${showEvents ? "show" : "hide"}`}
                    onClick={() => setShowEvents((prev) => !prev)}
                >
                    <span className="arrow _icon-ico-arrow-s"></span>
                </button>
                <span className="monthYear">{`${monthYear[0].toUpperCase()}${monthYear.slice(1)}`}</span>
                <span className="eventsCount">{`${events[monthYear].length} Событий`}</span>
            </div>
            {showEvents && (
                <div className="events-wrapper">
                    {events[monthYear].map((event) => (
                        <Event
                            key={event._id}
                            event={event}
                            isSelected={selectedEvent?._id === event._id}
                            onOptionsClick={onOptionsClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Month;

