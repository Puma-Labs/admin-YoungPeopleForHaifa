import React, {createContext, useContext} from 'react'
import Auth from '../store/Auth';
import Banner from '../store/Banner';
import Events from '../store/Events';
import QR from '../store/QR';

interface StoreProps {
    children: React.ReactNode
}

interface State {
    auth: Auth,
    banner: Banner,
    events: Events;
    qr: QR;
}

const auth = new Auth();
const banner = new Banner();
const events = new Events();
const qr = new QR();

const Context = createContext<State>({
    auth,
    banner,
    events,
    qr
})

export const useStore = () => useContext(Context)

const StoreProvider = ({children} : StoreProps) => {
    return (
        <Context.Provider value={{ auth, banner, events, qr }}>
            {children}
        </Context.Provider>
    )
}

export default StoreProvider
