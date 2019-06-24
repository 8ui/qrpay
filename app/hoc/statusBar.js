import React from 'react'
import Constants from 'expo-constants'
import { View } from 'react-native'

const statusBarHoc = Component => props => (
  <React.Fragment>
    <View style={{ height: Constants.statusBarHeight }} />
    <Component {...props} />
  </React.Fragment>
)

export default statusBarHoc;
