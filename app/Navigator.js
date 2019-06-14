import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import AuthLoadingScreen from './Auth';
// import AuthStack from './containers/Entry';
import Routes from './Routes'


const MainStack = createSwitchNavigator(
  {
    // AuthLoading: AuthLoadingScreen,
    App: Routes,
    // Auth: AuthStack,
  },
  {
    initialRouteName: 'App',
    // initialRouteName: 'AuthLoading',
  }
);

export default createAppContainer(MainStack);
