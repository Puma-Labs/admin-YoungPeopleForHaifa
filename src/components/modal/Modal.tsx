import './styles.sass'

import React, {FC} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface IModal {
  show: boolean,
  children: any,
  onClose: (state: boolean) => void,
  title?: string
  size?: {
    width?: number | string
    height?: number | string
  }
}


const Modal: FC<IModal> = ({show, children, onClose, size, title}) => {
  return (
    <>
      {show && (
        <div className={`modal show`}>
          <div className="background" onClick={() => onClose(false)} />
          <div className="modal-container" style={{width: size?.width, height: size?.height}}>
            <div className="tool-top-panel">
              <span className="tool-top-panel-item title">{title ? title : ''}</span>
              <span className="tool-top-panel-item close" onClick={() => onClose(false)}><FontAwesomeIcon icon="close" /></span>
            </div>
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
