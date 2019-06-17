import { numberWithSpaces } from 'core/utils/number'

export const getMain = state => state.main;

export const getSum = state => getMain(state).sum;

export const getFormatedSum = state => (
  numberWithSpaces(parseFloat(getMain(state).sum))
);

export const getActive = state => !getSum(state);

export const getOpenQR = state => getMain(state).openQR;
