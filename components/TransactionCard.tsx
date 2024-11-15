import React, { FC } from "react";
import { Text, View } from "react-native";
import { TestTransaction } from "./TransactionCardList";

// ! TODO: Rename TestTransaction to Transaction when actual data shape is discovered

interface TransactionCardProps {
  transaction: TestTransaction;
  isLast: boolean;
}

const TransactionCard: FC<TransactionCardProps> = ({ transaction: { id, description, amount }, isLast }) => {
  return (
    <>
      <View className={"flex flex-row p-4 bg-white justify-between"}>
        <View>
          <Text className={"font-bold mb-1"}>{id}</Text>
          <Text className={"text-stone-500"}>{description}</Text>
        </View>
        <View>
          <Text>${amount}</Text>
        </View>
      </View>
      {!isLast && <View className={"mx-4 h-[0.5px] bg-stone-300"} />}
    </>
  );
};

export default TransactionCard;
