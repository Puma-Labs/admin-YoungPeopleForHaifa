import "./styles.sass";

import React, { FC, useState, useEffect } from "react";
import { useStore } from "../../context/StoreContext";
import { observer } from "mobx-react-lite";
import moment from "moment";
import "moment/locale/ru";
import FilterBar from "./filterBar/FilterBar";
import EventForm from "./eventForm/EventForm";
import OptionsMenu from "./optionsMenu/OptionsMenu";
import Emptiness from "../../components/UI/emptiness_/Emptiness";
import AddButton from "../../components/UI/addButton/AddButton";
import Event from "./Event";
import SearchInput from "../../components/UI/searchInput/SearchInput";
import MenuDropdown from "../../components/UI/menuDropdown/MenuDropdown";
import StatItem from "../../components/statItem/statItem";
import coverEmpty from "../../assets/images/preview-empty.png";
import coverImg from "../../assets/images/preview.png";
import { IEvent } from "../../models/IEvent";
import Spinner from "../../components/UI/spinner/Spinner";
import Modal from "../../components/modal_/Modal";

const Events: FC = () => {
    const { events } = useStore();

    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
    const [isOptionsMenuOpen, setOptionsMenuOpen] = useState(false);
    const [isFormOpen, setFormOpen] = useState(false);
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [pendingSelectedEvent, setPendingSelectedEvent] = useState<IEvent | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        events
            .loadList()
            .then(() => {})
            .catch((err) => {
                console.error(err);
            });
    }, [events]);

    useEffect(() => {
        setSelectedEvent(pendingSelectedEvent);
    }, [isOptionsMenuOpen]);

    useEffect(() => {
        events.getAllEvents(getEventsByDate());
    }, [selectedDate]);

    const getEventsByDate = () => {
        if (!selectedDate) return events.eventsList;

        return events.eventsList.filter((event) => {
            return moment(event.date).format("DD.MM.YYYY") === moment(selectedDate).format("DD.MM.YYYY");
        });
    };

    const handleOptionsClick = (event: IEvent) => {
        setPendingSelectedEvent(event);
        setOptionsMenuOpen(true);
    };

    const handleEdit = (event: IEvent) => {
        setSelectedEvent(event);
        setFormOpen(true);
        setOptionsMenuOpen(false);
    };

    const handleDelete = (event: IEvent | null) => {
        setSelectedEvent(event);
        setDeleteConfirmationOpen(true);
        setOptionsMenuOpen(false);
    };

    const handleDeleteConfirmed = () => {
        if (selectedEvent) {
            events
                .deleteOne(selectedEvent)
                .then(() => {})
                .catch((err) => {
                    console.error(err);
                });

            setSelectedEvent(null);
        }

        setFormOpen(false);
        setDeleteConfirmationOpen(false);
    };

    const handleAddNewEvent = () => {
        setSelectedEvent(null);
        setFormOpen(true);
    };

    return (
        <>
            <FilterBar
                events={events.eventsList}
                disabled={events.eventsList.length === 0 || events.loadingEventsBool}
                onFilterByDate={(date) => setSelectedDate(date)}
            />

            {events.eventsList.length > 0 && !events.loadingEventsBool && Object.keys(events.allEvents).length ? (
                <div className="container events">
                    {!selectedDate && (
                        <div className="events-container upcoming-events">
                            <div className="title">Ближайшие мероприятия</div>
                            {Object.keys(events.upcomingEvents).map((monthYear) => (
                                <div className="month-events" key={monthYear}>
                                    <div className="top">
                                        <button className="arrow-btn">
                                            <span className="arrow _icon-ico-arrow-s"></span>
                                        </button>
                                        <span className="monthYear">{`${monthYear[0].toUpperCase()}${monthYear.slice(
                                            1
                                        )}`}</span>
                                        <span className="eventsCount">{`${events.upcomingEvents[monthYear].length} Событий`}</span>
                                    </div>
                                    <div className="events-wrapper">
                                        {events.upcomingEvents[monthYear].map((event) => (
                                            <Event
                                                key={event._id}
                                                event={event}
                                                isSelected={selectedEvent?._id === event._id}
                                                onOptionsClick={handleOptionsClick}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="events-container all-events">
                        {!selectedDate && <div className="title">Все мероприятия</div>}

                        {Object.keys(events.allEvents).map((monthYear) => (
                            <div className="month-events" key={monthYear}>
                                <div className="top">
                                    <button className="arrow-btn">
                                        <span className="arrow _icon-ico-arrow-s"></span>
                                    </button>
                                    <span className="monthYear">{`${monthYear[0].toUpperCase()}${monthYear.slice(
                                        1
                                    )}`}</span>
                                    <span className="eventsCount">{`${events.allEvents[monthYear].length} Событий`}</span>
                                </div>
                                <div className="events-wrapper">
                                    {events.allEvents[monthYear].map((event) => (
                                        <Event
                                            key={event._id}
                                            event={event}
                                            isSelected={selectedEvent?._id === event._id}
                                            onOptionsClick={handleOptionsClick}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (events.eventsList.length === 0 && !events.loadingEventsBool) ||
              Object.keys(events.allEvents).length === 0 ? (
                <Emptiness addBtnText="Добавить меропритяие" className="no-events" onClick={handleAddNewEvent} />
            ) : (
                <Spinner />
            )}

            <EventForm
                isOpen={isFormOpen}
                onClose={() => {
                    setFormOpen(false);
                    setSelectedEvent(null);
                }}
                event={selectedEvent}
                onDelete={handleDelete}
            />
            <OptionsMenu
                event={selectedEvent}
                isOpen={isOptionsMenuOpen}
                onClose={() => {
                    setPendingSelectedEvent(null);
                    setOptionsMenuOpen(false);
                }}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <Modal
                showModal={isDeleteConfirmationOpen}
                title="Вы уверены?"
                message="Если вы удалите событие, то отменить это действие будет невозможно."
                buttons={[
                    {
                        onPress: handleDeleteConfirmed,
                        label: "Удалить",
                    },
                ]}
                cancelButton={{
                    onPress: () => {
                        setDeleteConfirmationOpen(false);
                        if (!isFormOpen) {
                            setSelectedEvent(null);
                        }
                    },
                    label: "Отмена",
                }}
            />

            <AddButton onClick={handleAddNewEvent} />
        </>
    );
};

export default observer(Events);

