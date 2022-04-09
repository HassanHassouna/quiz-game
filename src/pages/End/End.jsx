import React, { useEffect } from "react"
import { useReward } from "react-rewards"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"

import "./style.css"

const End = ({ score, user, setUser, setScore }) => {
  const { reward, isAnimating } = useReward("rewardId", "confetti")
  const navigate = useNavigate()
  useEffect(() => {
    setInterval(() => {
      reward()
    }, 2000)
  }, [])

  return (
    <div className="container">
      <h1>The End Of The Quiz</h1>
      <h2>Thanks {user} for your participation</h2>
      <div disabled={isAnimating} onCanPlay={reward}>
        <span id="rewardId" />
        <h2>Your Final Score Is : {score}</h2>
      </div>
      <Button
        type="primary"
        shape="round"
        onClick={() => {
          navigate("/")
          setUser("")
          setScore(0)
        }}
      >
        Play again
      </Button>
    </div>
  )
}
export default End
