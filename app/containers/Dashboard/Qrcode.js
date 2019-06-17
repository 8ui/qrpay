import React from 'react'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { getFormatedSum, mainActions } from 'core/main'
import QRCode from 'react-native-qrcode';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components'

import Sum from './Sum'


const Wrapper = styled(SafeAreaView)`
  flex: 1;
  justify-content: flex-end;
  background-color: transparent;
`
const CloseButtonWrapper = styled.View`
  align-items: center;
  margin-top: 40px;
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
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.25);
  margin: 0 20px;
`
const QRHeader = styled.View`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #49C0DC;
  align-items: center;
  justify-content: center;
  padding: 5px;
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

class QRcode extends React.Component {
  componentWillMount() {
    const { onOpenQR } = this.props;
    onOpenQR(true)
  }

  componentWillUnmount() {
    const { onOpenQR } = this.props;
    onOpenQR(false)
  }

  onClose = () => {
    const { navigation } = this.props;
    navigation.dispatch(NavigationActions.back())
  }

  renderQRcode = () => {
    const { sum } = this.props;
    return (
      <Container>
        <QRHeader>
          <Sum scale={0.8} sum={sum} />
        </QRHeader>
        <QRCodeWrapper>
          <QRCode
            value="test"
            size={180}
            bgColor='black'
            fgColor='white'
          />
          <TextWrapper>
            Покажите этот QR-код вашему покупателю
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
