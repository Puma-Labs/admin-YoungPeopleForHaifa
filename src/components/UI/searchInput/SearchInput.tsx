import "./styles.sass";

import React, { FC } from "react";

interface SearchInputProps {
  disabled?: boolean;
}

const SearchInput: FC<SearchInputProps> = ({ disabled = false }) => {
    return (
      <div className="input-container">
        <input type="text" className="search-input" placeholder="Поиск..." disabled={disabled} />
        <span className={`icon _icon-ico-search ${disabled && 'disabled'}`}></span>
      </div>
    );
};

export default SearchInput;
