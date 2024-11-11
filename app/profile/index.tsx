import ProfileImage from "@/components/ProfileImage";
import { userState } from "@/state/user";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { View } from "react-native";

const Profile = () => {
  const [user, setUser] = [useAtomValue(userState), useSetAtom(userState)];
  const { name, email } = user;

  return (
    <View className={"flex-1 items-center pt-20"}>
      <ProfileImage />
    </View>
  );
};

export default Profile;
