import css from "./Word.module.css";

export default function Word({ word, date }) {
  return (
    <div className={css.container}>
      <div className={css.word}>
        <p>{date}</p>
        <h3>{word}</h3>
      </div>
    </div>
  );
}
