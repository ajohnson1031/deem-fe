import React, { FC, useEffect } from "react";
import { FlatList } from "react-native";
import Animated, { Easing, SharedValue, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import TransactionCard from "./TransactionCard";

export interface TestTransaction {
  id: string;
  description: string;
  amount: number;
}
interface TransactionCardListProps {
  transactions: TestTransaction[];
}

const TransactionCardList: FC<TransactionCardListProps> = ({ transactions }) => {
  const top: SharedValue<number> = useSharedValue(250);
  const opacity: SharedValue<number> = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    top: withDelay(150, withTiming(top.value)),
    opacity: withDelay(100, withTiming(opacity.value)),
  }));

  useEffect(() => {
    top.value = withTiming(224, { duration: 150, easing: Easing.inOut(Easing.quad) });
    opacity.value = withTiming(1, { duration: 150, easing: Easing.inOut(Easing.quad) });
  }, []);

  return (
    <Animated.View style={animatedStyle} className={"rounded-lg overflow-hidden"}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <TransactionCard key={item.id} transaction={item} isLast={index + 1 === transactions.length} />}
      />
    </Animated.View>
  );
};

export default TransactionCardList;
