import logo from "./logoSO.png";
import "./App.css";
import Dictionary from "./Dictionary";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main>
          <Dictionary defaultKeyword="sunset" />
        </main>
        <footer className="App-footer">
          <small> Coded by 
            <a href="https://github.com/samanthaoria/dictionary-project.git"> Samantha Oriá </a>
            </small>
        </footer>
      </div>
    </div>
  );
}

