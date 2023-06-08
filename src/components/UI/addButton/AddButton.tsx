import "./styles.sass";

import React, { FC } from "react";
// import avatarImg from "../../../assets/images/emptiness-avatar.png";

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: FC<AddButtonProps> = ({ onClick }) => {
    return (
        <button className="add-button" onClick={onClick}>
          <span>+</span>
          Добавить
        </button>
    );
};

export default AddButton;
