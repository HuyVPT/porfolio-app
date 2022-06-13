import { PropsWithChildren, useEffect, useState } from 'react';
import './modal.scss';

interface ModalProps {
  header: string;
  display: boolean;
  onClose: () => void;
}

function Modal(props: PropsWithChildren<ModalProps>) {
  const [display, setDisplay] = useState(props.display);
  const clickCloseHandler = () => {
    props.onClose();
  };
  useEffect(() => {
    setDisplay(props.display);
  }, [props.display]);
  return (
    <>
      {display && (
        <>
          <div className="modal-placeholder"></div>
          <div className="modal-container">
            <div className="modal-header">
              <p className="header-text">{props.header}</p>
              <button className="close-btn" onClick={clickCloseHandler}></button>
            </div>
            <div className="modal-body">{props.children}</div>
          </div>
        </>
      )}
    </>
  );
}

export default Modal;
