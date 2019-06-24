import React from 'react'
import { connect } from 'react-redux'
import { getFormatedSum, getOpenQR } from 'core/main'
import { statusBar } from 'app/hoc'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components'

// import { Logo } from 'atoms'
import { Dropdown, Header } from 'molucules'
import Keyboard from './Keyboard'
import Sum from './Sum'


const Wrapper = styled(SafeAreaView)`
  flex: 1;
`
const ResultWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.active ? 0 : 1)};
`
const DropdownWrapper = styled(Dropdown)`
  position: absolute;
  top: 0;
  right: 0;
`
// const LogoWrapper = styled(Logo)`
//   opacity: 0.7;
//   margin-left: 10px;
// `

@statusBar
class Dashboard extends React.Component {
  renderHeader = () => (
    <DropdownWrapper icon="dots-three-vertical" />
  )

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
