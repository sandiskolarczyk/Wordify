export default function Song({ title, artist, img, preview }) {
  return (
    <>
      <img alt="Album/Song Cover" src={img} />
      <h3>{title}</h3>
      <h3>{artist}</h3>
      <audio controls src={preview}></audio>
    </>
  );
}
