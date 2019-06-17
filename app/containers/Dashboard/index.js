import React from 'react'
import { connect } from 'react-redux'
import { getFormatedSum, getOpenQR } from 'core/main'
import { SafeAreaView } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import styled from 'styled-components'

import { Logo } from 'atoms'
import Keyboard from './Keyboard'
import Sum from './Sum'


const Wrapper = styled.View`
  flex: 1;
`
const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
`
const HeaderWrapper = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 10px;
`
const Dropdown = styled(Entypo)`
  color: white;
  font-size: 30px;
`
const ResultWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.active ? 0 : 1)};
`

class Dashboard extends React.Component {
  renderHeader = () => {
    return (
      <HeaderWrapper>
        <Logo />
        <Dropdown name="dots-three-vertical" />
      </HeaderWrapper>
    )
  }

  renderSum = () => {
    const { sum, openQR } = this.props;
    // const
    return (
      <ResultWrapper active={openQR}>
        <Sum sum={sum} />
      </ResultWrapper>
    )
  }

  render() {
    return (
      <Wrapper>
        <SafeAreaViewWrapper>
          {this.renderHeader()}
          {this.renderSum()}
          <Keyboard />
        </SafeAreaViewWrapper>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  sum: getFormatedSum(state).split('.'),
  openQR: getOpenQR(state),
})

export default connect(mapStateToProps)(Dashboard);
