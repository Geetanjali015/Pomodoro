import { useEffect } from "react";

export default function Timer({
  time,
  onReset,
  onPlay,
  onFinish,
  textSubtitle,
  isPlaying,
}) {
  useEffect(() => {
    if (time < 0) {
      onFinish();
    }
  }, [time, onFinish]);

  function convertToMinutes() {
    const minutes = Math.floor((time / 60) % 60);
    const minutesWithCero = minutes < 10 ? "0" + minutes : minutes;
    const seconds = time % 60;
    const secondsWithCero = seconds < 10 ? "0" + seconds : seconds;
    return minutesWithCero + ":" + secondsWithCero;
  }

  return (
    <div id="timer-label">
      <p className="subtitle">{textSubtitle ? "Let's work" : "Let's rest"}</p>
      <p id="time-left">{convertToMinutes()}</p>
      <button id="start_stop" onClick={onPlay}>
        {isPlaying ? (
          <i class="fa-solid fa-pause"></i>
        ) : (
          <i class="fa-solid fa-play"></i>
        )}
      </button>
      <button id="reset" onClick={onReset}>
        <i class="fa-solid fa-arrow-rotate-right"></i>
      </button>
    </div>
  );
}
