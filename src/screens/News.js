import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Card from '../components/Card';

import Star from 'react-native-vector-icons/FontAwesome';
import Backarrow from 'react-native-vector-icons/Ionicons';

const News = ({ navigation }) => {
  const [news, setNews] = useState([]);
  console.log({ news });

  const defaultImg = require('../images/logo.png');

  useEffect(() => {
    fetch(
      'https://api.coinstats.app/public/v1/news?skip=0&limit=20&fromDate=1555508420000'
    )
      .then(response => response.json())
      .then(data => {
        // console.log(data, 'newsssss------')
        setNews(data?.news || []);
      });
    error => {
      setIsLoading(true);
      setError(error);
    };
  }, []);

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.pop()}
          >
            <Backarrow name="arrow-back" size={26} color="#eed9f5" />
          </TouchableOpacity>
          <Text style={styles.heading}>News</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Star name="star" size={22} color="transparent" />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollviewStyle}
        >
          {news.map(({ title, imgURL, description, link }, index) => (
            <Card
              key={index}
              cardStyles={styles.newsCardStyle}
              onPress={() =>
                navigation.navigate('NewsDetails', {
                  title,
                  imgURL,
                  description,
                  link
                })
              }
            >
              <Text style={styles.cardHeading}>{title}</Text>
              {imgURL ? (
                <Image
                  style={styles.newsLogo}
                  source={{
                    uri: imgURL
                  }}
                />
              ) : (
                <Image style={styles.defaultNewsLogo} source={defaultImg} />
              )}
            </Card>
          ))}
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
  heading: {
    fontSize: 34,
    color: '#eed9f5',
    textAlign: 'left',
    marginVertical: 20,
    fontFamily: 'Montserrat-Bold'
  },
  cardHeading: {
    flex: 1,
    fontSize: 14,
    color: '#41234a',
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold'
  },
  headerContainer: {
    paddingTop: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#41234a',
    justifyContent: 'space-between'
  },
  scrollviewStyle: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: 'white'
  },
  newsCardStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  newsLogo: {
    width: 60,
    height: 60,
    borderRadius: 50
  },
  defaultNewsLogo: {
    width: 60,
    height: 60,
    borderRadius: 50
  }
});

export default News;
