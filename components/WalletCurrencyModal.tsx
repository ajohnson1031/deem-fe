import { WALLET_CURRENCY_TYPE } from "@/app/data/testData";
import { RBSheetRef } from "@/constants/refs";
import { walletState } from "@/state/wallet";
import cn from "classnames";
import { useAtomValue } from "jotai";
import React from "react";
import { Pressable, Text, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import CurrencyCard from "./CurrencyCard";

interface WalletCurrencyModalProps {
  currencyType: WALLET_CURRENCY_TYPE;
  onCurrencyChange: (currencyType: WALLET_CURRENCY_TYPE) => void;
}

// Wrap the component in forwardRef
export const WalletCurrencyModal = React.forwardRef<RBSheetRef, WalletCurrencyModalProps>(({ currencyType, onCurrencyChange }, ref) => {
  const { balances } = useAtomValue(walletState);

  const handleClose = () => {
    if (ref && "current" in ref && ref.current) {
      ref.current.close();
    }
  };

  return (
    <RBSheet
      ref={ref}
      draggable
      dragOnContent
      height={340}
      customStyles={{
        container: {
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
        draggableIcon: {
          width: 80,
          marginTop: 15,
        },
      }}
    >
      <View className="flex flex-row justify-start pt-2 pl-[7.5%]">
        <Text className="text-2xl">Select Currency</Text>
      </View>
      <View className="flex w-85 mx-auto">
        {/* Body */}
        <View className="flex py-3 justify-center">
          {Object.entries(balances).map(([key, balance], idx) => (
            <CurrencyCard key={idx} isActive={currencyType === key} currency={balance} onPress={onCurrencyChange} />
          ))}
        </View>

        <Pressable onPress={handleClose}>
          {({ pressed }) => (
            <View className={cn("mt-2 p-2 bg-stone-800 rounded-md", { "bg-stone-900": pressed })}>
              <Text className="text-base text-white font-bold text-center">Continue</Text>
            </View>
          )}
        </Pressable>
      </View>
    </RBSheet>
  );
});
