import React from 'react'
import { connect } from 'react-redux'
import { getMain } from 'core/main'
import { Dimensions } from 'react-native'
import { Text } from 'react-native-animatable';
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
  flex-direction: row;
`
const TextWrapper = styled(Text)`
  color: white;
  font-size: 64px;
  font-family: roboto-500;
  line-height: 66px;
  margin: 0 4px;
  transform: ${transform};
`
const TextSmallWrapper = styled(Text)`
  position: absolute;
  color: white;
  font-size: 28px;
  font-family: roboto-300;
  line-height: 33px;
  margin: 0 4px;
  left: -70px;
  ${props => (props.attach
    ? 'top: -30px;'
    : '')
  }
`
const FloatWrapper = styled(Text)`
  color: white;
  font-size: 28px;
  font-family: roboto-300;
  line-height: 33px;
  margin: 0px;
`

class Sum extends React.Component {
  constructor(props) {
    super(props);

    this.refInt = React.createRef();
    this.refFloat = React.createRef();
  }

  componentWillReceiveProps({ float }) {
    if (float !== this.props.float) {
      if (float) this.refFloat.current.bounce(300)
      else this.refInt.current.bounce(300)
    }
  }

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
        <TextSmallWrapper attach={WIDTH < width}>RUB</TextSmallWrapper>
        <TextWrapper
          ref={this.refInt}
          width2={width}
          offset={offset}
        >
          {sum[0]}
        </TextWrapper>
        <FloatWrapper ref={this.refFloat}>,{sum[1]}</FloatWrapper>
      </SumWrapper>
    )
  }
}

Sum.defaultProps = {
  scale: 1,
  offset: 40,
}

const mapStateToProps = state => ({
  float: getMain(state).float,
})

export default connect(mapStateToProps)(Sum);
