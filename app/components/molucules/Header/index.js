import React from 'react'
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components'

const Wrapper = styled.View`

`
const BackButton = styled.TouchableOpacity`

`

class Header extends React.Component {
  renderBack = () => (
    <BackButton
      onPress={() => NavigationActions.back()}
    >
      <Ionicons name="ios-arrow-back" size={16} color="#99D815" />
    </BackButton>
  )

  render() {
    return (
      <Wrapper>
        {this.renderBack()}
      </Wrapper>
    )
  }
}

export default connect()(Header);
