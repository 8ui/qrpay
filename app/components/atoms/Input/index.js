import React from 'react'
import { px } from 'core/utils'
import styled from 'styled-components'


const Wrapper = styled.View`
  flex-direction: column;
`
const LabelWrapper = styled.Text`
  font-size: ${px(12)};
  color: #49C0DC;
  font-family: roboto;
`
const InputWrapper = styled.TextInput`
  font-size: ${px(24)};
  color: #565656;
  font-family: roboto-500;
  margin: ${px(5, 0)};
  border-bottom-width: ${px(3)};
  border-bottom-color: #49C0DC;
  padding: 10px;
`

const Input = ({ label, value }) => (
  <Wrapper>
    <LabelWrapper>{label}</LabelWrapper>
    <InputWrapper value={value} />
  </Wrapper>
)

export default Input;
