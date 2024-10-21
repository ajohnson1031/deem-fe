import AvatarCard from "@/components/AvatarCard";
import GiftCardList from "@/components/GiftCardList";
import Spacer from "@/components/Spacer";
import React from "react";
import { View } from "react-native";

const HomePage = () => {
  return (
    <View className={"flex-1 pt-20 px-5 bg-base-50"}>
      <AvatarCard bodyText={"$56,980.00"} />
      <Spacer />
      <GiftCardList />
    </View>
  );
};

export default HomePage;
