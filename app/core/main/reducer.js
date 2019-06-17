import { mainActions as type } from './actions';

const initialState = {
  data: [],
  sum: 0,
  openQR: false,
};

export function mainReducer(state = initialState, action) {
  switch (action.type) {
    case type.MAIN_CHANGE_SUM: {
      const sum = state.sum.toFixed(2).split('.')
      if (action.payload.float) {
        sum[1] = sum[1][1] + action.payload.sum
      } else {
        sum[0] += action.payload.sum
        sum[0] = parseInt(sum[0], 10)
      }
      return { ...state, sum: parseFloat(sum.join('.')) };
    }
    case type.MAIN_OPEN_QR:
      return { ...state, openQR: action.payload };
    default:
      return state;
  }
}
