import React from 'react'
import { connect } from 'react-redux'
import { withNavigation, StackActions } from 'react-navigation';
import { getActive, mainActions } from 'core/main'
import { Dimensions } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components'

const { width } = Dimensions.get('window')

const Wrapper = styled.View`
  align-items: center;
  opacity: ${props => (props.active ? 0 : 1)};
`
const KeysWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`
const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: ${Math.floor(width / 3)}px;
  height: 70px;
`
const Text = styled.Text`
  color: #F6F5DF;
  font-size: 48px;
  font-family: roboto-300;
`
const SubmitButton = styled.TouchableOpacity`
  margin: 25px 0 5px;
  width: 80px;
  height: 80px;
  border: 2px solid #FFFFFF;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  opacity: ${props => (props.disabled ? 0.3 : 1)}
`

class Keyboard extends React.Component {
  state = {
    float: false,
  }

  onChange = (val, i) => {
    const { float } = this.state;
    const { onChange } = this.props;
    switch (i) {
      case 9:
        this.setState({ float: !float })
        break;
      case 11:
        this.setState({ float: false })
        break;
      default:
        onChange(parseInt(val, 10), float)
    }
  }

	openQRcode = () => {
    const { navigation } = this.props;
    navigation.dispatch(StackActions.push({
      routeName: 'QRCodeScreen',
    }))
	}

  renderButton = (val, i) => {
    return (
      <Button key={`key-${i}`} onPress={() => this.onChange(val, i)}>
        {typeof val === 'string'
          ? <Text>{val}</Text>
          : val
        }
      </Button>
    )
  }

  renderSubmitButton = () => {
    const { activeButton } = this.props;
    return (
      <SubmitButton onPress={this.openQRcode} disabled={activeButton}>
        <FontAwesome name="qrcode" size={48} color="white" />
      </SubmitButton>
    )
  }

  render() {
    return (
      <Wrapper>
        <KeysWrapper>
          {Array.from(Array(9)).map((n, i) => this.renderButton(`${i + 1}`, i))}
          {this.renderButton(',', 9)}
          {this.renderButton('0', 10)}
          {this.renderButton(
            <Ionicons name="ios-backspace" color="white" size={48} />, 11
          )}
        </KeysWrapper>
        {this.renderSubmitButton()}
      </Wrapper>
    )
  }
}

const mapDispatchProps = dispatch => ({
  dispatch,
  onChange: (...props) => dispatch(mainActions.changeSum(...props)),
})

const mapStateToProps = state => ({
  activeButton: getActive(state),
})

export default connect(mapStateToProps, mapDispatchProps)(withNavigation(Keyboard))
