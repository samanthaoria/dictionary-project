import { Phonetic } from "./Phonetic";
import { Meaning } from "./Meaning";
import "./Results.css";

export function Results(props: any) {
  console.log(props);
  if (props.results) {
    return (
      <div className="Results">
        <section>
          <h2>{props.results?.word}</h2>
          {props.results?.phonetics?.map(function (phonetic: any, index: any) {
            return (
              <div key={index}>
                {" "}
                <Phonetic phonetic={phonetic} />
              </div>
            );
          })}
        </section>
        {props.results?.meanings?.map(function (meaning: any, index: any) {
          return (
            <section key={index}>
              <Meaning meaning={meaning} />
            </section>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}
