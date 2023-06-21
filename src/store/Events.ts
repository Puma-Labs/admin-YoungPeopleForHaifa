import { IEvent } from "../models/IEvent";
import { EventStatus } from "../models/IEvent";
import { makeAutoObservable } from "mobx";
import EventService from "../service/EventService";
import moment from "moment";

export interface GroupedEvents {
    [key: string]: IEvent[];
}

export default class Events {
    eventsList: IEvent[] = [];
    event = {} as IEvent;
    loadingEventsBool: boolean = false;
    archivedEvents: IEvent[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setEventsList(eventList: IEvent[]) {
        this.eventsList = eventList;
    }

    setEvent(event: IEvent) {
        this.event = event;
    }

    setLoadingEventsBool(newValue: boolean) {
        this.loadingEventsBool = newValue;
    }

    setArchivedEvents(archivedEvents: IEvent[]) {
        this.archivedEvents = archivedEvents;
    }

    groupEventsByMonth(eventsList: IEvent[]) {
        const groupedEvents = eventsList.reduce((acc: GroupedEvents, event) => {
            const monthYear = moment(event.date).format("MMMM, yyyy");
            if (!acc[monthYear]) {
                acc[monthYear] = [];
            }
            acc[monthYear].push(event);
            return acc;
        }, {});

        return groupedEvents;
    }

    getEventsByStatus(status: EventStatus) {
        const filteredEvents = this.eventsList.filter((event) => event.status === status);

        if (status === "archived") this.setArchivedEvents(filteredEvents);
    }

    async loadList() {
        this.setLoadingEventsBool(true);
        try {
            const EventsList = await EventService.fetchList();
            this.setEventsList(EventsList.data);

            this.getEventsByStatus("archived");
        } catch (err) {
            console.log(err);
        }

        this.setLoadingEventsBool(false);
    }

    async loadOne(id: string | undefined) {
        this.setLoadingEventsBool(true);

        if (typeof id !== "undefined") {
            const Event = await EventService.fetchOne(id);
            this.setEvent(Event.data);
        } else {
            console.error("not found");
        }

        this.setLoadingEventsBool(false);
    }

    async createOne(data: IEvent | undefined) {
        this.setLoadingEventsBool(true);

        if (typeof data !== "undefined") {
            const res = await EventService.fetchCreateOne(data);
            console.log(res);

            await this.loadList();
        } else {
            console.error("no data to send");
        }
        this.setLoadingEventsBool(false);
    }

    async updateOne(data: IEvent | undefined) {
        this.setLoadingEventsBool(true);
        if (typeof data !== "undefined") {
            const res = await EventService.fetchUpdateOne(data);
            console.log(res);
            await this.loadList();
        } else {
            console.log("no data to update");
        }
        this.setLoadingEventsBool(false);
    }

    async deleteOne(data: IEvent | undefined) {
        this.setLoadingEventsBool(true);
        if (typeof data !== "undefined") {
            await EventService.fetchDeleteOne(data._id);
            await this.loadList();
        } else {
            console.error("no data to delete");
        }
        this.setLoadingEventsBool(false);
    }
}

