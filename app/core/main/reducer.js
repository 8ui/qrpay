import { mainActions as type } from './actions';

const initialState = {
  data: [],
};

export function mainReducer(state = initialState, action) {
  switch (action.type) {
    case type.MAIN_FETCH_PENDING:
      return { ...state, loading: true };
    default:
      return state;
  }
}
