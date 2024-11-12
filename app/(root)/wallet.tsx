import { WALLET_CURRENCY_TYPE } from "@/app/data/testData";
import { useCurrencySymbol } from "@/hooks/useCurrencySymbol";
import { walletState } from "@/state/wallet";
import { useAtomValue } from "jotai";
import React, { FC, useState } from "react";
import { Modal, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "react-native-vector-icons";

const Wallet = () => {
  const { balances, activity } = useAtomValue(walletState);
  const [currencyType, setCurrencyType] = useState<WALLET_CURRENCY_TYPE>(WALLET_CURRENCY_TYPE.USD);
  const [modalOpen, setModalOpen] = useState(false);
  const currencySymbol = useCurrencySymbol(currencyType);
  const handleModalOpen = () => setModalOpen(!modalOpen);
  const handleCurrencyChange = (currencyType: WALLET_CURRENCY_TYPE) => setCurrencyType(currencyType);

  return (
    <View className={"flex-1 pt-32 items-center"}>
      {modalOpen && <CurrencyModal currencyType={currencyType} onCurrencyChange={handleCurrencyChange} onClose={handleModalOpen} />}
      {/* Amount View */}
      <View className="flex items-center gap-3">
        <View className="flex flex-row">
          {currencyType === WALLET_CURRENCY_TYPE.USD && <Text className="text-3xl font-semibold mt-1.5">{currencySymbol}</Text>}
          <Text className="text-5xl font-semibold">{`${balances[currencyType]}`}</Text>
          {currencyType === WALLET_CURRENCY_TYPE.XRP && <Text className="text-3xl font-semibold mt-1.5">{currencySymbol}</Text>}
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
  return (
    <Modal transparent animationType="none">
      <View className="w-full h-full bg-stone-950/50">
        <View className="w-full rounded-t-3xl absolute left-0 bottom-0 p-8 bg-white h-80">
          {/* Header */}
          <View className="flex flex-row justify-between">
            <Text className="text-2xl font-semibold">Select currency</Text>
            <TouchableOpacity className="ml-auto" onPress={onClose}>
              <Ionicons name="close-outline" size={32} color="black" />
            </TouchableOpacity>
          </View>

          {/* Body */}
        </View>
      </View>
    </Modal>
  );
};

export default Wallet;
