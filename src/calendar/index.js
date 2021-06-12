import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useStyle from '../@common/useStyle';
import {ButtonGroup} from 'react-native-elements';
import {getMonth} from 'date-fns';
import Icon from 'react-native-vector-icons/FontAwesome5';

function Calendar() {
  const {backgroundColor, selectedColor} = useStyle();
  const [subTab, setSubTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <SafeAreaView
      style={{
        backgroundColor,
        height: '100%',
        paddingHorizontal: 20,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          style={styles.monthSelector}
          onPress={() => console.log('click')}>
          <Text style={styles.month}>{`${getMonth(selectedDate) + 1}월`}</Text>
          <Icon name="angle-down" size={20} />
        </Pressable>
      </ScrollView>
      <View style={styles.subTabContainer}>
        <View style={styles.subTabInner}>
          <ButtonGroup
            containerStyle={styles.subTab}
            buttonStyle={{borderRadius: 15}}
            selectedButtonStyle={{backgroundColor: selectedColor}}
            selectedTextStyle={{
              color: '#FFF',
              fontWeight: 'bold',
              fontSize: 14,
            }}
            innerBorderStyle={{width: 0}}
            textStyle={{color: '#A4A4A4', fontWeight: 'bold', fontSize: 14}}
            buttons={['달력', '주간', '목록']}
            selectedIndex={subTab}
            onPress={index => setSubTab(index)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  monthSelector: {
    paddingHorizontal: 20,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  month: {fontSize: 20, fontWeight: 'bold', marginRight: 10},
  subTabContainer: {
    position: 'absolute',
    bottom: 15,
    zIndex: 99,
    width: '100%',
  },
  subTabInner: {
    display: 'flex',
    alignItems: 'center',
  },
  subTab: {
    width: '90%',
    backgroundColor: '#FFF',
    borderWidth: 0,
    borderRadius: 20,
    height: 40,
    padding: 5,
  },
});

export default Calendar;
