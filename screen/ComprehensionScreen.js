import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Modal } from 'react-native'
import styles from '../styles'
import Footer from '../components/footer'
import Header from '../components/header'
import CustomButton from '../components/CustomButton'
import ProgressBar from '../components/ProgressBar'

export default function ComprehensionScreen({ changeScreen, params }) {
  const [showTranslation, setShowTranslation] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState(null)
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false)
  const [answers, setAnswers] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false)
  const [storyTranslated, setStoryTranslated] = useState(false)

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

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

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
        <View style={styles.translationContainerButtoms}>
          <CustomButton
            title='STORY'
            height='75%'
            width='25%'
            color='#1DA3A7'
            alignSelf='center'
            fontSize={15}
            onPress={toggleModal}
          />

          <CustomButton
            title='TRADUZIR'
            onPress={() => setShowTranslation(!showTranslation)}
            alignSelf='center'
            color='#D1AC7A'
            width='25%'
            height='75%'
            fontSize={15}
          />
        </View>
        <Text style={styles.questionText}>{currentQuestion}</Text>
      </View>
      <View style={styles.answersContainer2}>
        {answers.map((answer, index) => (
          <View key={index} style={styles.answerContainer}>
            <Text style={styles.answerText}>{answer}</Text>
            <CustomButton
              title='Check'
              onPress={() => checkAnswer(answer)}
              fontSize={16}
              color={
                answeredCorrectly
                  ? '#1DA3A7'
                  : userAnswer === answer
                  ? '#FF6B6B'
                  : '#D1AC7A'
              }
              height={30}
              width={80}
              marginRight={5}
            />
          </View>
        ))}
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modal}>
          <ScrollView style={{ height: '100%' }}>
            <CustomButton
              title='TRADUZIR'
              onPress={() => setStoryTranslated(!storyTranslated)}
              fontSize={16}
              color='#D1AC7A'
              height={30}
              width='25%'
              alignSelf='center'
              marginTop={20}
            />
            <Text style={styles.story}>
              {storyTranslated
                ? message.story.portuguese
                : message.story?.english}
            </Text>
            <CustomButton
              title='CLOSE'
              onPress={toggleModal}
              fontSize={16}
              color='#FF6B6B'
              height={30}
              width='25%'
              alignSelf='center'
              marginTop={20}
            />
          </ScrollView>
        </View>
      </Modal>

      <Footer />
    </View>
  )
}
