import {makeCalendarPeriod} from '../utils/dateUtils';

const SET_START_DATE_OF_MONTH = 'calendar/SET_START_MONTH_DATE' as const;
const SET_CALENDAR_PERIOD = 'calendar/SET_CALENDAR_PERIOD' as const;
const SET_SELECT_DATE = 'calendar/SET_SELECT_DATE' as const;

export const setStartDateOfMonth = (startDateOfMonth: number) => ({
  type: SET_START_DATE_OF_MONTH,
  payload: startDateOfMonth,
});
export const setCalendarPeriod = (startDate: Date) => ({
  type: SET_CALENDAR_PERIOD,
  payload: startDate,
});
export const setSelectDate = (selectDate: Date) => ({
  type: SET_SELECT_DATE,
  payload: selectDate,
});

type CalendarAction =
  | ReturnType<typeof setStartDateOfMonth>
  | ReturnType<typeof setCalendarPeriod>
  | ReturnType<typeof setSelectDate>;

type CalendarState = {
  startDateOfMonth: number;
  startDate: Date;
  endDate: Date;
  selectDate: Date;
};

const initStartDate = new Date();
const initStartDateOfMonth = 1;
const initialState: CalendarState = {
  startDateOfMonth: initStartDateOfMonth,
  ...makeCalendarPeriod(initStartDate, initStartDateOfMonth),
  selectDate: initStartDate,
};

function calendar(state: CalendarState = initialState, action: CalendarAction) {
  switch (action.type) {
    case SET_START_DATE_OF_MONTH:
      return {
        startDateOfMonth: action.payload,
        ...makeCalendarPeriod(state.startDate, action.payload),
      };
    case SET_CALENDAR_PERIOD:
      return {
        ...state,
        ...makeCalendarPeriod(action.payload, state.startDateOfMonth),
      };
    case SET_SELECT_DATE:
      return {
        ...state,
        selectDate: action.payload,
      };
    default:
      return state;
  }
}

export default calendar;
