import useWebplayer from "../hooks/useWebplayer.js";

export default function WebPlayback(props) {
  const { player, currentTrack, isPaused, name } = useWebplayer(props.token);

  const handleClick = (event) => {
    player.togglePlay().then(() => {
      console.log("Toggled playback!");
    });
  };

  return (
    <>
      <div className="container">
        <div className="main-wrapper">
          <p>{name}</p>
          <img
            src={currentTrack.album.images[0].url}
            className="now-playing__cover"
            alt=""
          />

          <div className="now-playing__side">
            <div className="now-playing__name">{currentTrack.name}</div>

            <div className="now-playing__artist">
              {currentTrack.artists[0].name}
            </div>
          </div>
          <button
            className="btn-spotify"
            onClick={() => {
              player.previousTrack();
            }}
          >
            &lt;&lt;
          </button>

          <button className="btn-spotify" onClick={() => player.togglePlay()}>
            {isPaused ? "PLAY" : "PAUSE"}
          </button>

          <button
            className="btn-spotify"
            onClick={() => {
              player.nextTrack();
            }}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </>
  );
}
