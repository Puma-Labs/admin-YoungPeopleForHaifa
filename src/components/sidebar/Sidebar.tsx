import "./styles.sass";

import React, { FC, useEffect, useState } from "react";
import RouterData, { IRouteData } from "../../router/RouterData";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import CustomLink from "./customLink";
import logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar-small.png";

export interface IRenderItem {
    item: IRouteData;
}

const Sidebar: FC = () => {
    const { auth } = useStore();
    const [usePathname, setUsePathname] = useState<string>("");
    const location = useLocation();

    const isAllowed = (item: IRouteData) =>
        item.allowed?.roles.includes(auth.user.role) || typeof item.allowed === "undefined";

    useEffect(() => {
        setUsePathname(location.pathname);
    }, [location]);

    const RenderItem: FC<IRenderItem> = ({ item }) => {
        return (
            <>
                {item.children?.length ? (
                    <div className="nav-container">
                        <div className={`item ${usePathname === item.path && "active"}`}>
                            <div className="name">{item.title}</div>
                        </div>
                        {item.children.map((itemChild) => {
                            if (isAllowed(itemChild)) {
                                return (
                                    <CustomLink
                                        key={`${item.path}/${itemChild.path}`}
                                        childItem={itemChild}
                                        to={`${item.path}/${itemChild.path}`}
                                    />
                                );
                            }
                        })}
                    </div>
                ) : (
                    <>
                        {item.visible && (
                            <Link to={item.path} className={`item ${usePathname === item.path && "active"}`}>
                                <div className="icon-container">{item.icon}</div>
                                <div className="name">{item.title}</div>
                            </Link>
                        )}
                    </>
                )}
            </>
        );
    };

    return (
        <div className={`sidebar`}>
            <div className="sidebar-container">
                <div className="logo">
                  <img src={logo} alt=""></img>
                </div>
                <nav className="nav">
                    {RouterData.map((item, index) => (
                        <RenderItem item={item} key={`sidebar-item-${index}`} />
                    ))}
                </nav>
                <div className="avatar">
                  <img src={avatar} alt=""></img>
                </div>                
                {/* <button
                    className="logout"
                    onClick={() => {
                        auth.logout().then();
                    }}
                >
                    <div className="icon">
                        <img src="/icons/logout.svg" alt="logout" />
                    </div>
                    <div className="name">Logout</div>
                </button> */}
            </div>
        </div>
    );
};

export default Sidebar;

