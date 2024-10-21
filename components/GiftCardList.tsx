import React, { FC, useState } from "react";
import { View } from "react-native";
import GiftCard, { GiftCardData, GiftCardType } from "./GiftCard";

interface GiftCardListProps {
  data?: GiftCardData[];
}

const tempCards: GiftCardData[] = [
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

const GiftCardList: FC<GiftCardListProps> = ({ data = tempCards }) => {
  const [selectedCard, setSelectedCard] = useState<GiftCardData | null>(null);

  const handleCardSelection = (card: GiftCardData) => setSelectedCard(card === selectedCard ? null : card);

  return (
    <View className="flex-1">
      <View className="flex-1 relative">
        {data.map((card, i) => (
          <GiftCard key={card.id} card={card} onPress={() => handleCardSelection(card)} index={i} selectedCard={selectedCard} />
        ))}
      </View>
      {/* Display transactions */}
    </View>
  );
};

export default GiftCardList;
