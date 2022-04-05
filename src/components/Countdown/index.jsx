import React from "react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Too lale...</div>
  }

  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  )
}

const Countdown = ({ questionIndex, onSubmit }) => {
  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        isPlaying
        duration={60}
        key={questionIndex}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        onComplete={() => {
          onSubmit()
          return { shouldRepeat: false, delay: 1 }
        }}
        size={120}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  )
}

export default Countdown
