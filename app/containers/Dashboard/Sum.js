import React from 'react'
import { connect } from 'react-redux'
import { px } from 'core/utils'
import { getMain } from 'core/main'
import { Dimensions } from 'react-native'
import { Text } from 'react-native-animatable';
import styled from 'styled-components'

const WIDTH = Dimensions.get('window').width
const CURR_WIDTH = 70;

const transform = (props) => {
  let scale = 1;

  if ((WIDTH - props.offset) < props.width2) {
    scale = (WIDTH - props.offset) / props.width2
  }
  return scale;
}
const left = (props) => {
  const scale = transform(props);
  return (WIDTH - props.offset) * (1 - scale) + 3;
}

const Wrapper = styled.View`
  margin-top: ${props => px(props.attach ? 10 : 0)};
  transform: scale(${props => props.scale});
`
const CurrencyWrapper = styled(Text)`
  position: absolute;
  color: white;
  font-size: ${px(28)};
  font-family: roboto-300;
  line-height: ${px(33)};
  margin: ${px(0, 4)};
  left: ${px(-CURR_WIDTH)};
  ${props => (props.attach
    ? `
      top: ${px(-30)};
      left: ${px(left(props))};
    `
    : '')
  }
`
const SumWrapper = styled.View`
  flex-direction: row;
`
const IntWrapper = styled(Text)`
  color: white;
  font-size: ${props => px(64 * transform(props))};
  font-family: roboto-500;
  line-height: ${props => px(66 * transform(props))};
  margin: ${px(0, 4)};
`
const FloatWrapper = styled(Text)`
  color: white;
  font-size: ${props => px(28 * transform(props))};
  font-family: roboto-300;
  line-height: ${props => px(33 * transform(props))};
  margin: 0px;
`

class Sum extends React.Component {
  constructor(props) {
    super(props);

    this.refInt = React.createRef();
    this.refFloat = React.createRef();
  }

  componentWillReceiveProps({ float, mainSum }) {
    if (float !== this.props.float && mainSum === this.props.mainSum) {
      if (float) this.refFloat.current.bounce(300)
      else this.refInt.current.bounce(300)
    }
  }

  render() {
    // const { width } = this.state;
    const { sum, offset, scale } = this.props;
    const width = sum[0].length / 5 * 170 + 37 + 4
    const attach = CURR_WIDTH >= (WIDTH - width) / 2
    return (
      <Wrapper
        scale={scale}
        attach={attach}
      >
        <CurrencyWrapper
          attach={attach}
          offset={offset}
        >
          RUB
        </CurrencyWrapper>
        <SumWrapper>
          <IntWrapper
            width2={width}
            offset={offset}
            ref={this.refInt}
          >
            {sum[0]}
          </IntWrapper>
          <FloatWrapper
            width2={width}
            offset={offset}
            ref={this.refFloat}
          >
            ,{sum[1]}
          </FloatWrapper>
        </SumWrapper>
      </Wrapper>
    )
  }
}

Sum.defaultProps = {
  scale: 1,
  offset: 40,
}

const mapStateToProps = state => ({
  float: getMain(state).float,
  mainSum: getMain(state).sum,
})

export default connect(mapStateToProps)(Sum);
