import Song from "../Song/Song.tsx";

export default function SongDisplay({ data }) {
  return (
    <>
      {data.map((song) => {
        return <Song key={song.id} songId={song.id} />;
      })}
    </>
  );
}
