import css from "./App.module.css";
import { useEffect, useState } from "react";
import Word from "../Word/Word";
import SongDisplay from "../SongDisplay/SongDisplay";

function App() {
  const url: string = "https://wordify-app.herokuapp.com";

  const [word, setWord] = useState(() => {
    // getting stored value
    const savedWord = window.localStorage.getItem("word");
    return savedWord || "";
  });

  const [API, setAPI] = useState([]);

  const [date, setDate] = useState("");
  //const [time, setTime] = useState("");

  useEffect(() => {
    // storing word of the day
    if (!window.localStorage.getItem("word")) {
      window.localStorage.setItem("word", word);
    }
  }, [word]);

  const newDate = (): void => {
    let today: Date | string = new Date();
    today =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    console.log(today);
    setDate(today);
  };

  useEffect(() => {
    newDate();
  }, []);

  let today: string = new Date().toLocaleDateString();
  window.localStorage.setItem("date", today);
  const calendarDate: string | Date = window.localStorage.getItem("date");
  // Initialize the date object as a date object again here
  today = new Date(calendarDate).toLocaleDateString();
  //console.log(today);

  // checks if one day has passed.
  const hasOneDayPassed = (): boolean | undefined => {
    // if there's a date in localstorage and it's equal to the above:
    // inferring a day has yet to pass since both dates are equal.
    if (localStorage.date === today) {
      console.log(`It's still the same day ` + localStorage.date);
      return false;

      // this portion of logic occurs when a day has passed
    } else if (localStorage.date !== today) {
      console.log(`It's a new day ` + localStorage.date);
      return true;
    }
  };

  console.log(hasOneDayPassed());

  const fetchWord = async (): Promise<void> => {
    if (hasOneDayPassed()) {
      window.localStorage.getItem("word");
      return;
    } else {
      const response = await fetch(
        `https://words-api-project.herokuapp.com/words`
      );
      const data = await response.json();

      // return a random word
      let randomNumber = Math.floor(Math.random() * 31);
      let dailyWord = data[randomNumber].word;
      setWord(dailyWord);
    }
  };

  useEffect(() => {
    fetchWord();
  }, []);

  const fetchSongs = async (): Promise<void> => {
    const urlSearch = new URLSearchParams({ song: word });
    await fetch(`${url}/songs-of-the-day?${urlSearch}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then(async function (data) {
        console.log(data);

        setAPI(data);
      });
  };

  useEffect(() => {
    fetchSongs();
  }, [word]);

  return (
    <>
      <div data-testid="app-component">
        <h1 className={css.header}>Word Of The Day</h1>
        <Word word={word} date={date} />
        <p className={css.message}>
          I hope you enjoy today's songs. Come back to discover tomorrow's mood!
          😜
        </p>
        <SongDisplay data={API} />
        <p className={css.bottomLink}>
          Made with ♥ (& a touch of silliness) by{" "}
          <a
            className={css.githubLink}
            target="_blank"
            rel="noreferrer"
            href="https://github.com/sandiskolarczyk"
          >
            Sandra
          </a>
          .
        </p>
      </div>
    </>
  );
}

export default App;