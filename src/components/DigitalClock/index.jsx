import { useState, useEffect } from 'react';
import './style.css';

const Clock = () => {
  const [time, setTime] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
    session: 'AM',
  });

  useEffect(() => {
    const updateClock = () => {
      const datetime = new Date();
      let hrs = datetime.getHours();
      let min = datetime.getMinutes();
      let sec = datetime.getSeconds();
      let session = 'AM';

      if (hrs >= 12) {
        session = 'PM';
      }
      if (hrs > 12) {
        hrs -= 12;
      }
      if (hrs < 10) {
        hrs = `0${hrs}`;
      }
      if (min < 10) {
        min = `0${min}`;
      }
      if (sec < 10) {
        sec = `0${sec}`;
      }

      setTime({
        hours: hrs,
        minutes: min,
        seconds: sec,
        session,
      });
    };

    updateClock(); // Update immediately
    const intervalId = setInterval(updateClock, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return (
    <div className="clock">
      <div className="bigtime">
        <div className="time numbers hr">
          <span>{time.hours}</span>
        </div>
        <div className="time hr dot" id="blink">
          <span>:</span>
        </div>
        <div className="time numbers hr">
          <span>{time.minutes}</span>
        </div>
      </div>
      <div className="lowtime">
        <div className="time bottom numbers">
          <span>{time.seconds}</span>
        </div>
        <div className="time bottom low">
          <span>{time.session}</span>
        </div>
      </div>
    </div>
  );
};

export default Clock;
