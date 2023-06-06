import "./styles.sass";

import React, { FC } from "react";
import avatarImg from "../../../assets/images/emptiness-avatar.png";

interface EmptinessProps {
  addBtnText: string;
  className?: string;
  onClick?: () => void; 
}

const Emptiness: FC<EmptinessProps> = ({ addBtnText, className, onClick }) => {
    return (
        <div className={`emptiness ${className || ""}`}>
            <div className="avatar-bg">
                <img src={avatarImg} alt="" />
            </div>
            <button onClick={onClick} className="add-btn">
              <span>+</span>
              {addBtnText}
            </button>
        </div>
    );
};

export default Emptiness;

