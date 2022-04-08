import React from "react"
import "./style.css"
import { Input, Button } from "antd"
import { useNavigate } from "react-router-dom"
import { CheckOutlined } from "@ant-design/icons"
import Logo from "../../assets/logo.png"
const Home = ({ setUser }) => {
  const navigate = useNavigate()
  return (
    <div className="container">
      <h1 style={{ color: "#fc2352" }}>
        Welcome to <img src={Logo} alt="" />Quiz
      </h1>
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
