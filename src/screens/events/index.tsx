import "./styles.sass";

import React, { FC, useState, useEffect, useMemo } from "react";
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
import coverEmpty from "../../assets/images/preview-empty.png";
import coverImg from "../../assets/images/preview.png";
import { IEvent } from "../../models/IEvent";
import { EventStatus } from "../../models/IEvent";
import Spinner from "../../components/UI/spinner/Spinner";
import Modal from "../../components/modal_/Modal";

const Events: FC = () => {
    const { events } = useStore();

    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
    const [pendingSelectedEvent, setPendingSelectedEvent] = useState<IEvent | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<"all" | "active" | "archived" | "hidden">("active");
    const [isOptionsMenuOpen, setOptionsMenuOpen] = useState<boolean>(false);
    const [isFormOpen, setFormOpen] = useState<boolean>(false);
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);

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

    const handleStatusChange = (event: IEvent | null, status: EventStatus) => {
        if (event) {
            event.status = status;

            events
                .updateOne(event)
                .then(() => {})
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const handleShowArchive = () => {
        setSelectedCategory("archived");
    };

    const handleCategoryChange = (category: "all" | "active" | "archived" | "hidden") => {
        setSelectedCategory(category);
    };

    const getFilteredList = () => {
        let eventsList = events.eventsList;

        if (selectedDate) {
            eventsList = getEventsByDate(eventsList);
        }

        if (selectedCategory === "all") {
            return events.groupEventsByMonth(eventsList);
        }

        if (selectedCategory === "active") {
            const currentDate = moment().startOf("day");
            const activeEvents = eventsList.filter(
                (event) => moment(event.date).isSameOrAfter(currentDate) && !event.status
            );

            return events.groupEventsByMonth(activeEvents);
        }

        if (selectedCategory === "archived" || selectedCategory === "hidden") {
            const filteredEvents = eventsList.filter((event) => event.status === selectedCategory);
            return events.groupEventsByMonth(filteredEvents);
        }

        return events.groupEventsByMonth(eventsList);
    };

    const getUpcomingEvents = () => {
        const eventsList = Object.values(filteredList).flat();
        const eventsLimit = 6;
        const currentDate = moment().startOf("day");
        const upcomingEvents = eventsList.filter((event) => moment(event.date).isSameOrAfter(currentDate));
        upcomingEvents.sort((a, b) => moment(a.date, "YYYY-MM-DD").diff(moment(b.date, "YYYY-MM-DD")));

        return events.groupEventsByMonth(upcomingEvents.slice(0, eventsLimit));
    };

    const getEventsByDate = (eventsList: IEvent[]) => {
        if (!selectedDate) return eventsList;

        return eventsList.filter((event) => {
            return moment(event.date).format("DD.MM.YYYY") === moment(selectedDate).format("DD.MM.YYYY");
        });
    };

    const filteredList = useMemo(getFilteredList, [selectedCategory, selectedDate, events, []]);
    const upcomingEvents = useMemo(getUpcomingEvents, [selectedCategory, events, []]);

    return (
        <>
            <FilterBar
                events={events.eventsList}
                disabled={events.eventsList.length === 0 || events.loadingEventsBool}
                onFilterByDate={(date) => setSelectedDate(date)}
                onFilterByCategory={handleCategoryChange}
                onShowArchive={handleShowArchive}
                archivedCount={events.archivedEvents.length || null}
            />

            {events.eventsList.length > 0 && !events.loadingEventsBool && Object.keys(filteredList).length ? (
                <div className="container events">
                    {(selectedCategory === "all" || selectedCategory === "active") && !selectedDate && (
                        <div className="events-container upcoming-events">
                            <div className="title">Ближайшие мероприятия</div>
                            {Object.keys(upcomingEvents).map((monthYear) => (
                                <div className="month-events" key={monthYear}>
                                    <div className="top">
                                        <button className="arrow-btn">
                                            <span className="arrow _icon-ico-arrow-s"></span>
                                        </button>
                                        <span className="monthYear">{`${monthYear[0].toUpperCase()}${monthYear.slice(
                                            1
                                        )}`}</span>
                                        <span className="eventsCount">{`${upcomingEvents[monthYear].length} Событий`}</span>
                                    </div>
                                    <div className="events-wrapper">
                                        {upcomingEvents[monthYear].map((event) => (
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

                        {Object.keys(filteredList).map((monthYear) => (
                            <div className="month-events" key={monthYear}>
                                <div className="top">
                                    <button className="arrow-btn">
                                        <span className="arrow _icon-ico-arrow-s"></span>
                                    </button>
                                    <span className="monthYear">{`${monthYear[0].toUpperCase()}${monthYear.slice(
                                        1
                                    )}`}</span>
                                    <span className="eventsCount">{`${filteredList[monthYear].length} Событий`}</span>
                                </div>
                                <div className="events-wrapper">
                                    {filteredList[monthYear].map((event) => (
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
              Object.keys(filteredList).length === 0 ? (
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
                onStatusChange={handleStatusChange}
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

