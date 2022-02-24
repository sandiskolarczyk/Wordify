import css from "./App.module.css";
import { useEffect, useState } from "react";
import Word from "../Word/Word.js";
//import SongDisplay from "../SongDisplay/SongDisplay.js";

function App() {
  const url = "http://localhost:5000";

  const [word, setWord] = useState("");
  const [API, setAPI] = useState([]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

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

  const fetchWord = async () => {
    const response = await fetch(
      `https://words-api-project.herokuapp.com/words`
    );
    const data = await response.json();

    // return a random word
    let randomNumber = Math.floor(Math.random() * 31);
    let dailyWord = data[randomNumber].word;
    setWord(dailyWord);
  };

  useEffect(() => {
    fetchWord();
  }, []);

  const resetAtMidnight = () => {
    let now = new Date();
    let night = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // the next day, ...
      0,
      0,
      0 // ...at 00:00:00 hours
    );
    let msToMidnight = night.getTime() - now.getTime();

    setTimeout(() => {
      fetchWord(); //      <-- This is the function being called at midnight.
      resetAtMidnight(); //      Then, reset again next midnight.
    }, msToMidnight);
  };

  // const newTime = () => {
  //   let today = new Date();

  //   //get current local time
  //   today = today.toLocaleTimeString("en-UK");

  //   //that will set the time to 00:00:00.000 of current timezone & get the nearest midnight in future
  //   let midnight = today.setHours(24, 0, 0, 0);
  //   console.log(today);
  //   setTime(today);
  // };

  // const fetchSongs = async () => {
  //   const urlSearch = new URLSearchParams({ title: word });
  //   await fetch(`${url}/search/?${urlSearch}`, {
  //     method: "GET",
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then(async function (data) {
  //       console.log(data);

  //       setAPI(data.data);
  //     });
  // };

  // useEffect(() => {
  //   fetchSongs();
  // }, [word]);

  return (
    <>
      <h1 className={css.header}>Word Of The Day</h1>
      <Word word={word} date={date} />
    </>
  );
}

export default App;

{
  /* <SongDisplay data={API} /> */
}
