import { BottomMenuBar, TopMenuBar } from "@/components/navigation/MenuBars";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

const RootLayout = () => {
  return (
    <View className={"flex-1 relative bg-baseBG"}>
      <StatusBar style="light" />
      <TopMenuBar />
      <View className={"flex-1 relative"}>
        <Slot />
      </View>
      <BottomMenuBar />
    </View>
  );
};

export default RootLayout;
