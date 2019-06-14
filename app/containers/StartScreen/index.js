import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.View`

`
const TextWrapper = styled.Text`

`

class StartScreen extends React.Component {
  render() {
    return (
      <Wrapper>
        <TextWrapper>
          Приложение позволяет принимать платежи от клиентов.
        </TextWrapper>
        <TextWrapper>
          Генерируйте QR код с суммой.
        </TextWrapper>
        <TextWrapper>
          Покупатель сканирует в приложении любого банка. Моментально получаете деньги на свой счёт
        </TextWrapper>
      </Wrapper>
    )
  }
}

export default StartScreen;
