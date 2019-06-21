import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { transitionConfig } from 'core/utils/SceneTransition';
import Dashboard from './containers/Dashboard';
import StartScreen from './containers/StartScreen';
import QRCodeScreen from './containers/Dashboard/Qrcode';
import BindTerminal from './containers/BindTerminal';


const Routes = createStackNavigator(
  {
    StartScreen: { screen: StartScreen },
    QRCodeScreen: { screen: QRCodeScreen },
    Dashboard: { screen: Dashboard },
    BindTerminal: { screen: BindTerminal },
  },
  // SETTINGS
  {
    initialRouteName: 'Dashboard',
    headerMode: 'none',
    cardShadowEnabled: false,
    // prevTransitionProps,
    transitionConfig,
    transparentCard: true,
  },
)

export default Routes;
