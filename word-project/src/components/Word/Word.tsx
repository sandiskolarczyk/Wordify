import css from "./Word.module.css";

type Props = {
  word: string;
  date: string;
};

export default function Word({ word, date }: Props) {
  return (
    <div className={css.container}>
      <div className={css.word}>
        <p>{date}</p>
        <h3>{word}</h3>
      </div>
    </div>
  );
}
