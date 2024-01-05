import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import Footer from './footer'
import Header from './header'
import CustomButton from './CustomButton'
import ProgressBar from './ProgressBar'

export default function LearnScreen({ changeScreen, params }) {
  const [showTranslation, setShowTranslation] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState(null)
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false)
  const [answers, setAnswers] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(null)

  const labels = params?.labels || []
  const message = params?.message || []

  useEffect(() => {
    setAnswers(message.questions[currentQuestionIndex].answers)
  }, [currentQuestionIndex])

  useEffect(() => {
    setCurrentQuestion(
      showTranslation
        ? message.questions[currentQuestionIndex].questionTranslation
        : message.questions[currentQuestionIndex].questionEn
    )
  }, [showTranslation, currentQuestionIndex])

  const checkAnswer = (selectedAnswer) => {
    const correctAnswer = message.questions[currentQuestionIndex].correctAnswer
    if (selectedAnswer === correctAnswer) {
      setAnsweredCorrectly(true)
      setTimeout(() => {
        setAnsweredCorrectly(false)
        setUserAnswer(null)
        if (currentQuestionIndex + 1 < message.questions?.length) {
          setCurrentQuestionIndex(currentQuestionIndex + 1)
          setShowTranslation(false)
        } else {
          changeScreen('Final', { labels })
        }
      }, 1000)
    } else {
      setUserAnswer(selectedAnswer)
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <ProgressBar
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={message.questions?.length}
      />
      <View style={styles.translationContainer}>
        <CustomButton
          title='TRADUZIR'
          onPress={() => setShowTranslation(!showTranslation)}
          color='#D1AC7A'
          alignSelf='center'
          height='20%'
          width='30%'
          fontSize={15}
        />
        <Text style={styles.questionText}>{currentQuestion}</Text>
      </View>
      <View style={styles.answersContainer}>
        {answers.map((answer) => (
          <CustomButton
            key={answer}
            title={answer}
            onPress={() => checkAnswer(answer)}
            height='20%'
            width='45%'
            fontSize={17}
            color={
              answeredCorrectly
                ? '#1DA3A7' 
                : userAnswer === answer
                ? '#FF6B6B' 
                : '#D1AC7A' 
            }
          />
        ))}
      </View>
      <Footer />
    </View>
  )
}
