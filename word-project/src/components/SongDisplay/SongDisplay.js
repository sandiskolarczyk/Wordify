import Song from "../Song/Song";

export default function SongDisplay({ data }) {
  return (
    <>
      {data.map((song) => {
        return (
          <Song
            title={song.title}
            artist={song.artist.name}
            image={song.album.cover_medium}
            preview={song.preview}
          />
        );
      })}
    </>
  );
}
