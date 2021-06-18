import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useStyle from '../@common/useStyle';

const HEADER = ['일', '월', '화', '수', '목', '금', '토'];

function Monthly(props) {
  const {containerStyle, selectedColor} = useStyle();

  return (
    <View style={containerStyle}>
      <View style={styles.row}>
        {HEADER.map(day => (
          <View>
            <Text>{day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Monthly;
