import "./App.css";
import { useEffect, useState } from "react";
import Word from "../Word/Word.js";
import SongDisplay from "../SongDisplay/SongDisplay.js";

function App() {
  const url = "http://localhost:5000";

  const [word, setWord] = useState("");

  const [API, setAPI] = useState([]);
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

  useEffect(() => {
    fetchWord();
  }, []);

  //${url}/search?${urlSearch}
  //https://deezerdevs-deezer.p.rapidapi.com/search?q=${word}

  const fetchSongs = async () => {
    const urlSearch = new URLSearchParams({ title: word });
    await fetch(`${url}/search/?${urlSearch}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then(async function (data) {
        console.log(data);

        setAPI(data.data);
      });
  };

  useEffect(() => {
    // const data = await response.json();
    // console.log(data);
    fetchSongs();
  }, [word]);

  //   function newDate() {
  //     let date = new Date();
  //     setDate(date);
  //   }

  return (
    <>
      <h1>Word Of The Day</h1>
      <Word word={word} />
      <SongDisplay data={API} />
    </>
  );
}

export default App;
