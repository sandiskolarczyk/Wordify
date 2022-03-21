import css from "./App.module.css";
import { useEffect, useState } from "react";
import Word from "../Word/Word.js";
import SongDisplay from "../SongDisplay/SongDisplay.js";

function App() {
  const url = "https://wordify-app.herokuapp.com";

  const [word, setWord] = useState("");
  const [API, setAPI] = useState([]);

  const [date, setDate] = useState("");
  //const [time, setTime] = useState("");

  const newDate = () => {
    let today = new Date();
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

  let today = new Date().toLocaleDateString();
  window.localStorage.setItem("date", today);
  const calendarDate = window.localStorage.getItem("date");
  // Initialize the date object as a date object again here
  today = new Date(calendarDate).toLocaleDateString();
  //console.log(today);

  // checks if one day has passed.
  function hasOneDayPassed() {
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
  }

  hasOneDayPassed();

  const fetchWord = async () => {
    if (hasOneDayPassed) {
      const response = await fetch(
        `https://words-api-project.herokuapp.com/words`
      );
      const data = await response.json();

      // return a random word
      let randomNumber = Math.floor(Math.random() * 31);
      let dailyWord = data[randomNumber].word;
      setWord(dailyWord);
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchWord();
  }, []);

  // const resetAtMidnight = () => {
  //   let now = new Date();
  //   let night = new Date(
  //     now.getFullYear(),
  //     now.getMonth(),
  //     now.getDate() + 1, // the next day, ...
  //     0,
  //     0,
  //     0 // ...at 00:00:00 hours
  //   );
  //   let msToMidnight = night.getTime() - now.getTime();

  //   setTimeout(() => {
  //     fetchWord(); //      <-- This is the function being called at midnight.
  //     resetAtMidnight(); //      Then, reset again next midnight.
  //   }, msToMidnight);
  // };

  // const newTime = () => {
  //   let today = new Date();

  //   //get current local time
  //   today = today.toLocaleTimeString("en-UK");

  //   //that will set the time to 00:00:00.000 of current timezone & get the nearest midnight in future
  //   let midnight = today.setHours(24, 0, 0, 0);
  //   console.log(today);
  //   setTime(today);
  // };

  const fetchSongs = async () => {
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
    </>
  );
}

export default App;
