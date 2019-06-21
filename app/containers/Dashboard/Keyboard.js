import React from 'react'
import { connect } from 'react-redux'
import { px } from 'core/utils'
import settings from 'app/settings'
import { withNavigation, StackActions } from 'react-navigation';
import { getActive, mainActions } from 'core/main'
import { Dimensions } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components'
const window = Dimensions.get('window')
// const { width } = Dimensions.get('window')
const width = window.width > settings.keyboardMaxWidth ? settings.keyboardMaxWidth : window.width
console.log(settings, width);

const Wrapper = styled.View`
  align-items: center;
  opacity: ${props => (props.active ? 0 : 1)};
`
const KeysWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  max-width: ${Math.ceil(width)}px;
`
const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: ${Math.floor(width / 3)}px;
  height: ${px(70)};
`
const Text = styled.Text`
  color: #F6F5DF;
  font-size: ${px(48)};
  font-family: roboto-300;
  line-height: ${props => px(props.mini ? 30 : 60)};
`
const SubmitButton = styled.TouchableOpacity`
  margin: ${px(25, 0, 20)};
  width: ${px(80)};
  height: ${px(80)};
  border: ${px(2)} solid #FFFFFF;
  align-items: center;
  justify-content: center;
  border-radius: ${px(40)};
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
        <FontAwesome name="qrcode" size={px(48).int} color="white" />
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
