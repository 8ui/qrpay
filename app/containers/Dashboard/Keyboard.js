import React from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components'

const { width } = Dimensions.get('window')

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`
const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: ${Math.floor(width / 3)}px;
  height: 80px;
`
const Text = styled.Text`
  color: white;
  font-size: 22px;
`

class Keyboard extends React.Component {
  renderButton = (n, num) => {
    return (
      <Button><Text>{num + 1}</Text></Button>
    )
  }

  render() {
    return (
      <Wrapper>
        {Array.from(Array(9)).map(this.renderButton)}
      </Wrapper>
    )
  }
}

export default Keyboard
