import React from "react";
import "./Phonetics.css";

export default function Phonetic(props) {
  return (
    <div className="Phonetic">
      <a href={props.phonetic.audio} target="_blank" rel="noreferrer">
        Listen
        <span>
          {" "}
          <i className="fas fa-volume-up"> </i>{" "}
        </span>
      </a>
      <span className="text">{props.phonetic.text} </span>
    </div>
  );
}
