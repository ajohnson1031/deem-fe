import { tabState } from "@/state/cards";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import cn from "classnames";
import { useRouter, useSegments } from "expo-router";
import { useAtomValue, useSetAtom } from "jotai";
import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";

interface NavbarProps {}

const TopMenuBar: FC<NavbarProps> = () => {
  const router = useRouter();
  const segments = useSegments();
  const setActiveTab = useSetAtom(tabState);

  const isRoot = segments.length > 1;
  console.log(segments);

  return (
    <View className={"h-10 flex-row justify-between items-center px-6 fixed left-0 top-12 elevation-20 z-20"}>
      {isRoot ? (
        <TouchableOpacity
          onPress={() => {
            router.push("./");
            setActiveTab(null);
          }}
        >
          <Ionicons name={"arrow-back"} size={28} color={"white"} />
        </TouchableOpacity>
      ) : (
        <View className={"w-10"} />
      )}
      <View className={"w-10"} />
    </View>
  );
};

const BottomMenuBar: FC<NavbarProps> = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = [useAtomValue(tabState), useSetAtom(tabState)];

  return (
    <View className={"h-10 flex-row justify-between items-center px-6 fixed left-0 bottom-12 elevation-20 z-20"}>
      <TouchableOpacity
        onPress={() => {
          router.push("./cards");
          setActiveTab("cards");
        }}
        className={cn("opacity-60", { "opacity-100": activeTab === "cards" })}
      >
        <MaterialCommunityIcons name="credit-card-multiple-outline" size={28} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("./wallet");
          setActiveTab("wallet");
        }}
        className={cn("opacity-60", { "opacity-100": activeTab === "wallet" })}
      >
        <MaterialCommunityIcons name="wallet-outline" size={28} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("./profile");
          setActiveTab("profile");
        }}
        className={cn("opacity-60", { "opacity-100": activeTab === "profile" })}
      >
        <Ionicons name="settings-outline" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export { BottomMenuBar, TopMenuBar };
