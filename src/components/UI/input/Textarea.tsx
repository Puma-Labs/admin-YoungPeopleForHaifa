import React, { FC } from 'react'
import './styles.sass'

interface IGgTextarea {
    id?: string;
    label?: string;
    onChange: (value: any) => void;
    value: any;
    required?: boolean;
    className?: string;
    inputContainer?: string;
    dir?: string,
    placeholder?: string
}

const Textarea: FC<IGgTextarea> = (
    {
        id,
        label,
        onChange,
        value,
        required,
        className,
        inputContainer,
        dir = 'ltr',
        placeholder = ''
    }) => {

    return (
        <label htmlFor={id} className={`input ${inputContainer}`}>
            {label}
            <textarea
                placeholder={placeholder}
                id={id}
                value={value}
                dir={dir}
                required={required ? required : false}
                style={{maxWidth: '100%', minWidth: '100%'}}
                className={`textareaComponent ${className ?? ''}`}
                onChange={e => onChange(e.target.value)}
            />
        </label>
    )
}

export default Textarea
