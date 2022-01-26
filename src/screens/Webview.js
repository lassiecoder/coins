import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { WebView } from 'react-native-webview';

import Backarrow from 'react-native-vector-icons/Ionicons';

const Webview = ({ navigation, route }) => {
  const { uri } = route.params;

  console.log({ uri });

  return (
    <>
      <StatusBar hidden={true} />
      <SafeAreaView style={styles.flexContainer}>
        <View style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.pop()}
              style={{
                backgroundColor: '#41234a',
                borderRadius: 20,
                padding: 6
              }}
            >
              <Backarrow name="arrow-back" size={26} color="#eed9f5" />
            </TouchableOpacity>
          </View>
          <WebView startInLoadingState={true} source={{ uri: uri }} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerContainer: {
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'white',
    justifyContent: 'space-between'
  }
});

export default Webview;
