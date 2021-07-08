import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function DayDetail() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>내역</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: 40,
    top: -40,
    zIndex: -2,
    backgroundColor: '#F2F2F2',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DayDetail;
