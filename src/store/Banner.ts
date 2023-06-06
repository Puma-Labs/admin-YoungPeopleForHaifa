import {IBanner} from '../models/IBanner';
import {makeAutoObservable} from 'mobx';
import BannerService from '../service/BannerService';

export default class Banner {
  bannerList: IBanner[] = []
  loadingBannerBool: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  setBannerList(eventList: IBanner[]) {
    this.bannerList = eventList
  }

  async loadList(page = 1) {
    this.loadingBannerBool = true
    const bannerList = await BannerService.fetchList(page)
    this.setBannerList(bannerList.data);
    this.loadingBannerBool = false
  }

  async createOne(data: IBanner | undefined) {
    this.loadingBannerBool = true
    if(typeof data !== 'undefined') {
      await BannerService.fetchCreateOne(data)
      await this.loadList()
    } else {
      console.error("no data to send")
    }
    this.loadingBannerBool = false
  }
}
