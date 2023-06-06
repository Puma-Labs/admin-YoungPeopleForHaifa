import './styles.sass'

import React, { useState, FC } from 'react';

import { ReactComponent as EyeIcon } from '../../../assets/icons/eye-icon.svg'
import { ReactComponent as ErrorIcon} from '../../../assets/icons/error-icon.svg'

interface IGgInput {
    label?: string;
    onChange: (value: any) => void;
    onBlur?: (value: any) => void;
    className?: string;
    inputContainer?: string;
    name?: string;
    value: any;
    type?: React.HTMLInputTypeAttribute;
    id?: string;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    placeholder?: string;
    icon?: JSX.Element;
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
}

const Input: FC<IGgInput> = (
    {
        label,
        onChange,
        onBlur,
        className,
        inputContainer,
        name,
        value,
        type = 'text',
        id,
        minLength,
        maxLength,
        required,
        placeholder,
        icon,
        disabled = false,
        error = false,
        errorMessage = '',
    }) => {

    const [isShowPass, setShowPass] = useState<boolean>(false)

    function setClassNames() {
        const hasIcon = icon ? 'with-icon' : '';
        const hasClassName = inputContainer || '';
        const isDisabled = disabled ? 'disabled' : '';
        const isError = error ? 'error' : '';
        // const isError = error ? 'error' : '';
        return `${hasIcon} ${hasClassName} ${isDisabled} ${isError}`
    }

    return (
        <label htmlFor={id} className={`input ${setClassNames()}`}>
            <span className='input-container'>
                <span className='label'>{label}</span>
                {icon && <span className="icon">{icon}</span>}
                {type === 'password' &&
                    <span
                        className="icon"
                        onClick={() => setShowPass(!isShowPass)}
                    >
                        <EyeIcon />
                    </span>
                }
                <input
                    id={id}
                    type={type === 'text' || isShowPass ? 'text' : 'password'}
                    name={name}
                    value={value}
                    minLength={minLength && minLength}
                    maxLength={maxLength && maxLength}
                    required={required ? required : false}
                    className={`inputComponent inputStyle ${className ?? ''}`}
                    onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    disabled={disabled}
                />
          </span>
          {error && (
              <span className="errorComponent">
                  <span className="errorIcon"><ErrorIcon /></span>
                  <span className="errorText">{errorMessage}</span>
              </span>
          )}

          


        </label>

    );
};

export default Input;
