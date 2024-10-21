import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { SharedValue, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

export interface GiftCardData {
  id: string;
  cardType: GiftCardType;
  cardNum: string;
}

export enum GiftCardType {
  VISA = "visa",
  MASTERCARD = "mastercard",
}

interface GiftCardProps {
  index?: number;
  card: GiftCardData;
  selectedCard: GiftCardData | null;
  onPress: () => void;
}

const GiftCard: FC<GiftCardProps> = ({ index = 0, card: { id, cardType, cardNum }, selectedCard = null, onPress }) => {
  const isSelected = selectedCard?.id === id;
  const positionY: SharedValue<number> = useSharedValue(index * 40);
  const animatedStyle = useAnimatedStyle(() => ({
    top: withSpring(isSelected ? 0 : positionY.value, { damping: 10, stiffness: 80 }),
    zIndex: isSelected ? 50 : index,
    elevation: isSelected ? index * 10 : index,
    opacity: withTiming(selectedCard && selectedCard.id === id ? 1 : selectedCard && selectedCard.id !== id ? 0 : 1, { duration: 200 }),
  }));

  console.log({ id, cardType, cardNum });
  return (
    <Pressable onPress={onPress}>
      <Animated.View className={"absolute w-full h-52 rounded-2xl overflow-hidden shadow-giftcard elevation-5 z-10 bg-slate-900 border border-white"} style={animatedStyle}>
        <View></View>
        <Text className={"absolute bottom-2.5 left-2.5 text-white text-lg"}>• • • • {cardNum.slice(cardNum.length - 4)}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default GiftCard;
