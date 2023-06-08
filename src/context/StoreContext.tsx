import React, {createContext, useContext} from 'react'
import Auth from '../store/Auth';
import Banner from '../store/Banner';
import Events from '../store/Events';

interface StoreProps {
    children: React.ReactNode
}

interface State {
    auth: Auth,
    banner: Banner,
    events: Events;
}

const auth = new Auth();
const banner = new Banner();
const events = new Events();

const Context = createContext<State>({
    auth,
    banner,
    events
})

export const useStore = () => useContext(Context)

const StoreProvider = ({children} : StoreProps) => {
    return (
        <Context.Provider value={{ auth, banner, events }}>
            {children}
        </Context.Provider>
    )
}

export default StoreProvider
