import React, {useMemo} from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import useStyle from '../@common/useStyle';
import {addDays, eachWeekOfInterval, isSameMonth} from 'date-fns';
import {useSelector} from 'react-redux';
import {RootState} from '../../modules';

const HEADER = ['일', '월', '화', '수', '목', '금', '토'];
const WEEKS = [0, 1, 2, 3, 4, 5, 6];

function Monthly() {
  const {containerStyle} = useStyle();
  const totalWidth = useWindowDimensions().width - 40;
  const {startDate, endDate} = useSelector(
    (state: RootState) => state.calendar,
  );

  const weeksOfMonth: Date[] = useMemo(
    () => eachWeekOfInterval({start: startDate, end: endDate}),
    [startDate, endDate],
  );

  return (
    <View style={containerStyle}>
      <View style={styles.headerRow}>
        {HEADER.map(day => (
          <View key={day} style={{width: totalWidth / 7}}>
            <Text style={styles.cell}>{day}</Text>
          </View>
        ))}
      </View>
      {weeksOfMonth.map((startOfWeek: Date) => {
        return (
          <View key={startOfWeek.getTime()} style={styles.row}>
            {WEEKS.map((day: number) => {
              const date: Date = addDays(startOfWeek, day);
              const isThisMonth = isSameMonth(date, startDate);
              return (
                <View key={date.getDate()} style={{width: totalWidth / 7}}>
                  <Text style={isThisMonth ? styles.cell : styles.notThisMonth}>
                    {date.getDate()}
                  </Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F6F4F4',
    marginTop: 20,
    height: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F6F4F4',
    height: 70,
  },
  cell: {
    textAlign: 'center',
    fontSize: 14,
    color: '#585858',
  },
  notThisMonth: {
    textAlign: 'center',
    fontSize: 14,
    color: '#BDBDBD',
  },
});

export default Monthly;
