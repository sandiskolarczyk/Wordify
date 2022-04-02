import css from "./App.module.css";
import { useEffect, useState } from "react";
import Word from "../Word/Word";
import SongDisplay from "../SongDisplay/SongDisplay";

function App() {
  const url: string = "https://wordify-app.herokuapp.com";

  // state for word of the day
  const [word, setWord] = useState(() => {
    // get stored value
    const savedWord: string | null = window.localStorage.getItem("word");
    return savedWord || "";
  });

  // state for array of song ids from spotify API
  const [API, setAPI] = useState([]);

  // state for date to be displayed for the user to see
  const [date, setDate] = useState("");

  // this is a format for the date which is displayed alongside the word for the user to see
  // (different than date in local storage)
  const newDate = (): void => {
    let today: Date | string = new Date();
    today =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    //console.log(today);
    setDate(today);
  };

  useEffect(() => {
    newDate();
  }, []);

  useEffect((): void => {
    const now: Date | string = new Date();

    // the current millisecond time
    const currentTime: number = now.getTime();

    // milliseconds until midnight
    const tillMidnight: number = now.setHours(24, 0, 0, 0) - Date.now();

    const expiryTime: number = currentTime + tillMidnight;
    console.log(`expiry time: ` + expiryTime);

    window.localStorage.setItem("word", word);
    window.localStorage.setItem("expiry", JSON.stringify(expiryTime));
    console.log(word);
  }, [word]);

  // store and get the date from local storage
  let today: string | null = new Date().toLocaleDateString();
  window.localStorage.setItem("date", today);
  const calendarDate: string | null = window.localStorage.getItem("date");
  today = calendarDate;
  //console.log(today);

  // check if one day has passed
  const hasOneDayPassed = (): boolean | undefined => {
    // if there's a date in local storage and it's equal to the above:
    // inferring a day has yet to pass since both dates are equal
    if (localStorage.date === today) {
      console.log(`It's still the same day ` + localStorage.date);
      return false;

      // this portion of logic occurs when a day has passed
    } else if (localStorage.date !== today) {
      console.log(`It's a new day ` + today);
      return true;
    }
  };

  //console.log(hasOneDayPassed());

  // const fetchWord = async (): Promise<void> => {
  //   if (hasOneDayPassed() === false) {
  //     window.localStorage.getItem("word");
  //     window.localStorage.getItem("expiry");

  //     setWord(word);

  //     const now: Date = new Date();
  //     // compare the expiry time of the item with the current time
  //     if (now.getTime() > localStorage.expiry) {
  //       // If the item is expired, delete the item from storage
  //       // and return
  //       window.localStorage.removeItem("word");
  //       window.localStorage.removeItem("expiry");
  //       return;
  //     }
  //     return;
  //   } else {
  //     const response = await fetch(
  //       `https://words-api-project.herokuapp.com/words`
  //     );
  //     const data = await response.json();

  //     // return a random word
  //     let randomNumber: number = Math.floor(Math.random() * 31);
  //     let dailyWord = data[randomNumber].word;
  //     setWord(dailyWord);
  //   }
  // };

  const fetchWord = async (): Promise<void> => {
    const word = localStorage.getItem("word");
    localStorage.getItem("expiry");
    // if the word doesn't exist, fetch from API and set the word state
    if (!word) {
      const response = await fetch(
        `https://words-api-project.herokuapp.com/words`
      );
      const data = await response.json();

      // return a random word
      let randomNumber: number = Math.floor(Math.random() * 31);
      let dailyWord = data[randomNumber].word;
      setWord(dailyWord);
    }
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > localStorage.expiry) {
      // If the item is expired, delete the item from storage
      // and return
      window.localStorage.removeItem("word");
      window.localStorage.removeItem("expiry");
      return;
    }
    return window.localStorage.word;
  };

  useEffect(() => {
    fetchWord();
  }, []);

  useEffect(() => {
    const fetchSongs = async (): Promise<void> => {
      const urlSearch = new URLSearchParams({ song: word });
      await fetch(`${url}/songs-of-the-day?${urlSearch}`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then(async function (data) {
          //console.log(data);

          setAPI(data);
        });
    };
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
