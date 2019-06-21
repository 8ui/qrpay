import React from 'react'
import { withNavigation, StackActions } from 'react-navigation';
import { px } from 'core/utils'
import { Dimensions } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { View } from 'react-native-animatable'
import styled from 'styled-components'
import { BlackPortal } from 'react-native-portal';

import { Divider } from 'atoms'

const { width, height } = Dimensions.get('window');

const Wrapper = styled.View`
  z-index: 4;
`
const ButtonWrapper = styled.TouchableOpacity`
  width: ${px(50)};
  height: ${px(60)};
  align-items: center;
  justify-content: center;
  z-index: 3;
`
const IconWrapper = styled(Entypo)`
  color: ${props => (props.open ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)')};
  font-size: ${px(30)};
`
const Overlay = styled.TouchableOpacity`
  background-color: transparent;
  position: absolute;
  top: ${px(-20)};
  right: ${px(-10)};
  width: ${width}px;
  height: ${height}px;
  z-index: 1;
`
const Menu = styled(View)`
  opacity: 0;
  position: absolute;
  top: 0;
  right: ${px(10)};
  z-index: 2;
  background-color: white;
  border-radius: ${px(5)};
  min-width: ${px(250)};
`
const MenuHeader = styled.Text`
  padding: ${px(22, 25, 15)};
  font-family: roboto;
  font-size: ${px(18)};
  opacity: 0.7;
`
const MenuItem = styled.TouchableOpacity`
  padding: ${px(15, 25, 16)};
  flex-direction: row;
`
const MenuItemText = styled.Text`
  font-size: ${px(18)};
  color: black;
  font-family: roboto-500;
`

class Dropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }

    this.refMenu = React.createRef()
  }

  onPress = (item) => {
    console.log(item);
    const { navigation } = this.props;
    navigation.dispatch(StackActions.push({
      routeName: item.route,
    }))
    this.setState({ open: false })
  }

  toggle = () => {
    const open = !this.state.open

    if (open) this.setState({ open })
    setTimeout(() => {
      const fade = open ? 'fadeIn' : 'fadeOut'
      this.refMenu.current[fade](100).then(() => {
        if (!open) this.setState({ open })
      })
    })
  }

  renderOverlay = () => (!this.state.open ? null : (
    <Overlay
      onPress={() => this.setState({ open: false })}
    />
  ))

  renderMenu = () => {
    const { open } = this.state
    const { menu } = this.props

    if (!open) return null
    return (
      <Menu ref={this.refMenu}>
        <MenuHeader>Настройки</MenuHeader>
        {menu.map(this.renderItem)}
      </Menu>
    )
  }

  renderItem = (n, i) => {
    return (
      <React.Fragment key={`menu-item-${n.value}`}>
        {i !== 0 && <Divider offset={25} />}
        <MenuItem onPress={() => this.onPress(n)}>
          <MenuItemText>{n.name}</MenuItemText>
        </MenuItem>
      </React.Fragment>
    )
  }

  render() {
    const { open } = this.state
    const { icon, style } = this.props
    return (
      <React.Fragment>
        <Wrapper style={style}>
          <ButtonWrapper onPress={this.toggle}>
            <IconWrapper open={open} name={icon} />
          </ButtonWrapper>
        </Wrapper>
        {this.renderMenu()}
        {this.renderOverlay()}
      </React.Fragment>
    )
  }
}

Dropdown.defaultProps = {
  menu: [
    { name: 'Привязка счета', value: 1, route: 'BindTerminal' },
    { name: 'Привязка терминала', value: 2, route: 'BindTerminal' },
  ]
}

export default withNavigation(Dropdown)
