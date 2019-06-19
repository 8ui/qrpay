import React from 'react'
import { connect } from 'react-redux'
import { getFormatedSum, getOpenQR } from 'core/main'
import { View } from 'react-native-animatable';
import { SafeAreaView } from 'react-native'
import styled from 'styled-components'

// import { Logo } from 'atoms'
import { Dropdown } from 'molucules'
import Keyboard from './Keyboard'
import Sum from './Sum'


const Wrapper = styled(View)`
  flex: 1;
`
const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
`
const HeaderWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  padding: 10px;
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
  constructor(props) {
    super(props);

    this.containerRef = React.createRef();
  }

  componentWillUpdate({ openQR }) {
    // if (this.props.openQR !== openQR) {
    //   const { current } = this.containerRef;
    //   const fade = openQR ? 'fadeOut' : 'fadeIn'
    //   if (current) current[fade](200)
    // }
  }

  renderHeader = () => {
    return (
      <HeaderWrapper>
        {/* <LogoWrapper /> */}
        <Dropdown icon="dots-three-vertical" />
      </HeaderWrapper>
    )
  }

  renderSum = () => {
    const { sum, openQR } = this.props;
    return (
      <ResultWrapper>
        <Sum sum={sum} />
      </ResultWrapper>
    )
  }

  render() {
    return (
      <Wrapper ref={this.containerRef}>
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
