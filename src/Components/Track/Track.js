import React, { Component } from "react";
import "./Track.css";

export class Track extends Component {
  renderAction() {
    let button = "";
    let isRemoval = true;
    if (isRemoval) {
      button = <button className="Track-action">-</button>;
    } else {
      button = <button className="Track-action">+</button>;
    }
    return button;
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{/*<!-- track name will go here -->*/}</h3>
          <p>
            {/*<!-- track artist will go here--> | <!-- track album will go here -->*/}
          </p>
        </div>
        {this.renderAction}
      </div>
    );
  }
}

export default Track;
