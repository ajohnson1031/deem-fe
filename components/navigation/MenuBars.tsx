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
    <View className={"flex-row justify-between items-center px-4 fixed left-0 top-20 elevation-24 z-50"}>
      {isRoot ? (
        <TouchableOpacity
          onPress={() => {
            router.push("./");
            setActiveTab(null);
          }}
          className={"p-3 rounded-full"}
        >
          <Ionicons name={"arrow-back"} size={28} color={"#1c1917"} />
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
    <View className={"flex-row justify-between items-center py-2 px-2 fixed left-0 bottom-12 elevation-24 z-50 bg-base-100 rounded-xl w-[85%] mx-auto"}>
      <TouchableOpacity
        onPress={() => {
          router.push("./cards");
          setActiveTab("cards");
        }}
        className={cn("h-14 w-14 flex justify-center items-center rounded-xl", { "bg-slate-900": activeTab === "cards" })}
      >
        <MaterialCommunityIcons name={activeTab === "cards" ? "credit-card-chip" : "credit-card-chip-outline"} size={28} color={activeTab === "cards" ? "white" : "#1c1917"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("./wallet");
          setActiveTab("wallet");
        }}
        className={cn("h-14 w-14 flex justify-center items-center rounded-xl", { "bg-slate-900": activeTab === "wallet" })}
      >
        <Ionicons name={activeTab === "wallet" ? "wallet" : "wallet-outline"} size={28} color={activeTab === "wallet" ? "white" : "#1c1917"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("./profile");
          setActiveTab("profile");
        }}
        className={cn("h-14 w-14 flex justify-center items-center rounded-xl", { "bg-slate-900": activeTab === "profile" })}
      >
        <FontAwesome name={activeTab === "profile" ? "user" : "user-o"} size={28} color={activeTab === "profile" ? "white" : "#1c1917"} />
      </TouchableOpacity>
    </View>
  );
};

export { BottomMenuBar, TopMenuBar };
