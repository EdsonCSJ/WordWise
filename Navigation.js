import React from 'react'
import { View } from 'react-native'
import CameraScreen from './CameraScreen'
import SelectScreen from './SelectScreen'
import LearnScreen from './LearnScreen'
import ComprehensionScreen from './ComprehensionScreen'
import FinalScreen from './FinalScreen'

export default function Navigation() {
  return (
    <View>
      <CameraScreen />
      <SelectScreen />
      <LearnScreen />
      <ComprehensionScreen />
      <FinalScreen />
    </View>
  )
}
