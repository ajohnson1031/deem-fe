import ScalingDraggableImage from "@/components/ScalingDraggableImage";
import { userState } from "@/state/user";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Profile = () => {
  const [user, setUser] = [useAtomValue(userState), useSetAtom(userState)];
  const { profileImage } = user;

  return (
    <View className={"flex-1 items-center"}>
      {!!profileImage ? (
        <ScalingDraggableImage source={profileImage} />
      ) : (
        <View className="border-2 border-stone-400 border-dashed w-full h-52 items-center justify-center">
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={40} color="#A8A29E" />
          </TouchableOpacity>
        </View>
      )}
      <Text className={"text-4xl text-slate-900 font-bold"}>Profile</Text>
    </View>
  );
};

export default Profile;
