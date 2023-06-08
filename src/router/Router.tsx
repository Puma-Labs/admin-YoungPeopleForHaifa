import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import RouterData, { IRouteData } from './RouterData'
import Sidebar from '../components/sidebar/Sidebar';
import ProtectedRoute from "../components/protectedRoute/protectedRoute";

const RouterMain = () => {
    const getElement = (el: IRouteData) => {
        const isRestricted = typeof el.allowed !== 'undefined' && el.allowed.roles.length
        if (isRestricted) {
            return (
                    <ProtectedRoute
                            redirectPath={el.allowed?.redirectPath}
                            allowed={el.allowed?.roles}
                    >
                        {el.element}
                    </ProtectedRoute>)
        } else if (el.allowed?.redirectPath) {
          return <Navigate to={el.allowed?.redirectPath} replace />;
        }
        return el.element
    }


    const RenderListRouter: any = (itemList: any, parentPath: string) => {
        let RouteList: any[] = []

        for (let i = 0; i < itemList.length; i++) {
            const key = `${parentPath}${itemList[i].path}${Math.round(Math.random() * (3 - 100) + 100) + i}`.replace(/\//g, '')

            let pathMain = parentPath
            if(itemList[i].path.length && pathMain !== '/') {
                pathMain = pathMain + '/' + itemList[i].path
            } else {
                pathMain = pathMain + itemList[i].path
            }
            if (itemList[i].children && itemList[i].children.length > 0) {
                RouteList.push(RenderListRouter(itemList[i].children, pathMain))
            } else {
                RouteList.push(
                    <Route key={key} path={pathMain} element={getElement(itemList[i])} />
                )
            }
        }
        return RouteList
    }

    return (
        <BrowserRouter>
            <Sidebar />
            <main className="main">
                <div className="mainBody">
                    <Routes>
                        {RenderListRouter(RouterData, '/')}
                    </Routes>
                </div>
            </main>
        </BrowserRouter>
    );
};

export default RouterMain;
