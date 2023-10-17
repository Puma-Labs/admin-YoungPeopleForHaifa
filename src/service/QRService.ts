import $api from '../http';
import { AxiosResponse } from 'axios'
import { IQR, QRPayload } from '../models/IQR';

export default class EventService {
  static async fetchList(): Promise<AxiosResponse<{qrList: IQR[]}>> {
    return (await $api.get<{qrList: IQR[]}>('/qr'))
  }

  static async fetchOne(id: string | undefined): Promise<AxiosResponse<IQR>> {
    return (await $api.get<IQR>(`/qr/${id}`))
  }

  static async fetchCreateOne(data: QRPayload): Promise<AxiosResponse<boolean>> {
    return (await $api.post<boolean>('/qr', data))
  }

  static async fetchUpdateOne(data: IQR): Promise<AxiosResponse<boolean>> {
    return (await $api.put<boolean>(`/qr/${data._id}`, data))
  }

  static async fetchDeleteOne(id: string | undefined): Promise<AxiosResponse<boolean>> {
    return (await $api.delete<boolean>(`/qr?id=${id}`))
  }
}
