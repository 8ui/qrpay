import React from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components'

const WIDTH = Dimensions.get('window').width

const transform = (props) => {
  let scale = 1;

  if ((WIDTH - props.offset) < props.width2) {
    scale = (WIDTH - props.offset) / props.width2
  }
  // console.log(scale, props.width2, WIDTH, props.offset);
  return `scale(${scale})`;
}

const SumWrapper = styled.View`
  align-items: flex-start;
  transform: scale(${props => props.scale});
`
const TextWrapper = styled.Text`
  color: white;
  font-size: 64px;
  font-family: roboto-500;
  line-height: 66px;
  margin: 0 4px;
  transform: ${transform};
`
const TextSmallWrapper = styled.Text`
  position: absolute;
  color: white;
  font-size: 28px;
  font-family: roboto-300;
  line-height: 33px;
  margin: 0 4px;
  ${props => (props.attach
    ? 'top: -30px;'
    : '')
  }
  ${props => (props.left
    ? 'left: -60px;'
    : 'right: -40px;'
  )}
`

class Sum extends React.Component {
  render() {
    // const { width } = this.state;
    const { sum, offset, scale } = this.props;
    const width = sum[0].length / 5 * 170
    return (
      <SumWrapper
        scale={scale}
        onLayout={({ nativeEvent: { layout } }) => {
          if (width !== layout.width) {
            this.setState({
              width: layout.width,
            })
          }
        }}
      >
        <TextSmallWrapper left small attach={WIDTH < width}>RUB</TextSmallWrapper>
        <TextWrapper
          width2={width}
          offset={offset}
        >
          {sum[0]}
        </TextWrapper>
        <TextSmallWrapper small attach={WIDTH < width}>,{sum[1]}</TextSmallWrapper>
      </SumWrapper>
    )
  }
}

Sum.defaultProps = {
  scale: 1,
  offset: 40,
}

export default Sum;
