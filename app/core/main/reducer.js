import { mainActions as type } from './actions';

const initialState = {
  data: [],
  sum: 0,
  openQR: false,
  float: false,
};

export function mainReducer(state = initialState, action) {
  switch (action.type) {
    case type.MAIN_CHANGE_SUM: {
      const sum = state.sum.toFixed(2).split('.')
      if (state.float) {
        sum[1] = sum[1][1] + action.payload
      } else {
        sum[0] += action.payload
        sum[0] = parseInt(sum[0], 10)
      }
      return { ...state, sum: parseFloat(sum.join('.')) };
    }
    case type.MAIN_OPEN_QR:
      return { ...state, openQR: action.payload };
    case type.MAIN_CHANGE_FLOAT:
      return { ...state, float: !state.float };
    default:
      return state;
  }
}
