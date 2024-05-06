import React, { Component } from "react";

class PropertyList extends Component {
  render() {
    const { properties } = this.props;

    return (
      <section className="property-list">
        <h2>Доступные объекты недвижимости</h2>
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              <h3>{property.name}</h3>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default PropertyList;