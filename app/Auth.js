import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CodePush from 'react-native-code-push';
import { getUser } from 'core/user';
import * as websocket from './actions/websocket';
import * as user from './actions/user';
import * as store from './actions/store';
import * as staff from './actions/staff';

import { FetchStatus } from 'molucules';


class AuthenticatedComponent extends React.Component {
  state = {
    error: false,
  }

  componentDidMount() {
    this.loadData();
  }

  getBundleVersion = async() => {
    try {
      const metadata = await CodePush.getUpdateMetadata()
      return metadata.label;
    } catch (e) {
      return undefined;
    }
  }


  loadData = async() => {
    const { dispatch, navigation } = this.props;
    this.setState({ error: false });

    try {
      await dispatch(user.load());
      await dispatch(store.load());
      await dispatch(staff.load());
      await dispatch(websocket.init());
      // await new Promise((resolve) => {
      //   setTimeout(resolve, 5000);
      // })
      navigation.navigate('App');
    } catch (e) {
      navigation.navigate('Auth');
    }
  }

  render() {
    const { error } = this.state;

    return (
      <FetchStatus
        loading
        theme="light"
        error={error}
        onRetry={this.loadData}
        fullSize
      />
    );
  }
}

AuthenticatedComponent.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
}

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps)(AuthenticatedComponent);
