import React, { useEffect, useState, useRef } from "react";
import "./App.css";

const Stop = () => {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalIdRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [running]);

  const restart = () => {
    setRunning(false);
    setTime(0);
  };

  const startStop = () => {
    setRunning((prevTime) => !prevTime);
  };

  const formateTime = (milliSeconds) => {
    const hour = Math.floor(milliSeconds / 3600000);
    const minutes = Math.floor((milliSeconds % 3600000) / 60000);
    const seconds = Math.floor((milliSeconds % 60000) / 1000);
    const remainingMilliSconds = (milliSeconds % 1000);
    return `${String(hour).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}:${String(
      remainingMilliSconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="stopwatch-body">
      <div className="entire-body">
        <h1 className="heading"> <u>Stopwatch:</u> </h1>
        <h1 className="time">{formateTime(time)}</h1>
        <button id="start" onClick={startStop}>
          {running ? "Stop" : "Start"}
        </button>
        <button id="restart" onClick={restart}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default Stop;
