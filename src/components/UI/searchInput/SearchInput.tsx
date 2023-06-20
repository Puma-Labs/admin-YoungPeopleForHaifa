import "./styles.sass";

import React, { FC, useState } from "react";

interface SearchInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const SearchInput: FC<SearchInputProps> = ({ onChange, disabled = false }) => {

    return (
      <div className="input-container">
        <input type="text" className="search-input"  placeholder="Поиск..." disabled={disabled} onChange={onChange} />
        <span className={`icon _icon-ico-search ${disabled && 'disabled'}`}></span>
      </div>
    );
};

export default SearchInput;
