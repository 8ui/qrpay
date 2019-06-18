import React from 'react'
import { connect } from 'react-redux'
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
const CloseButtonWrapper = styled.View`
  align-items: center;
  margin-top: 10px;
`
const CloseButton = styled.TouchableOpacity`
  margin: 25px 0 5px;
  width: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  opacity: ${props => (props.disabled ? 0.3 : 1)}
`
const Container = styled.View`
  margin: 0 20px;
`
const Header = styled.View`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #49C0DC;
  align-items: center;
  justify-content: center;
  padding: 13px 0 0;
`
const QRCodeWrapper = styled.View`
  background: #fff;
  padding: 40px 0 0;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`
const TextWrapper = styled.Text`
  font-size: 13px;
  color: rgba(86, 86, 86, 0.79);
  margin: 20px 0 30px;
`
const QRCodeBlank = styled.View`
  width: ${settings.barcodeSize}px;
  height: ${settings.barcodeSize}px;
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
            logoSize={[77, 22]}
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
          <Ionicons name="ios-close" size={74} color="white" />
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
