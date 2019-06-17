export const mainActions = {
  MAIN_CHANGE_SUM: 'MAIN_CHANGE_SUM',
  MAIN_OPEN_QR: 'MAIN_OPEN_QR',

  changeSum: (sum, float) => ({
    type: mainActions.MAIN_CHANGE_SUM,
    payload: { sum, float },
  }),

  openQR: payload => ({
    type: mainActions.MAIN_OPEN_QR,
    payload,
  }),
};
