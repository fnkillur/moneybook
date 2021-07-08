import React, {useMemo} from 'react';
import {
  Pressable,
  Text,
  useWindowDimensions,
  View,
  StyleSheet,
} from 'react-native';
import {addDays, eachWeekOfInterval, isSameDay, isSameMonth} from 'date-fns';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../modules';
import {setSelectDate} from '../../modules/calendar';

const HEADER = ['일', '월', '화', '수', '목', '금', '토'];
const WEEKS = [0, 1, 2, 3, 4, 5, 6];

function Monthly() {
  const totalWidth = useWindowDimensions().width - 10;
  const {startDate, endDate, selectDate} = useSelector(
    (state: RootState) => state.calendar,
  );
  const dispatch = useDispatch();

  const weeksOfMonth: Date[] = useMemo(
    () => eachWeekOfInterval({start: startDate, end: endDate}),
    [startDate, endDate],
  );

  const bottomBorderColors = ['#D8D8D8', '#E6E6E6', '#F2F2F2'];

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          {HEADER.map(day => (
            <View key={day} style={{width: totalWidth / 7}}>
              <Text style={styles.headerCell}>{day}</Text>
            </View>
          ))}
        </View>
        {weeksOfMonth.map((startOfWeek: Date) => {
          return (
            <View key={startOfWeek.getTime()} style={styles.row}>
              {WEEKS.map((day: number) => {
                const date: Date = addDays(startOfWeek, day);
                const isThisMonth = isSameMonth(date, startDate);
                const isSelectDay = isSameDay(date, selectDate);
                const dateStyle = isSelectDay
                  ? {...styles.dateCell, color: '#FFF'}
                  : isThisMonth
                  ? styles.dateCell
                  : styles.notThisMonth;

                return (
                  <Pressable
                    key={date.getDate()}
                    style={{
                      width: totalWidth / 7,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => dispatch(setSelectDate(date))}>
                    <View style={isSelectDay ? styles.selectBox : null}>
                      <Text style={dateStyle}>{date.getDate()}</Text>
                      {/*<Text style={styles.spend}>-120,500</Text>*/}
                      {/*<Text style={styles.income}>+3,120,500</Text>*/}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          );
        })}
      </View>
      <LinearGradient colors={bottomBorderColors} style={styles.bottomBorder} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    backgroundColor: '#FFF',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    height: 25,
  },
  headerCell: {
    textAlign: 'center',
    fontSize: 13,
    color: '#848484',
    lineHeight: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    height: 40,
  },
  dateCell: {
    textAlign: 'center',
    fontSize: 13,
    color: '#141414',
    lineHeight: 30,
  },
  notThisMonth: {
    textAlign: 'center',
    fontSize: 13,
    color: '#BDBDBD',
    lineHeight: 30,
  },
  selectBox: {
    borderRadius: 12,
    backgroundColor: '#151515',
    width: 30,
    height: 30,
  },
  spend: {
    fontSize: 9,
    textAlign: 'left',
  },
  income: {
    fontSize: 9,
    textAlign: 'left',
  },
  bottomBorder: {
    height: 30,
    top: -15,
    zIndex: -1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});

export default Monthly;
