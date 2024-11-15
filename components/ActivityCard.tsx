import { WALLET_ACTIVITY_TYPE } from "@/app/data/testData";
import XRPLogo from "@/assets/images/XRPLogo.png";
import { WalletActivity } from "@/state/wallet";
import { EvilIcons, FontAwesome6 } from "@expo/vector-icons";
import cn from "classnames";
import { FC } from "react";
import { Image, Pressable, Text, View } from "react-native";

interface ActivityCardProps {
  activity: WalletActivity;
  wrapperClass?: string;
}

const ActivityCard: FC<ActivityCardProps> = ({ activity, wrapperClass = "" }) => {
  const { id, dateTime, type, amount } = activity;
  const [date, time] = dateTime.split("|");

  const CURRENCY_SYMBOL: Record<string, React.ReactNode> = {
    xrp: (
      <View className="relative -top-2.5">
        <Image source={XRPLogo} style={{ width: 18, height: 18 }} />
      </View>
    ),
    usd: <Text className="text-4xl font-extralight relative -top-1 -mr-1">$</Text>,
  };

  const typePrefix = type.slice(0, 3).toLowerCase();

  // TODO: Flesh out this handlePress function
  const handlePress = () => {};

  return (
    <Pressable className={cn("h-1/3", wrapperClass)} onPress={handlePress}>
      {({ pressed }) => (
        <View className={cn("flex flex-row justify-between p-2 px-2.5 bg-base-50 w-full rounded-md", { "bg-green-100": pressed })}>
          <View className="flex flex-col items-start">
            <View className="flex flex-row items-end mb-2">
              {CURRENCY_SYMBOL[typePrefix]}
              <Text className="text-5xl font-thin">{amount}</Text>
            </View>
            <View className="flex flex-row px-2 py-1 border border-stone-800 rounded-full w-24 justify-center">
              <Text className="text-xs">{type}</Text>
              {[WALLET_ACTIVITY_TYPE.WITHDRAW_XRP, WALLET_ACTIVITY_TYPE.WITHDRAW_USD].includes(type) && <FontAwesome6 name="sack-dollar" size={13} color="#292524" />}
            </View>
          </View>
          <View className="flex flex-col items-end justify-between">
            <View className="flex flex-col items-end">
              <Text className="text-md">{date}</Text>
              <Text className="text-md">{time}</Text>
            </View>
            <View className="relative left-1.5">
              <EvilIcons name="arrow-right" size={28} color="#292524" />
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default ActivityCard;
