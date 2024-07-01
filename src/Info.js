import React from 'react';

const Modal = ({ open, toggleModal }) => {
  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={toggleModal}>
          &times;
        </span>
        <p>To Translate: Just Choose Your Languages And Press Translate!!!</p>
        <p>
          Detect: Don't Worry If You Don't Know The Original Language The App
          Will Get It For You!!
        </p>
      </div>
    </div>
  );
};

export default Modal;
