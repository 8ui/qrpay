import { userActions as type } from './actions';

const initialState = {
  data: [],
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case type.USER_FETCH_PENDING:
      return { ...state, loading: true };
    default:
      return state;
  }
}
