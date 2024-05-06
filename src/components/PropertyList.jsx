import React, { Component } from "react";
import PropertyInfo from "./PropertyInfo";

class PropertyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProperty: null,
      isModalOpen: false
    };
  }

  handlePropertyClick = (property) => {
    this.setState({
      selectedProperty: property,
      isModalOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      selectedProperty: null,
      isModalOpen: false
    });
  };

  render() {
    const { properties } = this.props;
    const { selectedProperty, isModalOpen } = this.state;

    return (
        <section className="property-list">
          <h2>Доступные объекты недвижимости</h2>
          <ul style={{ margin: 0, padding: 0 }}>
            {properties.map((property) => (
              <li key={property.id} style={{ marginBottom: "10px" }}>
                <button onClick={() => this.handlePropertyClick(property)}>
                  <h3>{property.name}</h3>
                </button>
              </li>
            ))}
          </ul>
          {isModalOpen && (
            <PropertyInfo property={selectedProperty} closeModal={this.closeModal} />
          )}
        </section>
      );
  }
}

export default PropertyList;