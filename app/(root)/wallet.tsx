import { WALLET_CURRENCY_TYPE } from "@/app/data/testData";
import XRPLogo from "@/assets/images/XRPLogo.png";
import ActivityCard from "@/components/ActivityCard";
import AllActivity from "@/components/AllActivity";
import CurrencyCard from "@/components/CurrencyCard";
import CustomModal, { CustomModalVariant } from "@/components/CustomModal";
import SingleActivity from "@/components/SingleActivity";
import { RBSheetRef } from "@/constants/refs";
import { WalletActivity, walletState } from "@/state/wallet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import cn from "classnames";
import { useAtomValue } from "jotai";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { AntDesign, Ionicons } from "react-native-vector-icons";

const CURRENCY_SYMBOL: Record<string, React.ReactNode> = {
  xrp: (
    <View className="relative -top-2.5">
      <Image source={XRPLogo} style={{ width: 24, height: 24 }} />
    </View>
  ),
  usd: <Text className="text-3xl font-light relative -top-1.5">$</Text>,
};

const SCREEN_HEIGHT = Dimensions.get("window").height;

const Wallet = () => {
  const ctmRef = useRef<RBSheetRef>(null);
  const saRef = useRef<RBSheetRef>(null);
  const allRef = useRef<RBSheetRef>(null);

  const { balances, activity } = useAtomValue(walletState);
  const [currencyType, setCurrencyType] = useState<WALLET_CURRENCY_TYPE>(WALLET_CURRENCY_TYPE.XRP);
  const [currentActivity, setCurrentActivity] = useState<WalletActivity | null>(null);
  const [allRefIsCurrent, setAllRefIsCurrent] = useState<boolean>(false);
  const [saModalHeight, setSaModalHeight] = useState<number | undefined>(undefined);
  const [modalReady, setModalReady] = useState(false);

  const handleModalOpen = ({ type, activity }: { type: string; activity?: WalletActivity }) => {
    switch (type) {
      case "currencyType":
        setAllRefIsCurrent(false);
        ctmRef.current?.open();
        break;
      case "singleActivity":
        if (activity) {
          setModalReady(false); // Prevent modal from opening prematurely
          setCurrentActivity(activity);
        }
        break;
      case "allActivity":
        setAllRefIsCurrent(true);
        allRef.current?.open();
        break;
      default:
        console.warn("Unknown modal type:", type);
    }
  };

  const handleCurrencyChange = (currencyType: WALLET_CURRENCY_TYPE) => {
    setCurrencyType(currencyType);
  };

  useEffect(() => {
    if (currentActivity) {
      const height = currentActivity.memo !== undefined ? 550 : 470;
      setSaModalHeight(height);

      // Delay opening until height is set
      setTimeout(() => {
        setModalReady(true);
        saRef.current?.open();
      }, 0);
    }
  }, [currentActivity]);

  const currencyModalContent = (
    <View className="flex w-full mx-auto -mt-4 -mb-2">
      <View className="flex py-3 justify-center">
        {Object.entries(balances).map(([key, balance], idx) => (
          <CurrencyCard key={idx} isActive={currencyType === key} currency={balance} onPress={handleCurrencyChange} />
        ))}
      </View>
    </View>
  );

  const currentActivityContent = currentActivity ? <SingleActivity activity={currentActivity!} /> : null;
  const allActivityContent = useMemo(() => <AllActivity activity={activity} onCardPress={handleModalOpen} />, [activity]);

  return (
    <View className={"flex-1 pt-32 items-center"}>
      <CustomModal variant={CustomModalVariant.CURRENCY} height={400} content={currencyModalContent} ref={ctmRef} />
      <CustomModal id={currentActivity?.id} variant={CustomModalVariant.WALLET_ACTIVITY} height={saModalHeight} content={modalReady ? currentActivityContent : null} ref={saRef} />
      <CustomModal variant={CustomModalVariant.ALL_WALLET_ACTIVITY} height={SCREEN_HEIGHT} content={allActivityContent} ref={allRef} />

      <View className="flex items-center gap-3 h-[31%]">
        {/* Start Amount View */}
        <View className="flex flex-row items-end">
          <View>{CURRENCY_SYMBOL[currencyType]}</View>
          <Text className="text-5xl font-light">{`${balances[currencyType].amount.toFixed(2)}`}</Text>
        </View>
        {/* End Amount View */}

        {/* Start Currency Switcher */}
        <Pressable onPress={() => handleModalOpen({ type: "currencyType" })}>
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
                <AntDesign name="swap" size={17} color="white" />
              </View>
            )}
          </Pressable>
          <Pressable onPress={null} className="w-1/2">
            {({ pressed }) => (
              <View className={cn("flex flex-row justify-center items-center py-2.5 rounded-md bg-stone-800", { "bg-stone-900": pressed })}>
                <Text className="text-white text-lg text-center mr-2">Withdraw</Text>
                {currencyType === WALLET_CURRENCY_TYPE.XRP && <MaterialCommunityIcons name="usb-flash-drive" size={18} color="white" />}
                {currencyType === WALLET_CURRENCY_TYPE.USD && <MaterialCommunityIcons name="bank" size={18} color="white" />}
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
        <View className="flex w-full h-full bg-base-200 rounded-lg items-center px-1.5 py-[3px]">
          {activity.slice(0, 3).map((item, idx) => (
            <ActivityCard key={idx} activity={item} wrapperClass={"my-[3px] !h-[31.6%]"} onPress={() => handleModalOpen({ type: "singleActivity", activity: item })} />
          ))}
        </View>
        <Pressable className="w-24 mx-auto -mt-[18px]" onPress={() => handleModalOpen({ type: "allActivity" })}>
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
