import React, { Component } from "react";
import "./TrackList.css";
import Track from "../Track/Track";

export class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        <Track />
        {/* <!-- You will add a map method that renders a set of Track components  --> */}
      </div>
    );
  }
}

export default TrackList;