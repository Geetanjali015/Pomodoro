import { useState } from "react";
import "./App.css";
import ConfigurationPanel from "./ConfigurationPanel";
import Timer from "./Timer";
import audioTimer from "./assets/marimba-for-smartphone-151931.mp3"

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [totalSeconds, setTotalSeconds] = useState(sessionLength * 60);
  const [isSessionTime, setIsSessionTime] = useState(true);
  const [idInterval, setIdInterval] = useState("pause");

  function handlePlayTimer() {
    if (idInterval === "pause") {
      function setTimer() {
        setTotalSeconds((prevSeconds) => prevSeconds - 1);
      }
      setIdInterval(setInterval(setTimer, 1000));
    } else {
      clearInterval(idInterval);
      setIdInterval("pause");
    }
  }

  function handleFinish() {
    setTotalSeconds(isSessionTime ? breakLength * 60 : sessionLength * 60);
    setIsSessionTime(!isSessionTime);
    const audio = document.getElementById("beep");
    audio.play();
  }

  function increment(id) {
    if (
      (id === "break" && breakLength === 60) ||
      (id === "session" && sessionLength === 60) ||
      idInterval !== "pause"
    ) {
      return;
    }
    if (id === "break") {
      const newBreakLength = breakLength + 1; 
      setBreakLength(newBreakLength);
      if(!isSessionTime) {
        setTotalSeconds(newBreakLength*60);
      }
    } else {
      const newSessionLength = sessionLength + 1; 
      setSessionLength(newSessionLength);
      if(isSessionTime) {
        setTotalSeconds(newSessionLength*60);
      }
    }
  }

  function decrement(id) {
    if (
      (id === "break" && breakLength === 1) ||
      (id === "session" && sessionLength === 1) ||
      idInterval !== "pause"
    ) {
      return;
    }
    if (id === "break") {
      const newBreakLength = breakLength - 1; 
      setBreakLength(newBreakLength);
      if(!isSessionTime) {
        setTotalSeconds(newBreakLength*60);
      }
    } else {
      const newSessionLength = sessionLength - 1; 
      setSessionLength(newSessionLength);
      if(isSessionTime) {
        setTotalSeconds(newSessionLength*60);
      }
    }
  }

  function reset() {
    setSessionLength(25);
    setBreakLength(5);
    setIsSessionTime(true);
    setTotalSeconds(25*60);
    clearInterval(idInterval);
    setIdInterval("pause");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  }

  return (
    <div className="App">
      <div className="main-title">
        <strong>pomodoro</strong> timer
      </div>
      <div id="timer">
        <section>
          <ConfigurationPanel
            title="Break time"
            id="break"
            length={breakLength}
            onIncrementButton={() => increment("break")}
            onDecrementButton={() => decrement("break")}
          />
          <ConfigurationPanel
            title="Working time"
            id="session"
            length={sessionLength}
            onIncrementButton={() => increment("session")}
            onDecrementButton={() => decrement("session")}
          />
        </section>
        <Timer
          time={totalSeconds}
          onReset={reset}
          onPlay={handlePlayTimer}
          onFinish={handleFinish}
          textSubtitle={isSessionTime}
          isPlaying={idInterval !== "pause"}
        />
        <audio id="beep" src={audioTimer}></audio>
      </div>
    </div>
  );
}

export default App;
