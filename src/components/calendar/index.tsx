import React, {useEffect, useRef, useState} from 'react';
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
import {addMonths, format, setDate, subDays} from 'date-fns';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Monthly from './Monthly';
import Weekly from './Weekly';
import List from './List';
import BottomSelect from '../@common/BottonSheet';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../modules';
import {setStartMonthDate} from '../../modules/calendar';

function Calendar() {
  const {containerStyle, selectedColor} = useStyle();
  const [subTab, setSubTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {startMonthDate} = useSelector((state: RootState) => state.calendar);
  const dispatch = useDispatch();

  const startDate = setDate(selectedDate, startMonthDate);
  const endDate = subDays(addMonths(startDate, 1), 1);

  const calendarSelector: any = useRef();

  useEffect(() => {
    database()
      .ref('/users/001')
      .once('value')
      .then(snapshot => {
        dispatch(setStartMonthDate(snapshot.val().startMonthDate));
      });
  }, []);

  console.log('사용자가 설정한 시작일: ', startMonthDate);

  return (
    <SafeAreaView style={containerStyle}>
      <Pressable
        style={styles.monthSelector}
        onPress={() => {
          if (calendarSelector.current) {
            calendarSelector.current.open();
          }
        }}>
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
      <BottomSelect title="달력 선택" slide={calendarSelector}>
        <View>
          <Text>하이루</Text>
        </View>
      </BottomSelect>
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
