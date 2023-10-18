import { IQR, QRList, QRId, QRById, QRPayload } from "../models/IQR";
import {makeAutoObservable, runInAction} from "mobx";
import QRService from "../service/QRService";
import moment from "moment";

export interface GroupedQrs {
    [key: string]: IQR[];
}


export default class QR {
    ids: IQR['_id'][] = [];
    byId: Record<IQR['_id'], IQR> = {};
    selected: QRId | null = null;
    loadingQRBool: boolean = false;


    constructor() {
        makeAutoObservable(this);
    }

    setLoadingQRBool(newValue: boolean) {
        this.loadingQRBool = newValue;
    }

    selectQR (id: IQR['_id'] | null) {
        this.selected = id
    }

    getIds () {
        return Object.keys(this.byId) 
    }

    getById () {
        return this.byId
    }

    normalizeQRList (list: QRList): QRById {
        return runInAction(() => (list as IQR[]).reduce<QRById>((_: QRById, q: IQR): QRById => {
            const _id: QRId = q._id

            _[_id] = q

            return _
        }, {}))
    }

    async loadList() {
        this.setLoadingQRBool(true);
        try {
            const { qrList } = (await QRService.fetchList()).data;
            const normalized = this.normalizeQRList(qrList)

            runInAction(() => {
                this.byId = normalized
            })
        } catch (err) {
            console.log(err);
        }

        this.setLoadingQRBool(false);
    }

    async loadOne(id: string | undefined) {
        this.setLoadingQRBool(true);

        if (typeof id !== "undefined") {
            // const Event = await QRService.fetchOne(id);
            // this.setEvent(Event.data);
        } else {
            console.error("not found");
        }

        this.setLoadingQRBool(false);
    }

    async createOne(data: QRPayload | undefined) {
        this.setLoadingQRBool(true);

        if (typeof data !== "undefined") {
            const res = await QRService.fetchCreateOne(data);
            await this.loadList();
        } else {
            console.error("no data to send");
        }
        this.setLoadingQRBool(false);
    }

    async updateOne(data: IQR | undefined) {
        if (typeof data === "undefined") {
            console.log("no data to update");
            return;
        }
        this.setLoadingQRBool(true);
        const res = await QRService.fetchUpdateOne(data);
        await this.loadList();
        this.setLoadingQRBool(false);
    }

    async deleteOne(id: QRId | undefined) {
        this.setLoadingQRBool(true);
        if (id) {
            await QRService.fetchDeleteOne(id);
            await this.loadList();
        } else {
            console.error("no data to delete");
        }
        this.setLoadingQRBool(false);
    }
}

