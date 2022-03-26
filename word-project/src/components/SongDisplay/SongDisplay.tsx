import Song from "../Song/Song";

export default function SongDisplay({ data }: any) {
  return (
    <>
      {data.map((id: any) => {
        return <Song key={id} songId={id} />;
      })}
    </>
  );
}
