import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import Card from '../components/Card'

import Linegraph from 'react-native-vector-icons/Entypo'
import Star from 'react-native-vector-icons/FontAwesome'
import Backarrow from 'react-native-vector-icons/Ionicons'

let formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const CoinsList = ({ navigation }) => {
  const [data, setData] = useState([])
  console.log(data)

  useEffect(() => {
    fetch('https://api.coinstats.app/public/v1/coins?skip=0&limit=20&currency=USD')
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.coins)
        setData(data?.coins || [])
      })
    ;(error) => {
      setIsLoading(true)
      setError(error)
    }
  }, [])

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.pop()}>
            <Backarrow name="arrow-back" size={26} color="#eed9f5" />
          </TouchableOpacity>
          <Text style={styles.heading}>Coins</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Favorite')}>
            <Star name="star" size={22} color="transparent" />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollviewStyle}>
          {data.map(
            (
              {
                id,
                name,
                icon,
                rank,
                price,
                symbol,
                volume,
                priceBtc,
                marketCap,
                websiteUrl,
                twitterUrl,
                priceChange1d,
                priceChange1h,
              },
              index
            ) => (
              <Card
                cardStyles={{ marginTop: 16 }}
                key={index}
                onPress={() =>
                  navigation.navigate('CoinDetails', {
                    coinId: id,
                    icon,
                    rank,
                    volume,
                    priceBtc,
                    marketCap,
                    websiteUrl,
                    twitterUrl,
                    priceChange1d,
                  })
                }
              >
                <View style={styles.coinListContainer}>
                  <View style={styles.coinLSHListDetails}>
                    <Image
                      style={styles.listLogo}
                      source={{
                        uri: icon,
                      }}
                    />
                    <View style={styles.coinsNameAndPrice}>
                      <Text style={styles.coinsNameAndSymbol}>
                        {name} ({symbol})
                      </Text>
                      <Text style={styles.coinsPrice}>Price: {formatter.format(price)}</Text>
                    </View>
                  </View>
                  <View style={styles.coinRHSListDetails}>
                    <Text
                      style={[
                        { color: priceChange1h >= 0 ? '#00bb13' : '#ff5829' },
                        styles.priceChangePerHr,
                      ]}
                    >
                      <Linegraph
                        name="line-graph"
                        size={18}
                        color={priceChange1h >= 0 ? '#00bb13' : '#ff5829'}
                      />{' '}
                      {priceChange1h}%
                    </Text>
                    <Text style={styles.hrText}>(1hr)</Text>
                  </View>
                </View>
              </Card>
            )
          )}
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
    paddingTop: 40,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    backgroundColor: '#41234a',
    justifyContent: 'space-between',
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
    marginVertical: 20,
    fontFamily: 'Montserrat-Bold',
  },
  saveThem: {
    width: 160,
    height: 160,
    marginBottom: 40,
    alignSelf: 'center',
  },
  aboutSaveThem: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 20,
    color: '#460e65',
  },
  contentHeading: {
    fontSize: 16,
    color: '#460e65',
    textAlign: 'left',
    fontWeight: '600',
    marginVertical: 8,
  },
  subHeading: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 8,
    color: '#460e65',
  },
  btnContainer: {
    paddingVertical: 10,
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  coinListContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coinLSHListDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listLogo: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'white',
  },
  coinsNameAndPrice: {
    marginLeft: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  coinsNameAndSymbol: {
    fontSize: 14,
    color: '#41234a',
    fontFamily: 'Montserrat-SemiBold',
  },
  coinsPrice: {
    fontSize: 12,
    lineHeight: 22,
    color: '#41234a',
    fontFamily: 'Montserrat-Medium',
  },
  coinRHSListDetails: {
    display: 'flex',
    flexDirection: 'row',
  },
  priceChangePerHr: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
  },
  hrText: {
    color: '#41234a',
    fontSize: 8,
    marginTop: 2,
    lineHeight: 22,
    textAlign: 'right',
    fontFamily: 'Montserrat-Medium',
  },
})

export default CoinsList
