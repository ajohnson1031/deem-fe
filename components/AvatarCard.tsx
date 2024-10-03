import cn from "classnames";
import React, { FC } from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

interface AvatarCardProps {
  variant?: AvatarCardVariant;
  cardType?: GiftCardType;
  imageSrc?: any;
  bodyText: string;
  className?: string;
}

export enum AvatarCardVariant {
  DEFAULT = "default",
  CC = "creditCard",
}

export enum GiftCardType {
  VISA = "Visa",
  MASTERCARD = "MasterCard",
}

const AvatarCard: FC<AvatarCardProps> = ({ variant = AvatarCardVariant.DEFAULT, cardType = GiftCardType.VISA, imageSrc, bodyText, className }) => {
  const cardImages: Record<string, ImageSourcePropType> = {
    default: require("@/assets/images/react-logo.png"), // TODO: Replace with custom default image
    visa: require("@/assets/images/visa-logo.png"),
    mastercard: require("@/assets/images/mc-logo.png"),
  };

  const cardVariants: Record<string, JSX.Element> = {
    default: (
      <View className={"flex flex-row gap-4"}>
        <Image source={imageSrc || cardImages.default} width={48} height={48} className={"rounded-full bg-white/5 w-12 h-12"} />
        <View>
          <Text className={"text-white text-xs mb-0.5"}>Total Balance</Text>
          <Text className={"text-white text-xl font-bold"}>{bodyText}</Text>
        </View>
      </View>
    ),
    creditCard: (
      <View className={"flex flex-row gap-4"}>
        <Image source={cardType === GiftCardType.VISA ? cardImages.visa : cardImages.mastercard} width={48} height={48} className={"rounded-full bg-white/5 w-12 h-12"} />
        <View>
          <Text className={"text-white text-md font-semibold mb-2"}>{`${cardType} Gift Card`}</Text>
          <Text className={"text-white text-md tracking-widest"}>{bodyText}</Text>
        </View>
      </View>
    ),
  };

  return <View className={cn("w-85 p-4 rounded-lg bg-stone-950", className)}>{cardVariants[variant]}</View>;
};

export default AvatarCard;
