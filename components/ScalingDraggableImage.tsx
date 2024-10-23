import React, { FC } from "react";
import { Dimensions, Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface ScalingDraggableImageProps {
  source: any;
  imageWidth?: number;
}

const ScalingDraggableImage: FC<ScalingDraggableImageProps> = ({ source, imageWidth = SCREEN_WIDTH }) => {
  const [translateX, translateY] = [useSharedValue(0), useSharedValue(0)];

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationX;
    })
    .onEnd(() => {
      translateX.value = withSpring(translateX.value);
      translateY.value = withSpring(translateY.value);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));

  const aspectRatio = 16 / 9;

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[{ position: "absolute", alignSelf: "center", width: imageWidth, height: 208, overflow: "hidden" }, animatedStyle]}>
        <Image source={source} style={{ width: imageWidth, height: imageWidth / aspectRatio }} resizeMode="cover" />
      </Animated.View>
    </GestureDetector>
  );
};

export default ScalingDraggableImage;
