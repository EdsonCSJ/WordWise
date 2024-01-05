import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import CustomButton from '../components/CustomButton'
import styles from '../styles'
import Footer from '../components/footer'
import Header from '../components/header'
import { Asset } from 'expo-asset'

export default function FinalScreen({ changeScreen, params }) {
  const labels = params?.labels || []
  useEffect(() => {
    ;(async () => {
      await Asset.loadAsync(require('./assets/wordwiseLogo.png'))
    })()
  }, [])

  return (
    <View style={styles.container}>
      <Header />
      <Text
        style={{
          textAlign: 'center',
          color: '#1DA3A7',
          fontSize: 35,
          fontWeight: '700',
        }}
      >
        CONGRATULATIONS<Text style={[{ color: '#D1AC7A' }]}>!</Text>
      </Text>

      <Image
        source={require('./assets/wordwiseLogo.png')}
        style={{ width: 100, height: 100, alignSelf: 'center' }}
      />
      <View
        style={[
          {
            height: '50%',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          },
        ]}
      >
        <View style={{ width: '90%' }}>
          <Text
            style={{
              color: '#222',
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 18,
            }}
          >
            VOCÊ RESPONDEU TODAS AS QUESTÕES CORRETAMENTE{'\n\n'}SELECIONE UMA
            NOVA FOTO OU CONTINUE COM A MESMA IMAGEM
          </Text>
        </View>
        <CustomButton
          title='INICIO'
          onPress={() => {
            changeScreen('Camera', {})
          }}
          color='#1DA3A7'
          height='20%'
          width='60%'
        />
        <CustomButton
          title='CONTINUAR'
          onPress={() => {
            changeScreen('Select', { labels })
          }}
          color='#D1AC7A'
          height='20%'
          width='60%'
        />
      </View>
      <Footer />
    </View>
  )
}
