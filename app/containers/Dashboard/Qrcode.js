import React from 'react'
import { connect } from 'react-redux'
import { px } from 'core/utils'
import QRCode from 'react-native-qrcode-svg';
import settings from 'app/settings'
import { NavigationActions } from 'react-navigation'
import { getFormatedSum, mainActions } from 'core/main'
// import QRCode from 'react-native-qrcode';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components'

import Sum from './Sum'


const Wrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
`
const Container = styled.View`
  margin: ${px(0, 20)};
`
const Header = styled.View`
  border-top-left-radius: ${px(10)};
  border-top-right-radius: ${px(10)};
  background: #49C0DC;
  align-items: center;
  justify-content: center;
  padding: ${px(13, 0, 0)};
`
const QRCodeWrapper = styled.View`
  background: #fff;
  padding: ${px(40, 0, 0)};
  align-items: center;
  border-bottom-left-radius: ${px(10)};
  border-bottom-right-radius: ${px(10)};
`
const TextWrapper = styled.Text`
  font-size: ${px(13)};
  color: rgba(86, 86, 86, 0.79);
  margin: ${px(20, 0, 30)};
`
const CloseButtonWrapper = styled.View`
  align-items: center;
`
const CloseButton = styled.TouchableOpacity`
  margin: ${px(25, 0, 20)}
  width: ${px(80)};
  height: ${px(80)};
  align-items: center;
  justify-content: center;
  border-radius: ${px(40)};
`

class QRcode extends React.Component {
  state = {
    // loading: true,
  }

  openQR = false;

  componentWillMount() {
    const { onOpenQR } = this.props;
    this.onOpenQR(true)
  }

  onOpenQR = (action) => {
    const { onOpenQR } = this.props;
    if (this.openQR !== action) {
      onOpenQR(action)
      this.openQR = action
    }
  }

  onClose = () => {
    const { navigation } = this.props;
    navigation.dispatch(NavigationActions.back())
    this.onOpenQR(false)
  }

  renderQRcode = () => {
    const { sum } = this.props;

    return (
      <Container>
        <Header>
          <Sum offset={70} scale={0.8} sum={sum} />
        </Header>
        <QRCodeWrapper>
          <QRCode
            logo={require('assets/logo-text.png')}
            logoSize={[px(77).int, px(22).int]}
            logoMargin={0}
            logoBackgroundColor="transparent"
            value={String(sum)}
            size={settings.barcodeSize}
            color={settings.barcodeColor}
          />
          <TextWrapper>
            Покажите QR-код вашему покупателю
          </TextWrapper>
        </QRCodeWrapper>
      </Container>
    )
  }

  renderCloseButton = () => {
    return (
      <CloseButtonWrapper>
        <CloseButton onPress={this.onClose}>
          <Ionicons name="ios-close" size={px(74).int} color="white" />
        </CloseButton>
      </CloseButtonWrapper>
    )
  }

  render() {
    return (
      <Wrapper>
        {this.renderQRcode()}
        {this.renderCloseButton()}
      </Wrapper>
    )
  }
}

const mapDispatchProps = {
  onOpenQR: mainActions.openQR,
}

const mapStateToProps = state => ({
  sum: getFormatedSum(state).split('.'),
})

export default connect(mapStateToProps, mapDispatchProps)(QRcode)
