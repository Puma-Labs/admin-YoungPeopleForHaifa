import './styles.sass'

import React, {ChangeEvent, useEffect, useState} from 'react'
import Checkbox from "../UI/checkbox/Checkbox";
import openIcon from '../../assets/icons/open.svg'
import { observer } from 'mobx-react-lite'

interface FilterProps {
    title: string,
    list: IListItem[],
    className?: string,
    disabled?: boolean,
    onSelect: (value: any) => void
}

interface IListItem {
    label: string
    default?: boolean,
    value: string
}

const Filter = ({ title, list, className, disabled = false, onSelect }: FilterProps) => {
    const [isFullList, setIsFullList] = useState(false)
    const [checkedValues, setCheckedValues] = useState<string[]>(getDefaultValue)
    const editedList = list.slice(0, 5)
    const hiddenList = list.slice(6)

    const classNames = () => {
        const general = className || ''
        const ifDisabled = disabled || ''
        return `${general} ${ifDisabled}`
    }

    function getDefaultValue() {
        const defaultValue = list.find(item => item.default === true)
        if (defaultValue !== undefined) return [defaultValue.value]
        return []
    }

    function getList() {
        if (list.length > 6) return editedList
        if (list.length <= 6) return list
    }

    useEffect(() => {
        console.log(checkedValues)
    }, [checkedValues])

    function handleSelect(e : ChangeEvent<HTMLInputElement>) {
        if (e.target.checked) {
            setCheckedValues([...checkedValues, e.target.value])
            onSelect([...checkedValues, e.target.value])
        } else if (!e.target.checked) {
            setCheckedValues(checkedValues.filter(item => e.target.value !== item))
            onSelect(checkedValues.filter(item => e.target.value !== item))
        }
    }

    function isChecked(name: string) {
        return checkedValues.includes(name)
    }

    return (
        <div className={`filter-box ${classNames()}`}>
            <div className="title">{title}</div>
            <div className={`checkbox-group`}>
                <div className="alwaysShownBoxes">
                    {getList()?.map(item => (
                        <Checkbox
                            label={item.label}
                            id={`${item.label}-${title}`}
                            defaultChecked={item.default}
                            key={`${item.label}-${title}`}
                            value={item.value}
                            name={title}
                            checked={isChecked(item.value)}
                            onChange={handleSelect}
                            disabled={disabled}
                        />
                    ))}
                </div>
                <div className={`hiddenBoxes ${isFullList ? 'opened' : 'closed'}`}>
                    {hiddenList !== undefined && (
                        hiddenList.map(item => (
                            <Checkbox
                                label={item.label}
                                id={`${item.label}-${title}`}
                                defaultChecked={item.default}
                                key={`${item.label}-${title}`}
                                value={item.value}
                                name={title}
                                onChange={handleSelect}
                                disabled={disabled}
                            />
                        ))
                    )}
                </div>
                {(editedList.length <= list.length && list.length > 6) && (
                    <span className={`icon ${isFullList ? 'close-icon' : 'open-icon'}`} onClick={() => setIsFullList(!isFullList)}>
            <img src={openIcon} alt="open list" />
          </span>
                )}
            </div>
        </div>
    )
}

export default observer(Filter)
