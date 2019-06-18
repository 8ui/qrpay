import { Animated, Easing } from 'react-native';

export const transitionConfig = ({ scenes }) => {
  const nextScene = scenes[scenes.length - 1];
  let prop;
  try {
    prop = nextScene.route.params.transition
    if (!prop) throw new Error();
  } catch (e) {
    prop = 'fromRight'
    // prop = 'fromBottom'
  }
  const screenInterpolator = (...props) => {
    const { position, scene, layout } = props[0]
    const { index } = scene
    const height = layout.initHeight;
    const width = layout.initWidth;
    const transform = {}

    switch (prop) {
      case 'fromBottom':
        transform.translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height / 2, 0, -height / 3],
        });
        break;
      case 'fromRight':
        transform.translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [width / 2, 0, -width / 3],
        });
        break
      default:
    }

    const opacity = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0, 1, 0],
    })

    return {
      transform: [transform],
      opacity,
    }
  }

  const transitionSpec = {
    timing: Animated.spring,
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  };

  return {
    ...transitionConfig,
    screenInterpolator,
    transitionSpec,
    containerStyle: {
      backgroundColor: 'transparent',
    }
  }
};
