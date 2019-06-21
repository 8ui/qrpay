import React from 'react'
import { withNavigation, NavigationActions } from 'react-navigation';
import { px } from 'core/utils';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components'

const Wrapper = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: ${px(60)};
  margin: ${px(10, 5, 20)};
`
const BackButton = styled.TouchableOpacity`
  width: ${px(50)};
  height: ${px(60)};
  align-items: center;
  justify-content: center;
`

class Header extends React.Component {
  onBack = () => {
    const { navigation } = this.props
    navigation.dispatch(NavigationActions.back())
  }

  renderBack = () => (
    <BackButton
      onPress={this.onBack}
    >
      <Ionicons name="ios-arrow-back" size={px(40).int} color="#99D815" />
    </BackButton>
  )

  renderLeft = () => {
    const { back, renderLeft } = this.props
    const render = renderLeft ? renderLeft() : (back && this.renderBack());
    const View = styled.View``;

    return render || <View />
  }

  renderRight = () => {
    const { renderRight } = this.props
    return renderRight()
  }

  render() {
    const { style } = this.props
    return (
      <Wrapper style={style}>
        {this.renderLeft()}
        {this.renderRight()}
      </Wrapper>
    )
  }
}

Header.defaultProps = {
  back: true,
  renderRight: () => null
}

export default withNavigation(Header);
