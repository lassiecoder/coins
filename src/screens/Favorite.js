import React from 'react'
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'

import Backarrow from 'react-native-vector-icons/Ionicons'

const Favourite = ({ navigation }) => {
  const header = require('../images/Header.png')
  const emptyFavorite = require('../images/emptyFavorite.png')
  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <ImageBackground source={header} resizeMode="stretch" style={styles.img}>
          <View style={styles.headerCointainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.pop()}>
              <Backarrow name="arrow-back" size={26} color="#eed9f5" />
            </TouchableOpacity>
            <Text style={styles.heading}>Favorite list</Text>
          </View>
        </ImageBackground>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollviewStyle}>
          <View style={styles.emptyFavoriteContainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('CoinsList')}>
              <Image style={styles.emptyFavoriteLogo} source={emptyFavorite} />

              <Text style={[styles.detailsHeadingData, styles.emptyFavoriteListText]}>
                {` Your favorite list is empty!\nLet's explore and add some.`}
              </Text>
            </TouchableOpacity>
          </View>
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
  headerCointainer: {
    paddingTop: 60,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  scrollviewStyle: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: 'white',
  },
  img: {
    height: 144,
    overflow: 'hidden',
  },
  heading: {
    fontSize: 24,
    marginLeft: 12,
    color: '#eed9f5',
    fontFamily: 'Montserrat-Bold',
  },
  detailsHeadingData: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
  },
  emptyFavoriteContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Dimensions.get('window').height / 5,
  },
  emptyFavoriteLogo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  emptyFavoriteListText: {
    lineHeight: 20,
  },
})

export default Favourite
