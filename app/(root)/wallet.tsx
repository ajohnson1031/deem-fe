import { WALLET_CURRENCY_TYPE } from "@/app/data/testData";
import ActivityCard from "@/components/ActivityCard";
import AllActivity from "@/components/AllActivity";
import CurrencyCard from "@/components/CurrencyCard";
import CurrencySymbol from "@/components/CurrencySymbol";
import CustomModal, { CustomModalVariant } from "@/components/CustomModal";
import NumberPad, { NumpadVariant } from "@/components/NumberPad";
import SingleActivity from "@/components/SingleActivity";
import WalletViewer from "@/components/WalletViewer";
import { RBSheetRef } from "@/constants/refs";
import { WalletActivity, walletState } from "@/state/wallet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import cn from "classnames";
import { useAtomValue } from "jotai";
import { useRef, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import { AntDesign, Ionicons } from "react-native-vector-icons";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const Wallet = () => {
  const ctmRef = useRef<RBSheetRef>(null);
  const saRef = useRef<RBSheetRef>(null);
  const allRef = useRef<RBSheetRef>(null);
  const walletRef = useRef<RBSheetRef>(null);
  const numpadRef = useRef<RBSheetRef>(null);

  const { balances, activity } = useAtomValue(walletState);
  const [currencyType, setCurrencyType] = useState<WALLET_CURRENCY_TYPE>(WALLET_CURRENCY_TYPE.XRP);
  const [currentActivity, setCurrentActivity] = useState<WalletActivity | null>(null);
  const [allRefIsCurrent, setAllRefIsCurrent] = useState<boolean>(false);
  const [saHeight, setSaHeight] = useState<number>(470);
  const [numpadMethod, setNumpadMethod] = useState<string>("");

  const handleModalOpen = ({ type, activity, numpadType }: { type: string; activity?: WalletActivity; numpadType?: string }) => {
    switch (type) {
      case "currencyType":
        setAllRefIsCurrent(false);
        ctmRef.current?.open();
        break;
      case "singleActivity":
        if (activity) {
          setCurrentActivity(activity);
          setSaHeight(activity.memo === undefined ? 470 : 550);
          setTimeout(() => {
            if (!!allRefIsCurrent) {
              setAllRefIsCurrent(false);
              ctmRef.current?.close();
              allRef.current?.close();
              walletRef.current?.close();
              setTimeout(() => saRef.current?.open(), 300);
            } else {
              saRef.current?.open();
            }
          }, 100);
        }
        break;
      case "allActivity":
        setAllRefIsCurrent(true);
        allRef.current?.open();
        break;
      case "wallet":
        walletRef.current?.open();
        break;
      case "numpad":
        if (!!numpadType) {
          numpadRef.current?.open();
          setNumpadMethod(numpadType);
        }
        break;
      default:
        console.warn("Unknown modal type:", type);
    }
  };
  const handleCurrencyChange = (currencyType: WALLET_CURRENCY_TYPE) => {
    setCurrencyType(currencyType);
  };

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
  const allActivityContent = <AllActivity activity={activity} onCardPress={handleModalOpen} />;

  return (
    <View className={"flex-1 pt-32 items-center"}>
      <CustomModal variant={CustomModalVariant.CURRENCY} height={400} content={currencyModalContent} ref={ctmRef} />
      <CustomModal id={currentActivity?.id} variant={CustomModalVariant.WALLET_ACTIVITY} height={saHeight} content={currentActivityContent} ref={saRef} />
      <CustomModal variant={CustomModalVariant.ALL_WALLET_ACTIVITY} height={SCREEN_HEIGHT} content={allActivityContent} ref={allRef} />
      {/* // TODO: Add an onPress here */}
      <CustomModal variant={CustomModalVariant.WALLET} height={SCREEN_HEIGHT} content={<WalletViewer />} ref={walletRef} onPress={() => void 0} footerButtonText="Save & Close" />

      <CustomModal
        variant={CustomModalVariant.NUMPAD}
        height={SCREEN_HEIGHT}
        // TODO: Dynamicize this
        content={<NumberPad variant={numpadMethod === "Convert" ? NumpadVariant.CONVERT : NumpadVariant.WITHDRAW} currencyType={currencyType} />}
        ref={numpadRef}
        onPress={() => void 0}
        // TODO: Dynamicize this
        footerButtonText={numpadMethod}
      />

      <View className="flex items-center gap-3 h-[31%]">
        {/* Start Amount View */}
        <View className="flex flex-row items-end">
          <View>{CurrencySymbol(currencyType)}</View>
          <Text className="text-5xl font-light">{`${balances[currencyType].amount.toFixed(2)}`}</Text>
        </View>
        {/* End Amount View */}

        <View className="flex flex-row gap-x-3">
          {/* Start Currency Switcher */}
          <Pressable onPress={() => handleModalOpen({ type: "currencyType" })}>
            <View className={cn("flex flex-row gap-0.5 border border-stone-900 w-20 justify-center py-1 my-1.5 rounded-full")}>
              <Text className="text-stone-900">{currencyType.toUpperCase()}</Text>
              <Ionicons name="chevron-down-outline" size={16} color="#1c1917" />
            </View>
          </Pressable>
          {/* End Currency Switcher */}

          {/* Start Currency Switcher */}
          <Pressable onPress={() => handleModalOpen({ type: "wallet" })}>
            <View className={cn("flex flex-row gap-0.5 border border-stone-900 w-12 justify-center py-1 my-1.5 rounded-full")}>
              <Ionicons name="wallet" size={18} color="#1c1917" />
            </View>
          </Pressable>
          {/* End Currency Switcher */}
        </View>

        {/* Start Action Buttons */}
        <View className="flex flex-row w-[80%] gap-x-4 justify-center py-4">
          <Pressable onPress={() => handleModalOpen({ type: "numpad", numpadType: "Convert" })} className="w-1/2">
            {({ pressed }) => (
              <View className={cn("flex flex-row justify-center items-center py-2.5 rounded-md bg-stone-800", { "bg-stone-900": pressed })}>
                <Text className="text-white text-lg text-center mr-2">Convert</Text>
                <AntDesign name="swap" size={17} color="white" />
              </View>
            )}
          </Pressable>
          <Pressable onPress={() => handleModalOpen({ type: "numpad", numpadType: "Withdraw" })} className="w-1/2">
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
