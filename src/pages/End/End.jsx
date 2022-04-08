import React, { useEffect } from "react"
import { useReward } from "react-rewards"
import "./style.css"

const End = ({ score }) => {
  const { reward, isAnimating } = useReward("rewardId", "confetti")

  useEffect(() => {
    setInterval(() => {
      reward()
    }, 2000)
  }, [])
  
  return (
    <div className="container">
      <h1>The End</h1>
      <div disabled={isAnimating} onCanPlay={reward}>
        <span id="rewardId" />
        <h2>Your Final Score Is : {score}</h2>
      </div>
    </div>
  )
}
export default End
