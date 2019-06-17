import React from 'react'
import styled from 'styled-components'


const transform = (props) => {
  let scale = 1;
  if (props.val.length > 5) {
    scale = 0.75
  }
  if (props.scale) {
    ({ scale } = props)
  }
  return `scale(${scale})`;
}

const SumWrapper = styled.View`
  align-items: flex-start;
  flex-direction: row;
  transform: ${transform};
`
const TextWrapper = styled.Text`
  color: white;
  font-size: ${props => (props.large ? 64 : 28)}px;
  font-family: roboto${props => (props.large ? '-500' : '-300')};
  line-height: ${props => (props.large ? 66 : 33)}px;
  margin: 0 4px;
`

const Sum = ({ sum, scale }) => (
  <SumWrapper scale={scale} val={sum[0].replace(/\s/, '')}>
    <TextWrapper>RUB</TextWrapper>
    <TextWrapper large>{sum[0]}</TextWrapper>
    <TextWrapper>,{sum[1]}</TextWrapper>
  </SumWrapper>
)

export default Sum;
