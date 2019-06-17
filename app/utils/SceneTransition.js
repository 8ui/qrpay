import { Animated, Easing } from 'react-native';

export const transitionConfig = () => ({
  transitionSpec: {
    duration: 300,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  containerStyle: {
    backgroundColor: 'transparent',
  },
  // screenInterpolator: (sceneProps) => {
  //   const { layout, position, scene } = sceneProps;
  //   const { index, route: { params = {} } } = scene;
  //
  //   const animation = {};
  //
  //   // if (params.isModal) {
  //   //   const height = layout.initHeight;
  //   //   // const offset = height * 0.3;
  //   //   const offset = 0;
  //   //
  //   //   const translateY = position.interpolate({
  //   //     inputRange: [index - 1, index, index + 1],
  //   //     outputRange: [height, offset, offset],
  //   //   });
  //   //
  //   //   animation.opacity = position.interpolate({
  //   //     inputRange: [index - 1, index, index + 1],
  //   //     outputRange: [0.6, 1, 1],
  //   //   });
  //   //
  //   //   animation.transform = [{ translateY }];
  //   // } else {
  //     animation.opacity = position.interpolate({
  //       inputRange: [index - 1, index, index + 1],
  //       outputRange: [0, 1, 1],
  //     });
  //   // }
  //
  //   return animation;
  // },
});
