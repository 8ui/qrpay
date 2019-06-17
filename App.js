import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Constants from 'expo-constants'
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient'
// REDUX
import { Provider } from 'react-redux'
import configureStore from 'core/store'

// PERSIST
import { PersistGate } from 'redux-persist/integration/react'

import {
  Platform, StatusBar,
} from 'react-native';

import AppNavigator from './app/Navigator';

async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      roboto: require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-300': require('./assets/fonts/Roboto-Light.ttf'),
      'roboto-500': require('./assets/fonts/Roboto-Medium.ttf'),
      'roboto-600': require('./assets/fonts/Roboto-Bold.ttf'),
    }),
  ]);
}

function handleLoadingError(error: Error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const { store, persistor } = configureStore()

export default function App({ skipLoadingScreen }) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  }

  // <PersistGate loading={null} persistor={persistor}>
  //   <AppNavigator />
  // </PersistGate>

  return (
    <LinearGradient
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
      }}
      colors={['#99D815', '#49C0DC']}
      start={[0, 0]}
      end={[1, 1]}
    >
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </LinearGradient>
  );
}
