import React from 'react'

interface IIcon {
  color: string
}

const ShowMoreIcon: React.FC<IIcon> = ({color}) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
        fill={color} />
      <path d="M12.0002 15.01C11.8102 15.01 11.6202 14.94 11.4702 14.79L7.94016 11.26C7.65016 10.97 7.65016 10.49 7.94016 10.2C8.23016 9.91001 8.71016 9.91001 9.00016 10.2L12.0002 13.2L15.0002 10.2C15.2902 9.91001 15.7702 9.91001 16.0602 10.2C16.3502 10.49 16.3502 10.97 16.0602 11.26L12.5302 14.79C12.3802 14.94 12.1902 15.01 12.0002 15.01Z"
        fill={color} />
    </svg>
  )
}

export default ShowMoreIcon
