import { WALLET_ACTIVITY_TYPE } from "@/app/data/testData";
import XRPLogo from "@/assets/images/XRPLogo.png";
import { getDateParts } from "@/helpers";
import { WalletActivity } from "@/state/wallet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FC } from "react";
import { Image, Text, View } from "react-native";

interface SingleActivityProps {
  activity: WalletActivity;
}

const SingleActivity: FC<SingleActivityProps> = ({ activity }) => {
  const { amount, dateTime, deemFee, networkFee, type, withdrawnTo, memo } = activity;
  const [date, time] = getDateParts(dateTime);
  const typePrefix = type.slice(0, 3).toLowerCase();
  const isWithdrawal = [WALLET_ACTIVITY_TYPE.WITHDRAW_USD, WALLET_ACTIVITY_TYPE.WITHDRAW_XRP].includes(type);

  const CURRENCY_SYMBOL: Record<string, React.ReactNode> = {
    xrp: (
      <View className="relative top-[1px]">
        <Image source={XRPLogo} style={{ width: 14, height: 14 }} />
      </View>
    ),
    usd: <Text className="text-lg font-light relative -mr-0.5">$</Text>,
  };

  return (
    <View className="flex flex-col gap-y-3 w-full mb-8">
      <View className="flex flex-row gap-x-1">
        <Text className="text-lg font-medium">Txn. Type: </Text>
        <View className="flex flex-row items-center">
          <Text className="text-lg font-light">{`${isWithdrawal ? "WITHDRAW " : "CONVERT "}${type}`}</Text>
          {type === WALLET_ACTIVITY_TYPE.WITHDRAW_USD && <MaterialCommunityIcons name="bank" size={18} color="#292524" />}
          {type === WALLET_ACTIVITY_TYPE.WITHDRAW_XRP && <MaterialCommunityIcons name="usb-flash-drive" size={18} />}
        </View>
      </View>
      {!!withdrawnTo && (
        <View className="flex flex-row gap-x-1">
          <Text className="text-lg font-medium">Withdrawn To: </Text>
          <Text className="text-lg font-light">{withdrawnTo}</Text>
        </View>
      )}
      {!!memo && (
        <View className="flex flex-row gap-x-1">
          <Text className="text-lg font-medium">Memo: </Text>
          <Text className="text-lg font-light">{memo}</Text>
        </View>
      )}

      <View className="flex flex-row gap-x-1">
        <Text className="text-lg font-medium">Date: </Text>
        <Text className="text-lg font-light">{date}</Text>
      </View>
      <View className="flex flex-row gap-x-1">
        <Text className="text-lg font-medium">Time: </Text>
        <Text className="text-lg font-light">{time}</Text>
      </View>
      <View className="flex flex-row gap-x-1">
        <Text className="text-lg font-medium">Amt.: </Text>
        <View className="flex flex-row items-center gap-x-0.5">
          {CURRENCY_SYMBOL[typePrefix]}
          <Text className="text-lg font-light">{`${amount}`}</Text>
        </View>
      </View>

      <View className="flex flex-row gap-x-1">
        <Text className="text-lg font-medium">Network Fee: </Text>
        <Text className="text-lg font-light">{networkFee}</Text>
      </View>
      <View className="flex flex-row gap-x-1">
        <Text className="text-lg font-medium">Deem Fee:</Text>
        <Text className="text-lg font-light">{deemFee}</Text>
      </View>
    </View>
  );
};

export default SingleActivity;
