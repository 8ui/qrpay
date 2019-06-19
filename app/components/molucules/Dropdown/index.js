import React from 'react'
import { Dimensions } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import styled from 'styled-components'

import { Divider } from 'atoms'

const { width, height } = Dimensions.get('window');

const Wrapper = styled.View`

`
const ButtonWrapper = styled.TouchableOpacity`
  z-index: 3;

`
const IconWrapper = styled(Entypo)`
  color: ${props => (props.open ? 'black' : 'rgba(255,255,255,0.7)')};
  font-size: 30px;
`
const Overlay = styled.TouchableOpacity`
  background-color: transparent;
  position: absolute;
  top: -20px;
  right: -10px;
  z-index: 1;
  width: ${width}px;
  height: ${height}px;
`
const Menu = styled.View`
  position: absolute;
  top: -10px;
  right: 0;
  z-index: 2;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  min-width: ${width * 0.75}px;
`
const MenuHeader = styled.Text`
  padding: 2px 15px 14px;
  font-family: roboto;
  font-size: 20px;
`
const MenuItem = styled.TouchableOpacity`
  padding: 12px 15px;
  flex-direction: row;
`
const MenuItemText = styled.Text`
  font-size: 22px;
  color: black;
  font-family: roboto-500;
`

class Dropdown extends React.Component {
  state = {
    open: true,
  }

  toggle = () => {
    this.setState(({ open }) => ({ open: !open }))
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
      <Menu>
        <MenuHeader>Настройки</MenuHeader>
        {menu.map(this.renderItem)}
      </Menu>
    )
  }

  renderItem = (n, i) => {
    console.log(n);
    return (
      <React.Fragment>
        {i !== 0 && <Divider />}
        <MenuItem key={`menu-item-${n.value}`}>
          <MenuItemText>{n.name}</MenuItemText>
        </MenuItem>
      </React.Fragment>
    )
  }

  render() {
    const { open } = this.state
    const { icon } = this.props
    return (
      <Wrapper>
        <ButtonWrapper onPress={this.toggle}>
          <IconWrapper open={open} name={icon} />
        </ButtonWrapper>
        {this.renderMenu()}
        {this.renderOverlay()}
      </Wrapper>
    )
  }
}

Dropdown.defaultProps = {
  menu: [
    { name: 'Привязка счета', value: 1 },
    { name: 'Привязка терминала', value: 2 },
  ]
}

export default Dropdown
