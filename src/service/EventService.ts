import $api from '../http';
import { AxiosResponse } from 'axios'
import { IEvent } from '../models/IEvent';

export default class EventService {
  static async fetchList(): Promise<AxiosResponse<IEvent[]>> {
    return (await $api.get<IEvent[]>('/events'))
  }

  static async fetchOne(id: string | undefined): Promise<AxiosResponse<IEvent>> {    
    return (await $api.get<IEvent>(`/events/${id}`))
  }

  static async fetchCreateOne(data: IEvent): Promise<AxiosResponse<boolean>> {
    return (await $api.post<boolean>('/events', data))
  }

  static async fetchUpdateOne(data: IEvent): Promise<AxiosResponse<boolean>> {
    return (await $api.put<boolean>('/events', data))
  }

  static async fetchDeleteOne(id: string | undefined): Promise<AxiosResponse<boolean>> {
    return (await $api.delete<boolean>(`/events?id=${id}`))
  }
}
