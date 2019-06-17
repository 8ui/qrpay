import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { transitionConfig } from './utils/SceneTransition';
import Dashboard from './containers/Dashboard';
import StartScreen from './containers/StartScreen';
import QRCodeScreen from './containers/Dashboard/Qrcode';

const Settings = {
  headerMode: 'none',
  transitionConfig,
  transparentCard: true,
  cardStyle: {
    shadowColor: 'transparent',
    backgroundColor: 'transparent',
  },
};

const Routes = createStackNavigator(
  {
    StartScreen: { screen: StartScreen },
    QRCodeScreen: { screen: QRCodeScreen },
    Dashboard: { screen: Dashboard },
  },
  {
    ...Settings,
    initialRouteName: 'Dashboard',
  },
)

export default Routes;
