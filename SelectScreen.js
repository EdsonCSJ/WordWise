import React, { useState, useEffect } from 'react'
import { View, Text, Image, ActivityIndicator } from 'react-native'
import CustomButton from './CustomButton'
import styles from './styles'
import Footer from './footer'
import Header from './header'
import { Asset } from 'expo-asset'
import apiCall from './apiCall'

function checkAndFixAnswers(message) {
  for (const question of message.questions) {
    const correctAnswer = question.correctAnswer

    if (!question.answers.includes(correctAnswer)) {
      const indexToReplace = Math.floor(Math.random() * question.answers.length)
      question.answers[indexToReplace] = correctAnswer
    }
  }
  return message
}

function shuffleAnswers(message) {
  for (const question of message.questions) {
    for (let i = question.answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[question.answers[i], question.answers[j]] = [
        question.answers[j],
        question.answers[i],
      ]
    }
  }
  return message
}

export default function SelectScreen({ changeScreen, params }) {
  const [loading, setLoading] = useState(false)

  const labels = params?.labels || []

  useEffect(() => {
    ;(async () => {
      await Asset.loadAsync(require('./assets/wordwiseLogo.png'))
    })()
  }, [])

  const requestGPT = async (isVocab) => {
    setLoading(true)
    const apiResponse = await apiCall(isVocab, labels)
    setLoading(false)
    try {
      const parsedMessage = JSON.parse(apiResponse.choices[0].message.content)
      const fixedMessage = checkAndFixAnswers(parsedMessage)
      const message = shuffleAnswers(fixedMessage)

      const params = { labels, message }
      const screen = isVocab ? 'Learn' : 'Comprehension'

      changeScreen(screen, params)
    } catch (error) {
      console.error('A API do ChatGPT retornou um JSON inválido\n', error)
      changeScreen('Select', { labels })
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      {loading ? (
        <ActivityIndicator
          size='large'
          color='#1DA3A7'
          style={{ transform: [{ scaleX: 3 }, { scaleY: 3 }] }}
        />
      ) : (
        <>
          <Text
            style={[
              styles.headerText,
              { textAlign: 'center', marginTop: '5%' },
            ]}
          >
            SELECIONE QUAL TIPO DE LIÇÃO VOCÊ GOSTARIA DE FAZER
          </Text>
          <Image
            source={require('./assets/wordwiseLogo.png')}
            style={{ width: 150, height: 150, alignSelf: 'center' }}
          />
          <View
            style={[
              {
                height: '40%',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              },
            ]}
          >
            <CustomButton
              title='VOCABULÁRIO'
              onPress={() => requestGPT(true)}
              color='#1DA3A7'
              height='30%'
              width='60%'
            />
            <CustomButton
              title='COMPREENSÃO'
              onPress={() => requestGPT(false)}
              color='#D1AC7A'
              height='30%'
              width='60%'
            />
          </View>
        </>
      )}
      <Footer />
    </View>
  )
}
