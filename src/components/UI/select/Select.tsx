import './styles.sass'

import React, {useEffect, useState} from 'react'
import { CircleIcon, TickCircleIcon, ArrowDown } from '../../../assets/icons'

interface SelectProps {
    list: IListItem[],
    label?: string,
    defaultValue?: string,
    onChange: (item: IListItem) => void,
    selected: IListItem
}

export interface IListItem {
    value: string,
    label: string,
    default?: boolean
}

const Select = ({ list, label, defaultValue, onChange, selected }: SelectProps) => {
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        document.body.addEventListener('click', handleBodyClick)
        return () => {
            document.body.removeEventListener('click', handleBodyClick)
        }
    }, [])

    function handleBodyClick(e: MouseEvent) {
        const target = e.target as HTMLElement
        console.log()
        if (!(target?.closest('.form-select'))) setOpen(false)
    }

    function isSelected(value: string) {
        return value === selected.value
    }

    function onSelect(option: IListItem) {
        setOpen(false)
        onChange(option)
    }

    return (
        <div className='form-select'>
            <div className="label">{label}</div>
            <div className={`input-container ${open ? 'open' : 'closed'}`} onClick={() => setOpen(!open)}>
                <div className="selected-option">{selected.label || 'Select'}</div>
                <span className="icon">
                    <ArrowDown color={open ? "#574BC9" : "#73777F"} />
                </span>
            </div>
            <ul className={`options ${open ? 'open' : 'closed'}`}>
                {list.map(item => (
                    <li className="option" onClick={() => onSelect(item)} key={`${item.value}`}>
                        <span className="indicator">
                          {isSelected(item.value) ?
                              <TickCircleIcon color={'#574BC9'} />
                              : <CircleIcon color='#73777F' />}
                        </span>
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Select
