import $api from '../http';
import {AxiosResponse} from 'axios'
import {IBanner} from '../models/IBanner';

export default class BannerService {
  static async fetchList(page = 1) : Promise<AxiosResponse<IBanner[]>> {
    return (await $api.get<IBanner[]>(`/banner?page=${page}`))
  }

  static async fetchCreateOne(data: IBanner) : Promise<AxiosResponse<boolean>> {
    return (await $api.put<boolean>('/banner/create', data))
  }
}
