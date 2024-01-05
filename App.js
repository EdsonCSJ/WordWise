import React, { useState } from 'react';
import CameraScreen from './CameraScreen';
import SelectScreen from './SelectScreen';
import LearnScreen from './LearnScreen';
import ComprehensionScreen from './ComprehensionScreen';
import FinalScreen from './FinalScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Camera');
  const [params, setParams] = useState([]);

  const changeScreen = (newScreen, newParams) => {
    setParams(newParams);
    setCurrentScreen(newScreen);
  };


  switch (currentScreen) {
    case 'Camera':
      return (
        <CameraScreen
          changeScreen={changeScreen}
          params={params}
        />
      );
    case 'Select':
      return (
        <SelectScreen
          changeScreen={changeScreen}
          params={params}
        />
      );
    case 'Learn':
      return (
        <LearnScreen
          changeScreen={changeScreen}
          params={params}
        />
      );
    case 'Comprehension':
      return (
        <ComprehensionScreen
          changeScreen={changeScreen}
          params={params}
        />
      );
    case 'Final':
      return (
        <FinalScreen
          changeScreen={changeScreen}
          params={params}
        />
      );
    default:
      return (
        <CameraScreen
          changeScreen={changeScreen}
          params={params}
        />
      );
  }
}
