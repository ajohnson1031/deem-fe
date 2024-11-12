import { userState } from "@/state/user";
import { Ionicons } from "@expo/vector-icons";
import cn from "classnames";
import { useAtomValue, useSetAtom } from "jotai";
import React, { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ProfileImage: FC = () => {
  const [user, setUser] = [useAtomValue(userState), useSetAtom(userState)];
  const { profileImage } = user;

  // TODO: Flesh out change/delete functionality
  const handleChange = () => {};
  const handleDelete = () => {
    setUser({ ...user, profileImage: null });
  };

  return (
    <View className="flex items-center">
      <View className={cn("border-2 border-stone-300 w-28 h-28 rounded-full items-center justify-center mb-4", { "border-dashed border-stone-400": !profileImage })}>
        {!!profileImage && <Image source={{ uri: profileImage }} style={{ width: 108, height: 108, borderRadius: 54 }} />}
        <TouchableOpacity onPress={handleChange}>{!profileImage && <Ionicons name="camera-outline" size={32} color="#a8a29e" />}</TouchableOpacity>
      </View>
      {!!profileImage && (
        <View className="flex flex-row gap-2">
          <TouchableOpacity onPress={handleChange}>
            <View className="bg-stone-800 py-1.5 !w-24 rounded-md">
              <Text className="text-md font-semibold text-white w-fit text-center">Change Pic</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <View className="bg-base-50 py-1.5 !w-24 rounded-md border border-base-200">
              <Text className="text-md font-semibold text-red-600 w-fit text-center">Delete Pic</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProfileImage;
