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
  line-height: ${props => (props.mini ? 30 : 60)}px;
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
  activeButton = false

  onChange = (val, i) => {
    const { onChange, changeFloat, backspace } = this.props;
    switch (i) {
      case 9: // « , »
        changeFloat()
        break;
      case 11: // « <- »
        backspace();
        break;
      default:
        onChange(parseInt(val, 10))
    }
  }

	openQRcode = () => {
    const { navigation } = this.props;
    if (this.activeButton) return;
    this.activeButton = true;
    navigation.dispatch(StackActions.push({
      routeName: 'QRCodeScreen',
      params: {
        transition: 'fromBottom',
      }
    }))
    setTimeout(() => {
      this.activeButton = false;
    }, 400)
	}

  renderButton = (val, i, mini) => {
    return (
      <Button key={`key-${i}`} onPress={() => this.onChange(val, i)}>
        {typeof val === 'string'
          ? <Text mini={mini}>{val}</Text>
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
          {this.renderButton(',', 9, true)}
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
  changeFloat: (...props) => dispatch(mainActions.changeFloat(...props)),
  backspace: () => dispatch(mainActions.backspace()),
})

const mapStateToProps = state => ({
  activeButton: getActive(state),
})

export default connect(mapStateToProps, mapDispatchProps)(withNavigation(Keyboard))
