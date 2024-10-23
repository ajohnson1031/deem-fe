import { TopMenuBar } from "@/components/navigation/MenuBars";
import { Slot } from "expo-router";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ProfileLayout = () => {
  return (
    <View className={"flex-1"}>
      <TopMenuBar />
      <GestureHandlerRootView>
        <Slot />
      </GestureHandlerRootView>
    </View>
  );
};

export default ProfileLayout;
