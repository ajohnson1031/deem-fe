import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";

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
  card: GiftCardData;
  onPress: () => void;
  index?: number;
}

const GiftCard: FC<GiftCardProps> = ({ card: { id, cardType, cardNum }, onPress, index = 0 }) => {
  return (
    <Pressable onPress={onPress}>
      <Animated.View className={"w-full h-52 my-2.5 rounded-2xl overflow-hidden shadow-giftcard bg-slate-900 border border-white"} style={{ zIndex: index, top: index * -190 }}>
        <View></View>
        <Text className={"absolute bottom-2.5 left-2.5 text-white text-lg"}>• • • • {cardNum.slice(cardNum.length - 4)}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default GiftCard;
