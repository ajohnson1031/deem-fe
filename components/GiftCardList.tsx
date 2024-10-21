import React, { FC, useState } from "react";
import { ScrollView, View } from "react-native";
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

  const handleCardSelection = (card: GiftCardData) => setSelectedCard(card);

  return (
    <View>
      {!!selectedCard ? (
        <View>
          <GiftCard card={selectedCard} onPress={() => setSelectedCard(null)} />
        </View>
      ) : (
        <ScrollView>
          {data.map((card, i) => (
            <GiftCard key={card.id} card={card} onPress={() => handleCardSelection(card)} index={i} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default GiftCardList;
