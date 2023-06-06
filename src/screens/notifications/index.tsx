import './styles.sass'

import React, {useState} from 'react';
import Header from "./Header";
import Notification from "./notification/Notification";
import Aside from "./Aside";
import Layout from "../../components/layout/layout";

const Notifications = () => {
    const [filters, setFilters] = useState<string[]>(['all'])

    const getNotifications = () => {
        const list = []
        for (let i = 0; i < 18; i++) {
            list.push(
                <Notification key={i} item={{
                    title: "My notification",
                    status: 'Completed',
                    message: "It's super urgent! Everything's on sale! Buy now!",
                    when: '1',
                    date: '21.08.1998',
                    time: '12:40'
                }}/>
            )
        }
        return list
    }

    return (
        <div className="grid notifications">
            <Header />
            <div className="body">
                <Layout
                    length={15}
                    isLoading={false}
                    emptinessText={"There are no notifications"}
                >
                    <ul className="itemsList">
                        {getNotifications()}
                    </ul>
                </Layout>
            </div>
            <Aside setFilters={setFilters} />
        </div>
    );
};

export default Notifications;
