import React, { FC, useState } from "react";
import { View } from "react-native";
import GiftCard, { GiftCardData, GiftCardType } from "./GiftCard";
import TransactionCardList, { TestTransaction } from "./TransactionCardList";

interface GiftCardListProps {
  data?: GiftCardData[];
}

// ! TODO: DELETE THIS WHEN ACTUAL DATA GETS PULLED IN
const testCardData: GiftCardData[] = [
  {
    id: "1",
    cardType: GiftCardType.VISA,
    cardNum: "4242 4242 4242 4242",
  },
  {
    id: "2",
    cardType: GiftCardType.MASTERCARD,
    cardNum: "5353 5353 5353 5353",
  },
  {
    id: "3",
    cardType: GiftCardType.VISA,
    cardNum: "4848 4848 4848 4848",
  },
];

// ! TODO: DELETE THIS WHEN ACTUAL DATA GETS PULLED IN
export const testTransactionsData: Record<string, TestTransaction[]> = {
  "1": [
    { id: "t1", description: "Coffee Shop", amount: 5.75 },
    { id: "t2", description: "Grocery Store", amount: 35.2 },
  ],
  "2": [
    { id: "t1", description: "Gas Station", amount: 40.0 },
    { id: "t2", description: "Restaurant", amount: 65.5 },
  ],
  "3": [
    { id: "t1", description: "Online Purchase", amount: 120.75 },
    { id: "t2", description: "Streaming Service", amount: 15.99 },
  ],
};

const GiftCardList: FC<GiftCardListProps> = ({ data = testCardData }) => {
  const [selectedCard, setSelectedCard] = useState<GiftCardData | null>(null);

  const handleCardSelection = (card: GiftCardData) => setSelectedCard(card === selectedCard ? null : card);

  return (
    <View className="flex-1">
      {data.map((card, i) => (
        <GiftCard key={card.id} card={card} onPress={() => handleCardSelection(card)} index={i} selectedCard={selectedCard} />
      ))}
      {!!selectedCard && <TransactionCardList transactions={testTransactionsData[selectedCard.id]} />}
    </View>
  );
};

export default GiftCardList;
