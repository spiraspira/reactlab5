import React, { useEffect, useState } from "react";
import PropertyList from "../components/PropertyList";
import propertiesData from "../data/properties.json";

const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    setProperties(propertiesData);
  }, []);

  return <PropertyList properties={properties} />;
};

export default Properties;