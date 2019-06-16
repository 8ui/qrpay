import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components'

import Keyboard from './Keyboard'
import { Header } from 'molucules'

const Wrapper = styled(LinearGradient)`
  flex: 1;
`
const SumWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
const TextWrapper = styled.Text`
  color: white;
`

class Dashboard extends React.Component {
  render() {
    return (
      <Wrapper colors={['#99D815', '#49C0DC']} start={[0, 0]} end={[1, 1]}>
        <Header />
        <SumWrapper><TextWrapper>0,00</TextWrapper></SumWrapper>
        <Keyboard />
      </Wrapper>
    )
  }
}

export default Dashboard;
