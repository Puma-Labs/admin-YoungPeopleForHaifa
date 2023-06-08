import './styles.sass'

import React, { FC } from 'react';
import avatarImg from '../../../assets/images/emptiness-avatar.png'

export interface IEmptiness {
    icon: string,
    content?: string
}

const Emptiness: FC<IEmptiness> = ({ icon, content }) => {
    return (
        // <div className="item-is-nothing">
        //     <img src={icon} alt="avatar" />
        //     {content && (
        //         <span>{content}</span>
        //     )}
        // </div>
        <div className='emptiness'>
          <div className="avatar-bg">
            <img src='avatarImg' alt=''/>
          </div>
        </div>
    );
};

export default Emptiness;
