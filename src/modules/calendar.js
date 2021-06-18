const SET_START_DATE = 'calendar/SET_START_DATE';
const SET_END_DATE = 'calendar/SET_END_DATE';

export const setStartDate = () => ({type: SET_START_DATE});
export const setEndDate = () => ({type: SET_END_DATE});

const initialState = {
  startDate: new Date(),
  endDate: new Date(),
};

function calendar(state = initialState, action) {
  switch (action) {
    default:
      return state;
  }
}

export default calendar;
