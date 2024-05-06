import React from "react";

const MessageInfo = ({ message, closeModal }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <h3>{message.name}</h3>
        <p>{message.email}</p>
        <p>{message.message}</p>
        <p>{message.date}</p>
        <button className="modal-close" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default MessageInfo;