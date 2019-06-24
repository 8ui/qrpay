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
    case type.MAIN_SET_SUM:
      return { ...state, sum: action.payload };
    case type.MAIN_OPEN_QR:
      return { ...state, openQR: action.payload };
    case type.MAIN_CHANGE_FLOAT:
      return { ...state, float: !state.float };
    case type.MAIN_BACKSPACE: {
      const sum = state.sum.toString().slice(0, -1).replace(/\.$/, '') || 0
      if (sum === 0) state.float = false
      return { ...state, sum: parseFloat(sum) };
    }
    default:
      return state;
  }
}
