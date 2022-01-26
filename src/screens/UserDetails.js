import React, { useState } from 'react'
import { View, StatusBar, StyleSheet, Text, Image, TextInput, ImageBackground } from 'react-native'

const UserDetails = ({ navigation }) => {
  const coinLogo = require('../images/logo.png')
  const [username, setUsername] = useState('')

  const userNameBg = require('../images/userName.png')

  const nameRegex = /^[a-zA-Z ]+$/

  const handleUsernameInput = () => {
    if (!nameRegex.test(username)) {
      return alert('Incorrect name!')
    }
    return navigation.navigate('Dashboard', { username })
  }

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image style={styles.headerLogo} source={coinLogo} />
        </View>
        <ImageBackground source={userNameBg} resizeMode="stretch" style={{ height: 760 }}>
          <View style={styles.userContainer}>
            <Text style={styles.heading}>What's your name?</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              maxLength={10}
              keyboardType="default"
              onSubmitEditing={() => handleUsernameInput()}
            />
          </View>
        </ImageBackground>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  headerContainer: {
    paddingTop: 60,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  headerLogo: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
  userContainer: {
    flex: 1,
    marginTop: 200,
    alignItems: 'center',
  },
  input: {
    margin: 12,
    height: 40,
    width: 200,
    padding: 10,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#8f659a',
    fontFamily: 'Montserrat-Medium',
  },
})

export default UserDetails
