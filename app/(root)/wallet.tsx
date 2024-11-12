import { WALLET_CURRENCY_TYPE } from "@/app/data/testData";
import XRPLogo from "@/assets/images/XRPLogo.png";
import CurrencyCard from "@/components/CurrencyCard";
import { walletState } from "@/state/wallet";
import { useAtomValue } from "jotai";
import React, { FC, useState } from "react";
import { Image, Modal, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "react-native-vector-icons";

const CURRENCY_SYMBOL: Record<string, React.ReactNode> = {
  xrp: (
    <View className="relative -top-2.5">
      <Image source={XRPLogo} style={{ width: 24, height: 24 }} />
    </View>
  ),
  usd: <Text className="text-3xl font-semibold relative -top-1.5">$</Text>,
};

const Wallet = () => {
  const { balances, activity } = useAtomValue(walletState);
  const [currencyType, setCurrencyType] = useState<WALLET_CURRENCY_TYPE>(WALLET_CURRENCY_TYPE.XRP);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(!modalOpen);
  const handleCurrencyChange = (currencyType: WALLET_CURRENCY_TYPE) => setCurrencyType(currencyType);

  return (
    <View className={"flex-1 pt-32 items-center"}>
      {modalOpen && <CurrencyModal currencyType={currencyType} onCurrencyChange={handleCurrencyChange} onClose={handleModalOpen} />}
      {/* Amount View */}
      <View className="flex items-center gap-3">
        <View className="flex flex-row items-end">
          <View>{CURRENCY_SYMBOL[currencyType]}</View>
          <Text className="text-5xl font-semibold">{`${balances[currencyType].amount.toFixed(2)}`}</Text>
        </View>

        <TouchableOpacity onPress={handleModalOpen}>
          <View className="flex flex-row gap-0.5 border border-r-stone-900 w-20 justify-center py-1 rounded-full">
            <Text>{currencyType.toUpperCase()}</Text>
            <Ionicons name="chevron-down-outline" size={16} color="#1c1917" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface CurrencyModalProps {
  currencyType: WALLET_CURRENCY_TYPE;
  onCurrencyChange: (currencyType: WALLET_CURRENCY_TYPE) => void;
  onClose: () => void;
}

const CurrencyModal: FC<CurrencyModalProps> = ({ currencyType, onCurrencyChange, onClose }) => {
  const { balances } = useAtomValue(walletState);
  return (
    <Modal transparent animationType="none">
      <View className="w-full h-full bg-stone-950/50">
        <View className="w-full rounded-t-3xl absolute left-0 bottom-0 p-8 bg-white h-[340px]">
          {/* Header */}
          <View className="flex flex-row justify-start">
            <Text className="text-2xl font-semibold">Select currency</Text>
          </View>

          {/* Body */}
          <View className="flex py-3">
            {Object.entries(balances).map((balance, idx) => {
              return <CurrencyCard key={idx} isActive={currencyType === balance[0]} currency={balance[1]} onPress={onCurrencyChange} />;
            })}
          </View>

          <TouchableOpacity className={"mt-2 p-2 bg-green-500 rounded-md"} onPress={onClose}>
            <View>
              <Text className="text-base text-white font-bold text-center">Continue</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Wallet;
