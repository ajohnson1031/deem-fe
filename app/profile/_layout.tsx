import { TopMenuBar } from "@/components/navigation/MenuBars";
import { Slot } from "expo-router";
import { View } from "react-native";

const ProfileLayout = () => {
  return (
    <View className={"flex-1"}>
      <TopMenuBar />
      <Slot />
    </View>
  );
};

export default ProfileLayout;
