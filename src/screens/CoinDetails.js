import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

import Twitter from 'react-native-vector-icons/Entypo';
import Star from 'react-native-vector-icons/FontAwesome';
import Backarrow from 'react-native-vector-icons/Ionicons';
import Web from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryAxis
} from 'victory-native';

let formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

const CoinDetails = ({ route, navigation }) => {
  const {
    coinId,
    icon,
    rank,
    volume,
    marketCap,
    priceChange1d,
    priceBtc,
    websiteUrl,
    twitterUrl
  } = route.params;

  const [graphData, setGraphData] = useState([]);

  // console.log({ graphData })

  var newGraphData = graphData.map(function (elem) {
    return {
      x: elem[0],
      y: elem[1]
    };
  });

  // console.log({ newGraphData })

  useEffect(() => {
    fetch(
      `https://api.coinstats.app/public/v1/charts?period=6m&coinId=${coinId}`
    )
      .then(response => response.json())
      .then(data => {
        // console.log(data.chart)
        setGraphData(data.chart);
      });
    error => {
      setIsLoading(true);
      setError(error);
    };
  }, []);

  const detailsBg = require('../images/detailsBg.png');

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.pop()}
          >
            <Backarrow name="arrow-back" size={26} color="#41234a" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image
              style={styles.icon}
              source={{
                uri: icon
              }}
            />
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Star name="star" size={26} color="transparent" />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollviewStyle}
        >
          <ImageBackground
            source={detailsBg}
            resizeMode="stretch"
            style={styles.img}
          >
            <View style={styles.detailsCardView}>
              <Text style={styles.detailsHeading}>Rank: </Text>
              <Text style={styles.detailsHeadingData}>{rank}</Text>
            </View>
            <View style={styles.detailsCardView}>
              <Text style={styles.detailsHeading}>Price Change (1 day): </Text>
              <Text
                style={[
                  styles.detailsHeadingData,
                  { color: priceChange1d >= 0 ? '#00bb13' : '#ff5829' }
                ]}
              >
                {formatter.format(priceChange1d)}
              </Text>
            </View>
            <View style={styles.detailsCardView}>
              <Text style={styles.detailsHeading}>Price BTC: </Text>
              <Text style={styles.detailsHeadingData}>
                {formatter.format(priceBtc)}
              </Text>
            </View>
            <View style={styles.detailsCardView}>
              <Text style={styles.detailsHeading}>Volume: </Text>
              <Text style={styles.detailsHeadingData}>
                {formatter.format(volume)}
              </Text>
            </View>
            <View style={styles.detailsCardView}>
              <Text style={styles.detailsHeading}>MarketCap: </Text>
              <Text style={styles.detailsHeadingData}>
                {formatter.format(marketCap)}
              </Text>
            </View>
            <View style={styles.detailsCardView}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{ marginRight: 16 }}
                onPress={() =>
                  navigation.navigate('Webview', { uri: twitterUrl })
                }
              >
                <Twitter name="twitter-with-circle" size={26} color="#1da1f2" />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('Webview', { uri: websiteUrl })
                }
              >
                <Web name="web" size={26} color="#B0B0B0" />
              </TouchableOpacity>
            </View>
          </ImageBackground>

          <View>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryAxis
                dependentAxis
                tickFormat={e => formatter.format(e * 0.013)}
                style={{
                  tickLabels: {
                    fontSize: 9,
                    fontFamily: 'Montserrat',
                    fontWeight: 600,
                    fill: '#41234a'
                  }
                }}
              />
              <VictoryGroup>
                <VictoryLine
                  style={{
                    data: { stroke: '#41234a' }
                  }}
                  data={newGraphData}
                />
              </VictoryGroup>
            </VictoryChart>
            <Text style={[styles.detailsHeadingData, styles.graphNotes]}>
              The above graph reflects the last six months changes.
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center'
  },
  headerContainer: {
    paddingTop: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  logoContainer: {
    padding: 6,
    borderWidth: 2,
    borderRadius: 50,
    alignSelf: 'center',
    borderColor: '#eed9f5'
  },
  scrollviewStyle: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: 'white'
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 50
  },
  img: {
    height: 184,
    borderRadius: 20,
    overflow: 'hidden',
    paddingVertical: 20,
    paddingHorizontal: 16
  },
  detailsCardView: {
    marginBottom: 6,
    flexDirection: 'row',
    width: Dimensions.get('window').width / 1.9
  },
  detailsHeading: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Montserrat-Bold'
  },
  detailsHeadingData: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Montserrat-Medium'
  },
  graphNotes: {
    color: '#41234a',
    backgroundColor: '#eed9f5'
  }
});

export default CoinDetails;
