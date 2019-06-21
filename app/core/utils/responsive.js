import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const WIDTH = 400;
const MAX_WIDTH = 600;
export const px = (...size) => {
  const width = wp('100%') > MAX_WIDTH ? MAX_WIDTH : wp('100%')
  const num = size.map(n => (`${width / WIDTH * n}px`)).join(' ');
  num.__proto__.int = width / WIDTH * size[0]
  num.__proto__.max = (max) => {
    if (num.__proto__.int < max) return num.__proto__.int
    return max
  }
  return num
}

console.log(px(1));

export { wp, hp }
