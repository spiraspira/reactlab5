import React, { useState } from "react";

const PropertyForm = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newProperty = {
      id: Date.now(),
      name: name,
      description: description,
    };

    props.addProperty(newProperty);

    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Add Property</button>
    </form>
  );
};

export default PropertyForm;