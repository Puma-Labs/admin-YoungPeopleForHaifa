import './styles.sass'

import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Spinner = () => {
  return (
    <div className="spinner">
      <FontAwesomeIcon className="infinityRotation" icon="spinner" />
    </div>
  );
};

export default Spinner;
