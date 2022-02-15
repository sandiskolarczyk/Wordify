import css from "./App.module.css";
import { useEffect, useState } from "react";
import Word from "../Word/Word.js";
//import SongDisplay from "../SongDisplay/SongDisplay.js";

function App() {
  const url = "http://localhost:5000";

  const [word, setWord] = useState("");
  const [API, setAPI] = useState([]);

  const [date, setDate] = useState("");

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
  }, [date]);

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

//<SongDisplay data={API} />
