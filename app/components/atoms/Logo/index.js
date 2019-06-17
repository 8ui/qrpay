import React from 'react'
import { Image } from 'react-native';
import styled from 'styled-components'

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`
const Icon = styled(Image)`
  margin-right: 6px;
`
const TextWrapper = styled.Text`
  font-family: roboto${props => (props.bold ? '-600' : '')};
  font-size: 21px;
  color: white;
  margin-left: 3px;
`

const Logo = (props) => {
  return (
    <Wrapper>
      <Icon width={30} height={30} source={require('assets/logo-min.png')} />
      <TextWrapper bold>QR</TextWrapper>
      <TextWrapper>Bank</TextWrapper>
    </Wrapper>
  )
}

export default Logo;
