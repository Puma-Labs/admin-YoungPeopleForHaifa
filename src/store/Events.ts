import { IEvent } from '../models/IEvent';
import { makeAutoObservable } from "mobx";
import EventService from "../service/EventService";

export default class Events {
    eventsList: IEvent[] = [];
    event = {} as IEvent;
    loadingEventsBool: boolean = false;

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

    async loadList() {
        this.setLoadingEventsBool(true);
        try {
            const EventsList = await EventService.fetchList();
            this.setEventsList(EventsList.data);
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

