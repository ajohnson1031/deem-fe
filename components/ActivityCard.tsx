import { WALLET_ACTIVITY_TYPE } from "@/app/data/testData";
import { WalletActivity } from "@/state/wallet";
import { EvilIcons, FontAwesome6 } from "@expo/vector-icons";
import cn from "classnames";
import { FC } from "react";
import { Pressable, Text, View } from "react-native";

interface ActivityCardProps {
  activity: WalletActivity;
  wrapperClass?: string;
}

const ActivityCard: FC<ActivityCardProps> = ({ activity, wrapperClass = "" }) => {
  const { id, dateTime, type, amount } = activity;
  const [date, time] = dateTime.split("|");

  // TODO: Flesh out this handlePress function
  const handlePress = () => {};

  return (
    <Pressable className={cn("h-1/3", wrapperClass)} onPress={handlePress}>
      {({ pressed }) => (
        <View className={cn("flex flex-row justify-between p-2 bg-base-50 w-full rounded-md", { "bg-green-100": pressed })}>
          <View className="flex flex-col justify-center items-center">
            <Text className="text-7xl font-thin">{amount}</Text>
            <View className="flex flex-row">
              <Text className="text-xs">{type}</Text>
              {[WALLET_ACTIVITY_TYPE.WITHDRAW_XRP, WALLET_ACTIVITY_TYPE.WITHDRAW_USD].includes(type) && <FontAwesome6 name="sack-dollar" size={13} color="#292524" />}
            </View>
          </View>
          <View className="flex flex-col items-end justify-between">
            <View>
              <Text className="text-md">{date}</Text>
              <Text className="text-md">{time}</Text>
            </View>
            <EvilIcons name="arrow-right" size={36} color="#292524" className="relative left-1.5" />
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default ActivityCard;
