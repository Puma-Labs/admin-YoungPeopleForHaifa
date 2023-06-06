import React from 'react';
import {NavLink} from "react-router-dom";
import {IRouteData} from "../../router/RouterData";

interface CustomLinkProps {
    childItem: IRouteData,
    to: string
}

const CustomLink = ({childItem, to}: CustomLinkProps) => {
    const baseClassName = "itemChild"

    return (
            <div className="itemChildContainer">
                <NavLink
                        to={to}
                        className={({isActive}) => isActive ? `${baseClassName} active` : baseClassName}>
                    <div className="icon-container">{childItem.icon}</div>
                    <div className="name">{childItem.title}</div>
                </NavLink>
            </div>
    );
};

export default CustomLink;
