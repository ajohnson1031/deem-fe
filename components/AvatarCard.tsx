import { CircleColors } from "@/constants/Colors";
import { userState } from "@/state/user";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import cn from "classnames";
import { useAtomValue, useSetAtom } from "jotai";
import { FC, useEffect } from "react";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
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

  const [user, setUser] = [useAtomValue(userState), useSetAtom(userState)];

  const defaultAvatar = imageSrc ? (
    <Image source={imageSrc} width={48} height={48} className={"rounded-full bg-base-50 w-12 h-12"} />
  ) : (
    <View className={"rounded-full w-14 h-14 flex justify-center items-center"} style={{ backgroundColor: user.color || CircleColors[5] }}>
      <Text className={"text-3xl font-medium text-white"}>{user.firstname?.slice(0, 1).toUpperCase() ?? user.email.slice(0, 1).toUpperCase()}</Text>
    </View>
  );

  const cardVariants: Record<string, JSX.Element> = {
    default: (
      <View className={cn("flex flex-row p-4 justify-between bg-white", className)}>
        <View className={"flex flex-row gap-4"}>
          {defaultAvatar}
          <View>
            <Text className={"text-stone-900 text-sm mb-0.5"}>Total Balance</Text>
            <Text className={"text-stone-900 text-2xl font-normal"}>{bodyText}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => {}} className={"h-fit w-fit flex justify-center mr-1"}>
          <MaterialCommunityIcons name={"eye-outline"} size={24} color={"#1C1917"} />
        </TouchableOpacity>
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

  useEffect(() => {
    if (!user.color) setUser({ ...user, color: `${CircleColors[Math.floor(Math.random() * CircleColors.length)]}` });
  }, [user]);

  return <View className={cn("w-full rounded-lg bg-stone-950 overflow-hidden", className)}>{cardVariants[variant]}</View>;
};

export default AvatarCard;
