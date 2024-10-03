import AvatarCard, { AvatarCardVariant, GiftCardType } from "@/components/AvatarCard";
import React from "react";
import { Text, View } from "react-native";

const HomePage = () => {
  return (
    <View className={"absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-baseBG"}>
      <AvatarCard variant={AvatarCardVariant.CC} cardType={GiftCardType.MASTERCARD} bodyText={"6458 6354 7909 0001"} />
      <Text className={"text-4xl text-white font-bold"}>Home Page</Text>
    </View>
  );
};

export default HomePage;
