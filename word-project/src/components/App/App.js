import "./App.css";
import { useEffect, useState } from "react";
import Word from "../Word/Word.js";

function App() {
  const url = "http://localhost:3000";

  const [word, setWord] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  //   const [date, setDate] = useState("");

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

  const fetchSongs = async () => {
    const urlSearch = new URLSearchParams({ title: word });
    const response = await fetch(`${url}/search?${urlSearch}`);
    const data = await response.json();

    let songTitle = data.data.title;
  };

  useEffect(() => {
    fetchWord();
  }, []);

  //   function newDate() {
  //     let date = new Date();
  //     setDate(date);
  //   }

  return (
    <>
      <h1>Word Of The Day</h1>
      <Word word={word} />
    </>
  );
}

export default App;
