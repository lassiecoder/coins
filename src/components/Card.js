import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

const Card = ({ children, cardStyles, onPress = null }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={[styles.containerView, cardStyles]}
  >
    {children}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  containerView: {
    margin: 5,
    elevation: 2,
    height: 'auto',
    borderRadius: 20,
    shadowOpacity: 0.1,
    shadowColor: '#000',
    paddingVertical: 15,
    position: 'relative',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowOffset: { width: -2, height: 2 },
  },
})

export default Card
