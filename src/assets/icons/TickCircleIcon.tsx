import React, { FC } from 'react'

interface IIcon {
  color?: string
}

const TickCircleIcon: FC<IIcon> = ({ color }) => {
  return (
    <svg className='icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
        fill={color || "#18AA0B"} />
      <path d="M10.5804 15.58C10.3804 15.58 10.1904 15.5 10.0504 15.36L7.22043 12.53C6.93043 12.24 6.93043 11.76 7.22043 11.47C7.51043 11.18 7.99043 11.18 8.28043 11.47L10.5804 13.77L15.7204 8.63001C16.0104 8.34001 16.4904 8.34001 16.7804 8.63001C17.0704 8.92001 17.0704 9.40001 16.7804 9.69001L11.1104 15.36C10.9704 15.5 10.7804 15.58 10.5804 15.58Z"
        fill={color || "#18AA0B"} />
    </svg>
  )
}

export default TickCircleIcon