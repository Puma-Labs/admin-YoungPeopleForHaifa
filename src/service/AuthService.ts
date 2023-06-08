import $api from '../http';
import {AxiosResponse} from 'axios'
import {AuthResponse} from '../models/response/AuthResponse';

export default class AuthService {
  static async login(email: string, password: string) : Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/user/login', {email, password})
  }

  static async registration(email: string, password: string) : Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/user/register', {email, password})
  }

  static async logout() : Promise<void> {
    return $api.post('/user/logout')
  }

  static async checkAuth() : Promise<AxiosResponse<AuthResponse>> {
      return $api.get<AuthResponse>('/refresh')
  }
}
