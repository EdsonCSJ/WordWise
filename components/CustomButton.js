import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'

export default function CustomButton({
  title,
  onPress,
  color,
  height,
  width,
  fontSize,
  alignSelf,
  borderRadius,
  marginRight,
  marginTop,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: color,
          height: height,
          width: width,
          alignSelf: alignSelf,
          borderRadius: borderRadius ?? 15,
          marginRight: marginRight ?? 0,
          marginTop: marginTop ?? 0,
        },
      ]}
      onPress={onPress}
    >
      <View>
        <Text style={[styles.buttonText, { fontSize: fontSize ?? 25 }]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
  },
  buttonText: {
    color: '#222222',
    fontWeight: 'bold',
    letterSpacing: 0.8,
    alignSelf: 'center',
  },
})
