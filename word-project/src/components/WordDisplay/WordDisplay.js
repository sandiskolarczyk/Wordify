import Word from "../Word/Word";
import { useEffect, useState } from "react";

export default function WordDisplay() {
  const [word, setWord] = useState("");
  //   const [date, setDate] = useState("");

  const fetchData = async () => {
    const response = await fetch(
      `https://words-api-project.herokuapp.com/words`
    );
    const data = await response.json();
    //console.log(data);

    // return a random word
    let randomWord = Math.floor(Math.random() * 31);
    let dailyWord = data[randomWord].word;
    setWord(dailyWord);
  };

  useEffect(() => {
    fetchData();
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
