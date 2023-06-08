import './styles.sass'

import React from 'react';

interface ButtonProps {
  label?: string
  onClick?: () => void
  className?: string
  type?: "button" | "submit" | "reset"
  stylesType?: 'default' | 'success' | 'delete' | 'border' | 'round' | 'icon' | 'text'
  disabled?: boolean
  icon?: IIcon
}

interface IIcon {
  leftIcon?:  JSX.Element
  rightIcon?:  JSX.Element
}

const Button = ({ label, onClick, className, type = 'button', stylesType = 'default', disabled = false, icon }: ButtonProps) => {
  return (
      <button
          disabled={disabled}
          type={type ? type : 'button'}
          className={`buttonComponent ${stylesType} ${className} ${disabled && 'disabled'}`}
          onClick={onClick}
      >
        {icon?.leftIcon && (
            <span className='icon-container'>{icon.leftIcon}</span>
        )}
        {label}
        {icon?.rightIcon && (
            <span className='icon-container'>{icon.rightIcon}</span>
        )}
      </button>
  );
};

export default Button;
