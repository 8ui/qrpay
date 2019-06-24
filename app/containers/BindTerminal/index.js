import React from 'react'
import { connect } from 'react-redux'
import { px } from 'core/utils'
import { SafeAreaView, StatusBar } from 'react-native'
import styled from 'styled-components'

import * as atoms from 'atoms'
import { Header } from 'molucules'


const Wrapper = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`
const HeaderWrapper = styled(Header)`
`
const TitleWrapper = styled.Text`
  font-size: ${px(26)};
  text-align: center;
  color: #565656;
  font-family: roboto;
`
const InputWrapper = styled.View`
  padding: ${px(20)};
`
const ButtonWrapper = styled.View`
  padding: ${px(20)};
  align-items: center;
`
const Button = styled(atoms.Button)`
  width: ${px(250)};
`

class BindTerminal extends React.Component {
  renderHeader = () => {
    return (
      <HeaderWrapper>

      </HeaderWrapper>
    )
  }

  renderTitle = () => (
    <TitleWrapper>
      Привязка терминала
    </TitleWrapper>
  )

  renderInput = () => (
    <InputWrapper>
      <atoms.Input label="ID терминала" />
    </InputWrapper>
  )

  renderButton = () => (
    <ButtonWrapper>
      <Button>Привязать</Button>
    </ButtonWrapper>
  )

  render() {
    return (
      <Wrapper>
        <StatusBar animated barStyle="dark-content" />
        {this.renderHeader()}
        {this.renderTitle()}
        {this.renderInput()}
        {this.renderButton()}
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(BindTerminal);
