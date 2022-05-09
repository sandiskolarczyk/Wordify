import css from "./App.module.css";
import { useEffect, useState } from "react";
import Word from "../Word/Word";
import SongDisplay from "../SongDisplay/SongDisplay";

function App() {
  const url: string = "https://wordify-app.herokuapp.com";

  // state for word of the day
  const [word, setWord] = useState((): string => {
    const savedWord: string | null = window.localStorage.getItem("word");
    if (savedWord) {
      return savedWord;
    } else {
      return "";
    }
    // get stored value
    //const savedWord: string | null = window.localStorage.getItem("word");
    //return savedWord || "";
  });

  // const [word, setWord] = useState("ice");

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
    localStorage.setItem("word", word);
    //console.log(word);
  }, [word]);

  // check if one day has passed
  /*  const hasOneDayPassed = (): boolean | undefined => {
    // if there's a date in local storage and it's equal to the above:
    // inferring a day has yet to pass since both dates are equal
    if (localStorage.date === today) {
      console.log(`It's still the same day: ${localStorage.date}`);
      return false;

      // this portion of logic occurs when a day has passed
    } else if (localStorage.date !== today) {
      console.log(`It's a new day: ${today}`);
      return true;
    }
  }; */

  //console.log(hasOneDayPassed());

  /*   const fetchWord = async (): Promise<void> => {
    if (hasOneDayPassed() === false) {
      return;
    } else {
      /* const response: Response = await fetch(
        `https://words-api-project.herokuapp.com/words`
      );
      const data = await response.json(); */
  /*       // return a random word
      let randomNumber: number = Math.floor(Math.random() * 31);
      let dailyWord = words.words[randomNumber].word;
      setWord(dailyWord);
      window.localStorage.setItem("word", word); */
  //}
  /*  };

  useEffect((): void => {
    fetchWord();
  }, []); */

  /* useEffect((): void => {
    function clearStorage(): boolean {
      const now: Date = new Date();

      if (now.getTime() > localStorage.expiry) {
        window.localStorage.clear();
        //setWord("");
        return false;
      } else {
        return true;
      }
    }
    clearStorage();
  }, []); */

  useEffect((): void => {
    const fetchWord = async (): Promise<void> => {
      //const now: Date = new Date();

      //window.localStorage.removeItem("word");
      //window.localStorage.removeItem("expiry");
      /*  if (now.getTime() > localStorage.expiry || word === "") {
        window.localStorage.getItem("word");
        window.localStorage.clear(); */

      function clearStorage(): boolean {
        const now: Date = new Date();

        if (now.getTime() > localStorage.expiry) {
          window.localStorage.clear();
          setWord("");
          return false;
        } else {
          return true;
        }
      }

      if (clearStorage() === false) {
        const response: Response = await fetch(
          `https://words-api-project.herokuapp.com/words`
        );
        const data = await response.json();
        // return a random word
        let randomNumber: number = Math.floor(Math.random() * 31);
        let dailyWord: string = data[randomNumber].word;
        setWord(dailyWord);
      }

      //}
      // localStorage.setItem("word", word);
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
