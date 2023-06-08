import React from 'react'
import Events from '../screens/events';
import Users from '../screens/users';
import {Outlet} from "react-router-dom";
import Notifications from "../screens/notifications";
import BannerList from "../screens/banner";
import Dashboard from "../screens/dashboard";

export interface IRouteData {
    title: string,
    path: string,
    element?: any,
    icon?: any,
    visible: boolean,
    children?: IRouteData[],
    allowed?: {
        redirectPath: string,
        roles: number[]
    },
}

const RouteData: IRouteData[] = [
    {
        title: 'Dashboard',
        path: '',
        visible: false,
        element: <Outlet />
    },

    {
        title: "",
        path: "admin",
        visible: false,
        children: [
            {
                title: "События",
                path: "events",
                visible: true,
                icon: <span className='icon _icon-ico-list'></span>,
                element: <Events />,
            },
            {
                title: "Users",
                path: "users",
                visible: true,
                icon: <span className='icon _icon-ico-doc'></span>,
                element: <Users />,
            },
        ]
    },

    {
        title: "404",
        path: "*",
        element: Dashboard,
        visible: false,
        icon: "404",
    },
]

export default RouteData;
