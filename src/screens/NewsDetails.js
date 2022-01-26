import React from 'react'
import {
  View,
  Text,
  Share,
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import ShareIt from 'react-native-vector-icons/AntDesign'
import Backarrow from 'react-native-vector-icons/Ionicons'

const NewsDetails = ({ route, navigation }) => {
  const { imgURL, title, description, link } = route.params

  const detailsBg = require('../images/detailsBg.png')

  const handleShare = () => {
    try {
      const result = Share.share({
        title: title,
        message: link,
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared!')
        } else {
          console.log('News shared!')
        }
      } else if (result.action === Share.dismissedAction) {
        alert('News sharing dismissed!')
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.pop()}>
            <Backarrow name="arrow-back" size={26} color="#41234a" />
          </TouchableOpacity>
          <View style={styles.headerImgContainer}>
            <Image
              style={styles.headerLogo}
              source={{
                uri: imgURL,
              }}
            />
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={() => handleShare()}>
            <ShareIt name="sharealt" size={26} color="#41234a" />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollviewStyle}>
          <ImageBackground source={detailsBg} resizeMode="stretch" style={styles.img}>
            <Text style={styles.newsTitle}>{title}</Text>
            <Text style={styles.newsDescription}>{description}</Text>
          </ImageBackground>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  headerImgContainer: {
    padding: 6,
    borderWidth: 2,
    borderRadius: 50,
    alignSelf: 'center',
    borderColor: '#eed9f5',
  },
  headerLogo: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  scrollviewStyle: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: 'white',
  },
  img: {
    borderRadius: 20,
    marginBottom: 40,
    overflow: 'hidden',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  newsTitle: {
    fontSize: 16,
    color: 'white',
    lineHeight: 20,
    marginBottom: 20,
    fontFamily: 'Montserrat-Bold',
  },
  newsDescription: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Montserrat-Medium',
  },
})

export default NewsDetails
