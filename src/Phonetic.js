import React from "react";
import Listen from "./Listen";

export default function Phonetic(props){
  return (
    <div className="Phonetic">
      {" "}
      <a href={props.phonetic.audio} target="_blank">
      Listen 
      <span> <i class="fas fa-volume-up"></i> </span>
      </a>
      <br />
      {props.phonetic.text}
    </div>
  );
}