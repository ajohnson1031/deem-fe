import { WALLET_CURRENCY_TYPE } from "@/app/data/testData";
import XRPLogo from "@/assets/images/XRPLogo.png";
import { WalletCurrencyModal } from "@/components/WalletCurrencyModal";
import { RBSheetRef } from "@/constants/refs";
import { walletState } from "@/state/wallet";
import cn from "classnames";
import { useAtomValue } from "jotai";
import React, { useRef, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { FontAwesome6, Ionicons, MaterialCommunityIcons } from "react-native-vector-icons";

const CURRENCY_SYMBOL: Record<string, React.ReactNode> = {
  xrp: (
    <View className="relative -top-2.5">
      <Image source={XRPLogo} style={{ width: 24, height: 24 }} />
    </View>
  ),
  usd: <Text className="text-3xl font-semibold relative -top-1.5">$</Text>,
};

const Wallet = () => {
  const cmRef = useRef<RBSheetRef>(null);
  const { balances, activity } = useAtomValue(walletState);
  const [currencyType, setCurrencyType] = useState<WALLET_CURRENCY_TYPE>(WALLET_CURRENCY_TYPE.XRP);

  const handleModalOpen = () => {
    cmRef.current?.open();
  };

  const handleCurrencyChange = (currencyType: WALLET_CURRENCY_TYPE) => {
    setCurrencyType(currencyType);
  };

  return (
    <View className={"flex-1 pt-32 items-center"}>
      <WalletCurrencyModal currencyType={currencyType} onCurrencyChange={handleCurrencyChange} ref={cmRef} />

      <View className="flex items-center gap-3 h-[31%]">
        {/* Start Amount View */}
        <View className="flex flex-row items-end">
          <View>{CURRENCY_SYMBOL[currencyType]}</View>
          <Text className="text-5xl font-semibold">{`${balances[currencyType].amount.toFixed(2)}`}</Text>
        </View>
        {/* End Amount View */}

        {/* Start Currency Switcher */}
        <Pressable onPress={handleModalOpen}>
          <View className={cn("flex flex-row gap-0.5 border border-stone-900 w-20 justify-center py-1 my-1.5 rounded-full")}>
            <Text className="text-stone-900">{currencyType.toUpperCase()}</Text>
            <Ionicons name="chevron-down-outline" size={16} color="#1c1917" />
          </View>
        </Pressable>
        {/* End Currency Switcher */}

        {/* Start Action Buttons */}
        <View className="flex flex-row w-[80%] gap-x-4 justify-center py-4">
          <Pressable onPress={null} className="w-1/2">
            {({ pressed }) => (
              <View className={cn("flex flex-row justify-center items-center py-2.5 rounded-md bg-stone-800", { "bg-stone-900": pressed })}>
                <Text className="text-white text-lg text-center mr-2">Convert</Text>
                <FontAwesome6 name="money-bill-transfer" size={16} color="white" />
              </View>
            )}
          </Pressable>
          <Pressable onPress={null} className="w-1/2">
            {({ pressed }) => (
              <View className={cn("flex flex-row justify-center items-center py-2.5 rounded-md bg-stone-800", { "bg-stone-900": pressed })}>
                <Text className="text-white text-lg text-center mr-2">Withdraw</Text>
                <MaterialCommunityIcons name="cash-fast" size={24} color="white" />
              </View>
            )}
          </Pressable>
        </View>
        {/* End Action Buttons */}
      </View>

      {/* Start Activity Section */}
      <View className="flex w-85 h-[48%]">
        <View className="mr-auto pt-3 pb-4">
          <Text className="text-2xl relative">Recent Activity</Text>
        </View>
        <View className="flex w-full h-full bg-base-200  rounded-lg items-center"></View>
        <Pressable className="w-24 mx-auto -mt-[18px]" onPress={null}>
          {({ pressed }) => (
            <View className={cn("p-2 bg-stone-800 rounded-md", { "bg-stone-900": pressed })}>
              <Text className="text-white font-semibold text-xs text-center">Show All</Text>
            </View>
          )}
        </Pressable>
      </View>
      {/* End Activity Section */}
    </View>
  );
};

export default Wallet;
