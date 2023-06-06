import './styles.sass'

import React, { FC } from 'react';
import { IBanner } from '../../models/IBanner';
import { $public } from '../../http'

export interface IBannerItem {
  item: IBanner;
  index?: any;
}

const BannerItem: FC<IBannerItem> = ({ item, index = '' }) => {
  return (
    <div className="bannerItemContainer">
      <div className="item-banner">
        <img className="preview" src={$public(item.imgLink)} alt="" />
      </div>
    </div>
  );
};

export default BannerItem;
