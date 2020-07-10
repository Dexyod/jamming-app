import React, { Component } from "react";
import ReactAudioPlayer from "react-audio-player";
import "./Track.css";

export class Track extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  renderAction() {
    if (this.props.isRemoval) {
      return (
        <button className="Track-action" onClick={this.removeTrack}>
          -
        </button>
      );
    } else {
      return (
        <button className="Track-action" onClick={this.addTrack}>
          +
        </button>
      );
    }
  }

  //add track method passed down from App
  addTrack() {
    this.props.onAdd(this.props.track);
  }

  //remove track method passed down from App
  removeTrack() {
    this.props.onRemove(this.props.track);
  }
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p>
          {/* <img src={this.props.track.image} alt={this.props.track.name} /> */}
          <ReactAudioPlayer
            src={this.props.track.preview}
            controls
            width="300px"
            height="80px"
            className="preview"
            display="absolute"
          />
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
