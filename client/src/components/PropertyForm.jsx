import React, { useState } from "react";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { addProperty } from "../actions/propertyActions";

const PropertyForm = ({ addProperty }) => {
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

    addProperty(newProperty);

    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          label="Name"
          id="name"
          name="name"
          value={name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <TextField
          label="Description"
          id="description"
          name="description"
          value={description}
          onChange={handleInputChange}
          required
          multiline
          rows={4}
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Add Property
      </Button>
    </form>
  );
};

export default connect(null, { addProperty })(PropertyForm);