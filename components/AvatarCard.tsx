import cn from "classnames";
import React, { FC } from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import { GiftCardType } from "./GiftCard";

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

const AvatarCard: FC<AvatarCardProps> = ({ variant = AvatarCardVariant.DEFAULT, cardType = GiftCardType.VISA, imageSrc, bodyText, className }) => {
  const cardImages: Record<string, ImageSourcePropType> = {
    visa: require("@/assets/images/visa-logo.png"),
    mastercard: require("@/assets/images/mc-logo.png"),
  };

  const defaultAvatar = imageSrc ? (
    <Image source={imageSrc} width={48} height={48} className={"rounded-full bg-base-50 w-12 h-12"} />
  ) : (
    <View className={"rounded-full bg-base-50 w-12 h-12 flex justify-center items-center"}>
      <Text className={"text-3xl font-bold"}>A</Text>
    </View>
  );

  const cardVariants: Record<string, JSX.Element> = {
    default: (
      <View className={cn("flex flex-row gap-4 p-4 bg-white", className)}>
        {defaultAvatar}
        <View>
          <Text className={"text-slate-900 text-xs mb-0.5"}>Total Balance</Text>
          <Text className={"text-slate-900 text-xl font-bold"}>{bodyText}</Text>
        </View>
      </View>
    ),
    creditCard: (
      <View className={cn("flex flex-row gap-4 p-4", className)}>
        <Image source={cardType === GiftCardType.VISA ? cardImages.visa : cardImages.mastercard} width={48} height={48} className={"rounded-full bg-white/5 w-12 h-12"} />
        <View>
          <Text className={"text-white text-md font-semibold mb-2"}>{`${cardType} Gift Card`}</Text>
          <Text className={"text-white text-md tracking-widest"}>{bodyText}</Text>
        </View>
      </View>
    ),
  };

  return <View className={cn("w-full rounded-lg bg-stone-950 overflow-hidden", className)}>{cardVariants[variant]}</View>;
};

export default AvatarCard;
