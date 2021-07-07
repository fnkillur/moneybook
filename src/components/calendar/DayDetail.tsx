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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DayDetail;
