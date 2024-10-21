import { BottomMenuBar, TopMenuBar } from "@/components/navigation/MenuBars";
import { Slot } from "expo-router";
import { View } from "react-native";

const RootLayout = () => {
  return (
    <View className={"flex-1 bg-base-50"}>
      <TopMenuBar />
      <Slot />
      <BottomMenuBar />
    </View>
  );
};

export default RootLayout;
