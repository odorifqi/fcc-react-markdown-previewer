// import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import regeneratorRuntime from "regenerator-runtime";
// import styles from "./style.css";
import s from "./style.css";

const URL =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = React.useState({});
  const [isClicked, setClicked] = React.useState(false);

  React.useEffect(() => {
    if (isClicked) {
      newQuote();
      setClicked(false);
    }
  }, [isClicked]);

  React.useEffect(() => {
    newQuote();
    setClicked(false);
  }, []);

  const newQuote = async () => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) =>
        setQuote(
          () => data.quotes[Math.floor(Math.random() * data.quotes.length)]
        )
      )
      .catch(() => console.log("err"));
  };

  return (
    <React.Fragment>
      <h2>Random Quote Machine</h2>
      <div id="quote-box" className={s["quote-box"]}>
        <blockquote>
          <q id="text" className={s.text}>
            {quote.quote}
          </q>
          <br />
          <p id="author" className={s.author}>
            <em>- {quote.author}</em>
          </p>
        </blockquote>

        <div id="div-button" className={s["div-button"]}>
          <button id="new-quote" onClick={() => setClicked(true)}>
            new quote
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text="${quote.quote}" - ${quote.author}`}
            id="tweet-quote"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}

const rootDiv = document.getElementById("root");
rootDiv.classList.add(s.root);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootDiv
);

module.hot.accept();
