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
import {addMonths, format, setDate} from 'date-fns';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Monthly from './Monthly';
import Weekly from './Weekly';
import List from './List';

function Calendar() {
  const {containerStyle, selectedColor} = useStyle();
  const [subTab, setSubTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const settingDate = 5;
  const startDate = setDate(selectedDate, settingDate);
  const endDate = addMonths(startDate, 1);

  return (
    <SafeAreaView style={containerStyle}>
      <Pressable
        style={styles.monthSelector}
        onPress={() => console.log('click')}>
        <View style={{marginRight: 15}}>
          <Text style={styles.month}>{format(startDate, 'M월 d일')}</Text>
          <Text style={styles.month}>~</Text>
          <Text style={styles.month}>{format(endDate, 'M월 d일')}</Text>
        </View>
        <Icon name="angle-down" size={20} />
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false}>
        {subTab === 0 ? <Monthly /> : subTab === 1 ? <Weekly /> : <List />}
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
  month: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
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
