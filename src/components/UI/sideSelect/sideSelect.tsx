import './styles.sass'

import React, { useState } from 'react'
import ShowMoreIcon from '../../../assets/icons/ShowMoreIcon'

interface SideSelectProps {
    list: any[],
    label?: string,
    selected: IListItem,
    defaultValue: string,
    onChange: (item: IListItem) => void,
    disabled?: boolean
}

export interface IListItem {
    value: string,
    label: string,
    default?: boolean
}

const SideSelect = (
    {
        list,
        label,
        onChange,
        selected,
        disabled = false
    }: SideSelectProps) => {

    const [show, setShow] = useState(false)

    function isSelected(value: string) {
        return value === selected.value
    }

    function onSelect(option: IListItem) {
        setShow(false)
        onChange(option)
    }

    return (
        <div className={`custom-select ${disabled ? 'disabled' : ''}`}>
            <div className="label">{label}</div>
            <div className="select">
                <div className={`select-container ${show ? 'open' : ''}`} onClick={() => setShow(!show)}>
                    <div className="selected-value">{selected.label}</div>
                    <span className="icon">
            <ShowMoreIcon color={'red'} />
          </span>
                </div>
                <ul className={`option-list ${show ? 'open' : ''}`} >
                    {list.map(option => (
                        <li
                            className={`option-item ${isSelected(option.value) ? 'selected' : ''}`}
                            onClick={() => onSelect(option)}
                            key={`${option.label}-${option.value}`}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SideSelect

