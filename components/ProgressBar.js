import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ currentQuestionIndex, totalQuestions }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {currentQuestionIndex + 1} out of {totalQuestions}
      </Text>
      <View style={styles.progressBar}>
        <View
          style={{
            width: `${((currentQuestionIndex) / totalQuestions) * 100}%`,
            backgroundColor: '#1DA3A7',
            height: '100%',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: '#222',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  progressBar: {
    width: '80%',
    height: 10,
    backgroundColor: '#D1AC7A',
    borderRadius: 5,
    overflow: 'hidden'
  },
});

export default ProgressBar;
