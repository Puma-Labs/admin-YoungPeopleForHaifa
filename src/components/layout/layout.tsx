import React from 'react';
import Emptiness from "../UI/emptiness/Emptiness";
import Spinner from "../UI/spinner/Spinner";
import Timofey from '../../assets/images/Timofey_avatar.png'

interface LayoutProps {
    emptinessText?: string,
    length: number,
    isLoading: boolean
    children: React.ReactNode
}

const Layout = ({emptinessText, length, isLoading, children}: LayoutProps) => {
    return (
        <>
            {length > 0 && !isLoading ? (
                children
            ) : !length && !isLoading ? (
                <Emptiness icon={Timofey} content={emptinessText}/>
            ) : <Spinner />
            }
        </>
    );
};

export default Layout;
