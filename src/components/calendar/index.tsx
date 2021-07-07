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
      <Pressable
        style={styles.monthSelector}
        onPress={() => {
          if (calendarSelector.current) {
            calendarSelector.current.open();
          }
        }}>
        <View style={{marginRight: 15}}>
          <Text style={styles.month}>{format(startDate, 'M월 d일')}</Text>
          <Text style={styles.tilde}>~</Text>
          <Text style={styles.month}>{format(endDate, 'M월 d일')}</Text>
        </View>
        <Icon name="angle-down" size={20} />
      </Pressable>
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
  monthSelector: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  month: {fontSize: 18, fontWeight: 'bold', textAlign: 'left'},
  tilde: {fontSize: 18, fontWeight: 'bold', textAlign: 'center'},
});

export default Calendar;
