import './styles.sass'

import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import StatItem from '../../components/statItem/statItem';

const Dashboard: FC = () => {
  return (
    <div className="dashboard">
      <div className="dash-header">
        <div className="title">Campaign overview</div>
      </div>
      <div className="stats">
        <StatItem
          icon='save-2.svg'
          title="Total users"
          mainInfo='123,126,322'
          subInfo="14%"
          diff="up" />
        <StatItem
          icon='save-2.svg'
          title="New users / month"
          mainInfo="1,126"
          subInfo="2%"
          diff="down" />
      </div>
    </div>
  );
};

export default observer(Dashboard);
