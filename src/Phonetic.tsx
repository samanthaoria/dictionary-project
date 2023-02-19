import "./Phonetics.css";

export function Phonetic(props: any) {
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
