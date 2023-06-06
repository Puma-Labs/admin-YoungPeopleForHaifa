import './styles.sass'

import React, {FC, ChangeEvent} from 'react'

interface IChCheckbox {
    label: string,
    id: string,
    defaultChecked?: boolean,
    name: string,
    value?: any,
    disabled?: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    checked?: boolean
}

const Checkbox: FC<IChCheckbox> = (
    {id,
        label,
        defaultChecked = false,
        name,
        value,
        disabled,
        onChange,
        checked
    }) => {
    const isDisabled = disabled ? 'disabled' : ''

    return (
        <label htmlFor={id} className={`checkbox-container ${checked ? 'checked' : ''} ${isDisabled}`}>
            {label}
            <input
                type="checkbox"
                id={id}
                checked={checked}
                name={name}
                onChange={onChange}
                value={value}
                disabled={disabled} />
            <span className='checkmark' style={{ opacity: disabled ? .7 : 1 }}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {checked && (
                      <path
                          d="M3.58 7.58C3.38 7.58 3.19 7.5 3.05 7.36L0.220002 4.53C-0.0699975 4.24 -0.0699975 3.76 0.220002 3.47C0.510002 3.18 0.990002 3.18 1.28 3.47L3.58 5.77L8.72 0.629998C9.01 0.339998 9.49 0.339998 9.78 0.629998C10.07 0.919998 10.07 1.4 9.78 1.69L4.11 7.36C3.97 7.5 3.78 7.58 3.58 7.58Z"
                          fill={disabled ? "#A9A8AA" : "#574BC9"}
                      />
                  )}
                </svg>
            </span>
        </label>
    )
}

export default Checkbox
