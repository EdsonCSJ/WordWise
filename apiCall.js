import vocabularyData from './assets/dataJsons/vocabularyData.json'
import comprehensionData from './assets/dataJsons/comprehensionData.json'
import vData from './assets/dataJsons/vData.json'
import cData from './assets/dataJsons/cData.json'
import axios from 'axios'

export default async function fetchDataFromChatGPT(isVocab, labels) {
  const apiKey = 'chave aqui'
  const apiEndpoint = 'https://api.openai.com/v1/chat/completions' 

  vocabularyData.messages[2].content = JSON.stringify(vData)
  vocabularyData.messages[3].content = JSON.stringify(labels)

  comprehensionData.messages[2].content = JSON.stringify(cData)
  comprehensionData.messages[3].content = JSON.stringify(labels)

  const apiParameters = isVocab ? vocabularyData : comprehensionData

  try {
    const response = await axios.post(apiEndpoint, apiParameters, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Erro ao chamar a API do ChatGPT:', error)
    throw error
  }
}