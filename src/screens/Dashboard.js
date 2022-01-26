import React from 'react'
import { View, StatusBar, StyleSheet, ScrollView, Text, Image, ImageBackground } from 'react-native'
import Card from '../components/Card'

const CoinDetails = ({ route, navigation }) => {
  const news = require('../images/news.png')
  const header = require('../images/Header.png')
  const crypto = require('../images/crypto.png')

  const { username } = route.params

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <ImageBackground source={header} resizeMode="stretch" style={styles.img}>
          <View style={styles.headerContainer}>
            <Text style={styles.heading}>Hi</Text>
            <Text style={styles.childHeading}>{username}!</Text>
          </View>
        </ImageBackground>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollviewStyle}>
          <Card cardStyles={{ marginBottom: 20 }} onPress={() => navigation.navigate('CoinsList')}>
            <Text style={styles.cardHeading}>Jump start your crypto portfolio</Text>
            <View style={styles.line} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardChildHeading}>
                  Coinbase is the easiest place to buy ans sell cryptocurrency.
                </Text>
                <Text style={styles.cardChildHeading}>Get started today!</Text>
              </View>
              <View>
                <Image style={styles.coinLogo} source={crypto} />
              </View>
            </View>
          </Card>

          <Card onPress={() => navigation.navigate('News')}>
            <Text style={styles.cardHeading}>News flash</Text>
            <View style={styles.line} />
            <View style={styles.newsCointainer}>
              <View style={{ flex: 1 }}>
                <Image style={styles.newsContainerLogo} source={news} />
              </View>
              <View style={{ flex: 1, paddingLeft: 10 }}>
                <Text style={styles.cardChildHeading}>
                  Keep yourself updated with the trends of cryptocurrencies and financial markets
                  for free!
                </Text>
              </View>
            </View>
          </Card>
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
  },
  headerContainer: {
    paddingTop: 60,
    display: 'flex',
    paddingHorizontal: 24,
    flexDirection: 'column',
  },
  scrollviewStyle: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 34,
    color: '#eed9f5',
    textAlign: 'left',
    fontFamily: 'Montserrat-Bold',
  },
  coinLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  childHeading: {
    top: 10,
    fontSize: 24,
    marginBottom: 20,
    color: '#eed9f5',
    textAlign: 'left',
    fontFamily: 'Montserrat-Bold',
  },
  img: {
    height: 184,
    overflow: 'hidden',
  },
  cardHeading: {
    fontSize: 20,
    color: '#41234a',
    textAlign: 'left',
    fontFamily: 'Montserrat-Bold',
  },
  cardChildHeading: {
    fontSize: 14,
    opacity: 0.8,
    color: '#41234a',
    textAlign: 'left',
    fontFamily: 'Montserrat-Medium',
  },
  line: {
    width: '55%',
    borderRadius: 10,
    borderWidth: 0.8,
    marginVertical: 6,
    borderColor: '#8f659a',
  },
  newsCointainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsContainerLogo: {
    width: 180,
    height: 120,
    alignSelf: 'center',
  },
})

export default CoinDetails
