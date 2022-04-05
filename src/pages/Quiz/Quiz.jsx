import React, { useEffect, useState, useMemo } from "react"
import { Row, Col, Radio, Spin, Space, Button } from "antd"
import axios from "axios"
import "./style.css"
const Quiz = () => {
  const [data, setData] = useState([])
  const [selected, setSelected] = useState("")
  const [hasSubmit, setHasSubmit] = useState(false)
  const [question, setQuestion] = useState(0)
  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=100").then((res) => {
      setData(res.data.results)
    })
  }, [])

  const shuffleAnswers = () => {
    const possibleAnswers = []
    possibleAnswers.push(
      data[question].correct_answer,
      ...data[question].incorrect_answers
    )
    const shuffledAnswers = []
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * possibleAnswers.length)
      shuffledAnswers.push(possibleAnswers[randomIndex])
      possibleAnswers.splice(randomIndex, 1)
    }
    return shuffledAnswers
  }

  const answers = useMemo(() => {
    if (data.length) return shuffleAnswers()
  }, [data, question])

  if (!data.length)
    return (
      <div className="container">
        <Space size="middle">
          <Spin size="large" />
        </Space>
      </div>
    )

  const fetchRadioAnswer = (answer) => {
    if (!hasSubmit) return ""

    if (answer === data[question].correct_answer) {
      return "correct"
    }

    if (selected === answer) {
      return "wrong"
    }

    return ""
  }

  return (
    <div className="container">
      <h1>Welcome To quiz</h1>
      <Row>
        <Col span={24}>
          <h2>Question {question + 1}</h2>
          <p>{data[question].question}</p>
        </Col>
      </Row>

      <Radio.Group
        onChange={(e) => {
          setSelected(e.target.value)
        }}
        buttonStyle="solid"
      >
        <Row>
          <Col span={12}>
            <Radio.Button
              className={`${fetchRadioAnswer(answers[0])} option`}
              value={answers[0]}
            >
              {answers[0]}
            </Radio.Button>
          </Col>
          <Col span={12}>
            <Radio.Button
              className={`${fetchRadioAnswer(answers[1])} option`}
              value={answers[1]}
            >
              {answers[1]}
            </Radio.Button>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Radio.Button
              className={`${fetchRadioAnswer(answers[2])} option`}
              value={answers[2]}
            >
              {answers[2]}
            </Radio.Button>
          </Col>
          <Col span={12}>
            <Radio.Button
              className={`${fetchRadioAnswer(answers[3])} option`}
              value={answers[3]}
            >
              {answers[3]}
            </Radio.Button>
          </Col>
        </Row>
      </Radio.Group>

      <Button
        onClick={() => {
          setHasSubmit(true)

          setTimeout(() => {
            setQuestion(question + 1)
            setHasSubmit(false)
            setSelected("")
          }, 2000)
        }}
        type="link"
        block
      >
        Submit Answer
      </Button>
    </div>
  )
}

export default Quiz
