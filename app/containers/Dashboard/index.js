import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components'

import { Header } from 'molucules'

const Wrapper = styled(LinearGradient)`
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
        <TextWrapper>Welcome</TextWrapper>
      </Wrapper>
    )
  }
}

export default Dashboard;
