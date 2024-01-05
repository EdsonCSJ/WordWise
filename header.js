import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Text
        style={[
          {
            fontSize: 22,
            fontWeight: 'bold',
            color: '#F0F4F7',
            textAlign: 'center',
          },
        ]}
      >
        WORDWISE
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: '5%',
    backgroundColor: '#222',
    flexDirection: 'column',
    justifyContent: 'center'
  },
})
