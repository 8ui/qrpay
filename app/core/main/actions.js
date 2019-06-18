export const mainActions = {
  MAIN_CHANGE_SUM: 'MAIN_CHANGE_SUM',
  MAIN_OPEN_QR: 'MAIN_OPEN_QR',
  MAIN_CHANGE_FLOAT: 'MAIN_CHANGE_FLOAT',

  changeSum: payload => ({
    type: mainActions.MAIN_CHANGE_SUM,
    payload,
  }),

  openQR: payload => ({
    type: mainActions.MAIN_OPEN_QR,
    payload,
  }),

  changeFloat: () => ({
    type: mainActions.MAIN_CHANGE_FLOAT,
  }),
};
