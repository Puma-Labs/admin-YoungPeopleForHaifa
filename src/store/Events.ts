import { IEvent } from "../models/IEvent";
import { makeAutoObservable } from "mobx";
import EventService from "../service/EventService";
import moment from "moment";

interface GroupedEvents {
    [key: string]: IEvent[];
}

export default class Events {
    eventsList: IEvent[] = [];
    event = {} as IEvent;
    loadingEventsBool: boolean = false;
    allEvents = {} as GroupedEvents;
    upcomingEvents = {} as GroupedEvents;

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

    // setGroupedEvents(groupedEvents: GroupedEvents) {
    //     this.groupedEvents = groupedEvents;
    // }

    setAllEvents(allEvents: GroupedEvents) {
      this.allEvents = allEvents;
  }

    setUpcomingEvents(upcomingEvents: GroupedEvents) {
      this.upcomingEvents = upcomingEvents;
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

        // const sortedKeys = Object.keys(groupedEvents).sort((a, b) => {
        //     const dateA = moment(a, "MMMM, yyyy");
        //     const dateB = moment(b, "MMMM, yyyy");
        //     return dateB.valueOf() - dateA.valueOf();
        // });

        // const sortedKeys = Object.keys(groupedEvents)

        // const sortedGroupedEvents: GroupedEvents = {};
        // sortedKeys.forEach((key) => {
        //     sortedGroupedEvents[key] = groupedEvents[key];
        // });

        // return sortedGroupedEvents;
        return groupedEvents;
    }

    getAllEvents(eventsList: IEvent[]) {      
      this.setAllEvents(this.groupEventsByMonth(eventsList));
    }

    getUpcomingEvents(eventsList: IEvent[]) {
      const eventsLimit = 6;
      const currentDate = moment().startOf('day');
      const upcomingEvents = eventsList.filter(event => moment(event.date).isSameOrAfter(currentDate));
      upcomingEvents.sort((a, b) => moment(a.date, 'YYYY-MM-DD').diff(moment(b.date, 'YYYY-MM-DD')));
      
      this.setUpcomingEvents(this.groupEventsByMonth(upcomingEvents.slice(0, eventsLimit)));  
    }

    async loadList() {
        this.setLoadingEventsBool(true);
        try {
            const EventsList = await EventService.fetchList();
            this.setEventsList(EventsList.data);

            this.getAllEvents(EventsList.data);
            this.getUpcomingEvents(EventsList.data);
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

