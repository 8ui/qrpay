import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState } from 'react';
// REDUX
import { Provider } from 'react-redux'
import configureStore from 'core/store'

// PERSIST
import { PersistGate } from 'redux-persist/integration/react'

import {
  Platform, StatusBar, Text, View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './app/Navigator';

async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      ...Ionicons.font,
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
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
    <React.Fragment>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </React.Fragment>
  );
}
