import React from 'react'
import { connect } from 'react-redux'
import { getFormatedSum, getOpenQR } from 'core/main'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components'
import { WhitePortal } from 'react-native-portal';

// import { Logo } from 'atoms'
import { Dropdown, Header } from 'molucules'
import Keyboard from './Keyboard'
import Sum from './Sum'


const Wrapper = styled(SafeAreaView)`
  flex: 1;
`
const HeaderWrapper = styled(Header)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`
const ResultWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.active ? 0 : 1)};
`
// const LogoWrapper = styled(Logo)`
//   opacity: 0.7;
//   margin-left: 10px;
// `

class Dashboard extends React.Component {
  renderHeader = () => {
    return (
      <HeaderWrapper
        back={false}
        renderRight={() => <Dropdown icon="dots-three-vertical" />}
      />
    )
  }

  renderSum = () => {
    const { sum } = this.props;
    return (
      <ResultWrapper>
        <Sum sum={sum} />
      </ResultWrapper>
    )
  }

  render() {
    return (
      <Wrapper>
        <WhitePortal name="dashboard" />
        {this.renderHeader()}
        {this.renderSum()}
        <Keyboard />
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  sum: getFormatedSum(state).split('.'),
  openQR: getOpenQR(state),
})

export default connect(mapStateToProps)(Dashboard);
