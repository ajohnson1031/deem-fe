import React, { FC } from "react";
import { Text, View } from "react-native";
import { TestTransaction } from "./TransactionCardList";

// ! TODO: Rename TestTransaction to Transaction when actual data shape is discovered

interface TransactionCardProps {
  transaction: TestTransaction;
}

const TransactionCard: FC<TransactionCardProps> = ({ transaction: { id, description, amount } }) => {
  return (
    <View className={"flex flex-row p-4 bg-white rounded-lg justify-between mb-2 z-0 elevation-0"}>
      <View>
        <Text className={"font-bold mb-1"}>{id}</Text>
        <Text className={"text-stone-500"}>{description}</Text>
      </View>
      <View>
        <Text>${amount}</Text>
      </View>
    </View>
  );
};

export default TransactionCard;
