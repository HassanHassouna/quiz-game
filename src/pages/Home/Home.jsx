import React, { createContext, useState } from "react"
import "./style.css"
import { Input, Button } from "antd"
import { useNavigate } from "react-router-dom"
import { CheckOutlined } from "@ant-design/icons"
const Home = ({ setUser }) => {
  const navigate = useNavigate()
  return (
    <div className="container">
      <h1>Welcome to Quiz</h1>
      <Input
        placeholder="Enter Your Name"
        className="input"
        onChange={(e) => {
          setUser(e.target.value)
        }}
      />

      <Button
        type="primary"
        icon={<CheckOutlined />}
        shape="round"
        onClick={() => {
          navigate("/quiz")
        }}
      >
        Start Quiz
      </Button>
    </div>
  )
}

export default Home
