import React, { useEffect, useState, useMemo, useContext } from "react"
import { Row, Col, Radio, Spin, Space, Button } from "antd"
import Countdown from "../../components/Countdown"
import axios from "axios"
import "./style.css"
import { UserContext } from "../../App"
import { useNavigate } from "react-router-dom"

const Quiz = ({ score, setScore }) => {
  const [data, setData] = useState([])
  const [selected, setSelected] = useState("")
  const [hasSubmit, setHasSubmit] = useState(false)
  const [question, setQuestion] = useState(0)

  const user = useContext(UserContext)
  const navigate = useNavigate()
  const onSubmit = () => {
    setHasSubmit(true)
    setTimeout(() => {
      setQuestion(question + 1)
      setHasSubmit(false)
      setSelected("")
    }, 2000)
  }

  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=100").then((res) => {
      setData(res.data.results)
    })
  }, [])
  useEffect(() => {
    if (data.length && selected === data[question].correct_answer) {
      setScore(score + 10)
    }
  }, [hasSubmit])

  useEffect(() => {
    if (question === 25) {
      navigate("/end")
    }
  }, [question])

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
    return shuffledAnswers.filter((answer) => answer !== undefined)
  }

  const fiftyFiftyAnswer = () => {
    const possibleAnswers = []
    const randomIndex = Math.floor(
      Math.random() * data[question].incorrect_answers.length
    )
    possibleAnswers.push(data[question].incorrect_answers[randomIndex])

    console.log(possibleAnswers)
    return possibleAnswers
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

  const capitalFirstLetter = (string) => {
    console.log(string.slice(1))
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  return (
    <div className="container">
      <div className="username">
        <h2>Hello {capitalFirstLetter(user)}</h2> <h3>Your points {score}</h3>
      </div>
      <Row>
        <Col span={24}>
          <h2>Question {question + 1}</h2>
          <p
            className="question"
            dangerouslySetInnerHTML={{ __html: data[question].question }}
          />
        </Col>
      </Row>

      <Countdown onSubmit={onSubmit} questionIndex={question} />

      <Radio.Group
        className="radio-group"
        onChange={(e) => {
          setSelected(e.target.value)
        }}
        buttonStyle="solid"
      >
        {answers.length > 3 && (
          <Button
            className="fiftyfifty"
            type="primary"
            shape="round"
            onClick={() => {
              const answers = fiftyFiftyAnswer()
              setData(
                data.map((item, index) => {
                  if (index === question) {
                    return {
                      ...item,
                      incorrect_answers: answers,
                    }
                  }
                  return item
                })
              )

              fiftyFiftyAnswer()
            }}
          >
            50/50
          </Button>
        )}
        <Row className="row">
          <Col className="col" span={12}>
            <Radio.Button
              className={`${fetchRadioAnswer(answers[0])} option`}
              value={answers[0]}
            >
              <div dangerouslySetInnerHTML={{ __html: answers[0] }} />
            </Radio.Button>
          </Col>
          <Col className="col" span={12}>
            <Radio.Button
              className={`${fetchRadioAnswer(answers[1])} option`}
              value={answers[1]}
            >
              <div dangerouslySetInnerHTML={{ __html: answers[1] }} />
            </Radio.Button>
          </Col>
        </Row>
        <Row className="row">
          <Col className="col" span={12}>
            {answers[2] && (
              <Radio.Button
                className={`${fetchRadioAnswer(answers[2])} option`}
                value={answers[2]}
              >
                <div dangerouslySetInnerHTML={{ __html: answers[2] }} />
              </Radio.Button>
            )}
          </Col>
          <Col className="col" span={12}>
            {answers[3] && (
              <Radio.Button
                className={`${fetchRadioAnswer(answers[3])} option`}
                value={answers[3]}
              >
                <div dangerouslySetInnerHTML={{ __html: answers[3] }} />
              </Radio.Button>
            )}
          </Col>
        </Row>
      </Radio.Group>

      <Button className="submit" onClick={() => onSubmit()} type="link" block>
        Submit Answer
      </Button>
    </div>
  )
}

export default Quiz
