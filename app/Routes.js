import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { transitionConfig } from './utils/SceneTransition';
import Dashboard from './containers/Dashboard';
import StartScreen from './containers/StartScreen';

const Settings = {
  headerMode: 'none',
  transitionConfig,
  cardStyle: {
    shadowColor: 'transparent',
    backgroundColor: 'transparent',
  },
};

const Routes = createStackNavigator(
  {
    StartScreen: { screen: StartScreen },
    Dashboard: { screen: Dashboard },
  },
  {
    ...Settings,
    initialRouteName: 'Dashboard',
  },
)

export default Routes;
