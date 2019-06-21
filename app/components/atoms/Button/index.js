import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { px } from 'core/utils'
import styled from 'styled-components'

const Wrapper = styled.TouchableOpacity`
`
const WrapperGradient = styled(LinearGradient)`
  height: ${px(68)};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${px(34)};
`
const WrapperText = styled.Text`
  font-size: ${px(24)};
  color: #fff;
  font-family: roboto;
`

const Button = ({ children }) => (
  <Wrapper>
    <WrapperGradient
      colors={['#99D815', '#49C0DC']}
      start={[0, 0]}
      end={[1, 0]}
    >
      <WrapperText>{children}</WrapperText>
    </WrapperGradient>
  </Wrapper>
)

export default Button;
