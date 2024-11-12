import { WALLET_CURRENCY_TYPE } from "@/app/data/testData";
import XRPLogo from "@/assets/images/XRPLogo.png";
import WhiteXRPLogo from "@/assets/images/XRPLogo_White.png";
import cn from "classnames";
import React, { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface CurrencyItem {
  name: string;
  type: WALLET_CURRENCY_TYPE;
  amount: number;
  color: string;
}

interface CurrencyCardProps {
  isActive: boolean;
  currency: CurrencyItem;

  onPress: (currencyType: WALLET_CURRENCY_TYPE) => void;
}

const CurrencyCard: FC<CurrencyCardProps> = ({ isActive = false, currency, onPress }) => {
  const { name, type, amount, color } = currency;

  const symbols = {
    [WALLET_CURRENCY_TYPE.USD]: {
      lg: <Text className="text-2xl font-semibold text-white">$</Text>,
      sm: <Text className="text-stone-700">$</Text>,
    },
    [WALLET_CURRENCY_TYPE.XRP]: {
      lg: <Image source={WhiteXRPLogo} style={{ width: 20, height: 20 }} />,
      sm: (
        <View className="relative -top-[3px]">
          <Image source={XRPLogo} style={{ width: 10, height: 10 }} />
        </View>
      ),
    },
  };

  return (
    <TouchableOpacity onPress={() => onPress(type)}>
      <View className="flex flex-row justify-between items-center py-3 mb-2">
        <View className="flex flex-row gap-3">
          <View className={`w-12 h-12 flex flex-row justify-center items-center rounded-full ${color} text-`}>{symbols[type].lg}</View>
          <View className="flex gap-y-0.5">
            <Text className="text-base font-semibold text-stone-800">{name}</Text>
            <View className="flex flex-row items-end">
              {symbols[type].sm}
              <Text className="text-stone-700">{amount} available</Text>
            </View>
          </View>
        </View>

        <View className={cn("w-5 h-5 rounded-full border-12 bg-stone-300 flex justify-center items-center", { [color]: isActive })}>
          <View className="w-2 h-2 bg-white rounded-full" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CurrencyCard;
