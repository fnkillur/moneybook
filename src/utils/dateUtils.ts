import {addMonths, setDate, subDays} from 'date-fns';

export const makeCalendarPeriod = (
  startYearAndMonth: Date,
  startDateOfMonth: number,
) => {
  const startDate = setDate(startYearAndMonth, startDateOfMonth);

  return {
    startDate,
    endDate: subDays(addMonths(startDate, 1), 1),
  };
};
