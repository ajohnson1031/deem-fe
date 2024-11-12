import { BottomMenuBar, TopMenuBar } from "@/components/navigation/MenuBars";
import { Slot } from "expo-router";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const RootLayout = () => {
  return (
    <View className={"flex-1 bg-base-50"}>
      <TopMenuBar />
      <GestureHandlerRootView>
        <Slot />
      </GestureHandlerRootView>
      <BottomMenuBar />
    </View>
  );
};

export default RootLayout;
