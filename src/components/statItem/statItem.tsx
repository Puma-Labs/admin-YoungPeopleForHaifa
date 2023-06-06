import './styles.sass'
import React, { FC } from 'react'

interface IStatItem {
  icon?: string,
  title: string,
  mainInfo: string,
  subInfo?: string | number,
  diff: string
}

const StatItem: FC<IStatItem> = ({ icon, title, mainInfo, diff, subInfo }) => {
  return (
    <div className='stat-item'>
      <div className="stat-header">
        {icon && (
          <img src={`/icons/${icon}`} alt="icon" />
        )}
        <div className="title">{title}</div>
      </div>
      <div className="info">
        <div className="main-info">{mainInfo}</div>
        {subInfo && (
          <div className="sub-info">
            {diff && (
              diff === 'up' ? <img className="icon" src="/icons/arrow-up.svg" alt="arrow up" />
                : <img className="icon" src="/icons/arrow-down.svg" alt="arrow down" />
            )}
            <div className={`content ${diff}`}>{subInfo}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StatItem