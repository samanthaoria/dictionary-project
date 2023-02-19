import "./Synonyms.css"

export function Synonyms(props: any) {
  if (props.synonyms) {
    return (
      <ul className="Synonyms">
        {props.synonyms.map(function (synonym: any, index: any) {
          return <li key={index}> {synonym}</li>;
        })}
      </ul>
    );
  } else {
    return null;
  }
}
 