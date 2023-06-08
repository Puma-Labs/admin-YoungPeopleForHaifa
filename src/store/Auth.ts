import {IUser} from '../models/IUser';
import {makeAutoObservable} from 'mobx';
import AuthService from '../service/AuthService';

export default class Auth {
    user = {
        role: 1
    } as IUser;
    isAuth = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    async login(email: string, password: string, remember: boolean) {
        const res = await AuthService.login(email, password, remember);
        localStorage.setItem('token', res.data.accessToken);
        this.setUser(res.data.user);
        this.setAuth(true);
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setUser({} as IUser);
            this.setAuth(false);
        } catch (e: any) {
            console.error(e.response?.data?.message)
        }
    }

    async checkAuth() {
        try {          
            const res = await AuthService.checkAuth();
            localStorage.setItem('token', res.data.accessToken);
            this.setUser(res.data.user);
            this.setAuth(true);
        } catch (e: any) {
            console.error(e.response?.data?.message)
        }
    }
}
