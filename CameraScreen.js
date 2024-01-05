import React, { useState, useEffect } from 'react'
import { View, Text, Image, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import styles from './styles'
import Footer from './footer'
import Header from './header'
import CustomButton from './CustomButton'

export default function CameraScreen({ changeScreen, params }) {
  const [loading, setLoading] = useState(false)

  const navigateToSelectScreen = async (imageAux) => {
    setLoading(true)
    if (imageAux) {
      try {
        const apiKey = 'chave aqui'

        const response = await axios.post(
          `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
          {
            requests: [
              {
                image: {
                  content: imageAux,
                },
                features: [
                  {
                    type: 'LABEL_DETECTION',
                    maxResults: 15,
                  },
                ],
              },
            ],
          }
        )

        const data = response.data
        const labels = data.responses[0].labelAnnotations.map(
          (label) => label.description
        )
        setLoading(false)
        changeScreen('Select', { labels });
      } catch (error) {
        console.error('Erro ao chamar a API de Visão:', error)
      }
    }
  }

  useEffect(() => {
    ;(async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        alert(
          'Desculpe, precisamos de permissão para acessar sua galeria de fotos.'
        )
      }
    })()
  }, [])

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    })
    if (!result.canceled) {
      const selectedImageAsset = result.assets[0]
      navigateToSelectScreen(selectedImageAsset.base64)
    }
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    })

    if (!result.canceled) {
      const selectedImageAsset = result.assets[0]
      navigateToSelectScreen(selectedImageAsset.base64)
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
          <View
            style={[{ marginBottom: '10%', width: '85%', alignSelf: 'center' }]}
          >
            <View
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: '20%',
                },
              ]}
            >
              <Text
                style={[
                  {
                    width: '50%',
                    fontSize: 25,
                    fontWeight: '800',
                    marginTop: '10%',
                  },
                ]}
              >
                READY TO START LEARNING WITH {''}
                <Text style={[{ color: '#1DA3A7' }]}>
                  WORDWISE {''}
                  <Text style={[{ color: '#D1AC7A' }]}>?</Text>
                </Text>
              </Text>
              <Image
                source={require('./assets/wordwiseLogo.png')}
                style={{ width: 200, height: 200 }}
              />
            </View>
            <Text
              style={[
                {
                  fontSize: 20,
                  fontWeight: '700',
                  textAlign: 'center',
                  alignSelf: 'center',
                },
              ]}
            >
              SELECIONE UMA IMAGEM DA SUA GALERIA OU TIRE UMA FOTO
            </Text>
          </View>
          <View
            style={[
              {
                height: '35%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              },
            ]}
          >
            <CustomButton
              title='CAMERA'
              onPress={takePhoto}
              color='#1DA3A7'
              height='30%'
              width='50%'
            />
            <CustomButton
              title='GALLERY'
              onPress={pickImage}
              color='#D1AC7A'
              height='30%'
              width='50%'
            />
          </View>
        </>
      )}

      <Footer />
    </View>
  )
}
