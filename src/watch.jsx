import React, { useState, useEffect, useRef } from "react";

const Clock = () => {
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

  const startStop = () => {
    setRunning((prevRunning) => !prevRunning);
  };

  const reset = () => {
    setTime(0);
    setRunning(false);
  };

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const remainingMilliSconds = milliseconds % 1000;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}:${String(
      remainingMilliSconds
    )}`;
  };

  return (
    <div>
      <h1>Stopwatch: {formatTime(time)}</h1>
      <button onClick={startStop}>{running ? "Stop" : "Start"}</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Clock;
