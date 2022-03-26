export default function Song({ songId }: any) {
  const style = {
    borderRadius: "30px",
    padding: "17px",
    height: "300px",
    width: "276px",
  };
  return (
    <>
      <iframe
        title="song"
        style={style}
        src={`https://open.spotify.com/embed/track/${songId}?utm_source=generator`}
        width="20%"
        height="380"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
    </>
  );
}
