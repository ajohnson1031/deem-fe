import { tabState } from "@/state/cards";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
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
    <View className={"flex-row justify-between items-center px-6 fixed left-0 top-20 elevation-24 z-50"}>
      {isRoot ? (
        <TouchableOpacity
          onPress={() => {
            router.push("./");
            setActiveTab(null);
          }}
          className={"bg-white/5 p-3 rounded-full"}
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
    <View className={"flex-row justify-between items-center py-2 px-2 fixed left-0 bottom-12 elevation-24 z-50 bg-white/5 rounded-full w-[85%] mx-auto"}>
      <TouchableOpacity
        onPress={() => {
          router.push("./cards");
          setActiveTab("cards");
        }}
        className={cn("opacity-60 h-16 w-16 flex justify-center items-center bg-white/10 rounded-full", { "opacity-100 bg-white": activeTab === "cards" })}
      >
        <MaterialCommunityIcons
          name={activeTab === "cards" ? "credit-card-multiple" : "credit-card-multiple-outline"}
          size={28}
          color={activeTab === "cards" ? "#1c1917" : "white"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("./wallet");
          setActiveTab("wallet");
        }}
        className={cn("opacity-60 h-16 w-16 flex justify-center items-center bg-white/10 rounded-full", { "opacity-100 bg-white": activeTab === "wallet" })}
      >
        <MaterialCommunityIcons name={activeTab === "wallet" ? "wallet" : "wallet-outline"} size={28} color={activeTab === "wallet" ? "#1c1917" : "white"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("./profile");
          setActiveTab("profile");
        }}
        className={cn("opacity-60 h-16 w-16 flex justify-center items-center bg-white/10 rounded-full", { "opacity-100 bg-white": activeTab === "profile" })}
      >
        <FontAwesome name={activeTab === "profile" ? "user" : "user-o"} size={28} color={activeTab === "profile" ? "#1c1917" : "white"} />
      </TouchableOpacity>
    </View>
  );
};

export { BottomMenuBar, TopMenuBar };
