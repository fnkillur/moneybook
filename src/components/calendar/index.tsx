import React, {useEffect, useRef} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useStyle from '../@common/useStyle';
import {format} from 'date-fns';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Monthly from './Monthly';
import BottomSelect from '../@common/BottonSheet';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../modules';
import {setStartDateOfMonth} from '../../modules/calendar';
import DayDetail from './DayDetail';

function Calendar() {
  const {containerStyle} = useStyle();
  const {startDate, endDate, selectDate} = useSelector(
    (state: RootState) => state.calendar,
  );
  const dispatch = useDispatch();

  const calendarSelector: any = useRef();

  useEffect(() => {
    database()
      .ref('/settings/0001/startDateOfMonth')
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          dispatch(setStartDateOfMonth(snapshot.val()));
        }
      });
  }, []);

  console.log(selectDate);
  return (
    <SafeAreaView style={containerStyle}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            if (calendarSelector.current) {
              calendarSelector.current.open();
            }
          }}>
          <View style={styles.monthPeriod}>
            <Text style={styles.month}>
              {format(startDate, 'M월 d일')} ~ {format(endDate, 'M월 d일')}
            </Text>
            <Icon name="angle-down" size={20} style={{marginLeft: 10}} />
          </View>
        </Pressable>
      </View>
      <View style={styles.summary}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryKey}>수입</Text>
          <Text style={styles.summaryKey}>3,400,000</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryKey}>지출</Text>
          <Text style={styles.summaryKey}>-1,750,00</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Monthly />
        <DayDetail />
      </ScrollView>
      <BottomSelect title="달력 선택" slide={calendarSelector}>
        <View>
          <Text>하이루</Text>
        </View>
      </BottomSelect>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  monthPeriod: {flexDirection: 'row'},
  month: {fontSize: 16, fontWeight: 'bold'},
  summary: {
    textAlign: 'left',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#F2F2F2',
  },
  summaryBox: {
    width: 150,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#FFF',
  },
  summaryKey: {fontSize: 15, fontWeight: 'bold'},
});

export default Calendar;
