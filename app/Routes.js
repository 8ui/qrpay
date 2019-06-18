import React from 'react';
import { createStackNavigator } from 'react-navigation';
import * as transitions from 'react-navigation-transitions';
import Dashboard from './containers/Dashboard';
import StartScreen from './containers/StartScreen';
import QRCodeScreen from './containers/Dashboard/Qrcode';

const Settings = {
  headerMode: 'none',
  transitionConfig: ({ scenes }) => {
    const nextScene = scenes[scenes.length - 1];
    let prop;
    try {
      prop = nextScene.route.params.transition
    } catch (e) {
      prop = 'fromRight'
    }
    return {
      ...transitions[prop](),
      containerStyle: {
        backgroundColor: 'transparent',
      }
    }
  },
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
