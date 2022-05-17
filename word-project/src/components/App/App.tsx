import css from "./App.module.css";
import { useEffect, useState } from "react";
import Word from "../Word/Word";
import SongDisplay from "../SongDisplay/SongDisplay";

function App() {
  const url: string = "https://wordify-app.herokuapp.com";

  // state for word of the day
  const [word, setWord] = useState((): string => {
    const now: Date = new Date();

    // check if one day has passed
    if (now.getTime() > localStorage.expiry) {
      // if so, clear local storage and set word to be undefined
      window.localStorage.clear();
      setWord("");
      return word;
    } else {
      // get stored value
      const savedWord: string | null = window.localStorage.getItem("word");
      return savedWord || "";
    }
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

  useEffect((): void => {
    newDate();
  }, []);

  useEffect((): void => {
    const setExpiry = (): void => {
      if (word !== undefined) {
        localStorage.setItem("word", word);
      }

      if (localStorage.word !== undefined) {
        const now: Date | string = new Date();

        // the current millisecond time
        const currentTime: number = now.getTime();
        console.log(`current time: ${currentTime}`);

        // milliseconds until midnight
        const tillMidnight: number = now.setHours(24, 0, 0, 0) - Date.now();
        console.log(`till midnight: ${tillMidnight}`);

        const expiryTime: number = currentTime + tillMidnight;
        console.log(`expiry time: ${expiryTime}`);

        // store and get the date from local storage
        let today: string | null = new Date().toLocaleDateString();
        window.localStorage.setItem("date", today);

        window.localStorage.setItem("expiry", JSON.stringify(expiryTime));
      }
    };
    setExpiry();
  }, [word]);

  useEffect((): void => {
    const fetchWord = async (): Promise<void> => {
      if (word === "") {
        const response: Response = await fetch(
          `https://words-api-project.herokuapp.com/words`
        );
        const data = await response.json();
        // return a random word
        let randomNumber: number = Math.floor(Math.random() * 41);
        let dailyWord: string = data[randomNumber].word;
        setWord(dailyWord);
      }
    };
    fetchWord();
  });

  useEffect((): void => {
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
        })
        .catch((error) => console.error(error));
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
        <p className={css.secondBottomLink}>
          Oh, you meant tech stack? Built with{" "}
          <a
            className={css.githubLink}
            target="_blank"
            rel="noreferrer"
            href="https://reactjs.org/"
          >
            React
          </a>{" "}
          & music courtesy of{" "}
          <a
            className={css.githubLink}
            target="_blank"
            rel="noreferrer"
            href="https://developer.spotify.com/documentation/web-api/"
          >
            Spotify
          </a>
          .
        </p>
      </div>
    </>
  );
}

export default App;
