import { BottomMenuBar, TopMenuBar } from "@/components/MenuBars";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

const RootLayout = () => {
  return (
    <View className={"flex-1 relative bg-[#003f4e]"}>
      <StatusBar style="light" />
      <TopMenuBar />
      <View className={"flex-1 elevation-10 z-10 relative"}>
        <Slot />
      </View>
      <BottomMenuBar />
    </View>
  );
};

export default RootLayout;
