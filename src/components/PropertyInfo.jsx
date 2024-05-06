import React from "react";

const PropertyInfo = ({ property, closeModal }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <h3>{property.name}</h3>
        <p>{property.description}</p>
        <button className="modal-close" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PropertyInfo;