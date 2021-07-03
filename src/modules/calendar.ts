const SET_START_DATE = 'calendar/SET_START_DATE' as const;
const SET_END_DATE = 'calendar/SET_END_DATE' as const;
const SET_START_MONTH_DATE = 'calendar/SET_START_MONTH_DATE' as const;

export const setStartDate = (startDate: Date) => ({
  type: SET_START_DATE,
  payload: startDate,
});
export const setEndDate = (endDate: Date) => ({
  type: SET_END_DATE,
  payload: endDate,
});
export const setStartMonthDate = (startMonthDate: number) => ({
  type: SET_START_MONTH_DATE,
  payload: startMonthDate,
});

type CalendarAction =
  | ReturnType<typeof setStartDate>
  | ReturnType<typeof setEndDate>
  | ReturnType<typeof setStartMonthDate>;

type CalendarState = {
  startDate: Date;
  endDate: Date;
  startMonthDate: number;
};

const initialState: CalendarState = {
  startDate: new Date(),
  endDate: new Date(),
  startMonthDate: 1,
};

function calendar(state: CalendarState = initialState, action: CalendarAction) {
  switch (action.type) {
    case SET_START_DATE:
      return {
        ...state,
        startDate: action.payload,
      };
    case SET_END_DATE:
      return {
        ...state,
        endDate: action.payload,
      };
    case SET_START_MONTH_DATE:
      return {
        ...state,
        startMonthDate: action.payload,
      };
    default:
      return state;
  }
}

export default calendar;
