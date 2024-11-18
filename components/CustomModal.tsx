import { RBSheetRef } from "@/constants/refs";
import { Ionicons } from "@expo/vector-icons";
import cn from "classnames";
import React from "react";
import { Pressable, Text, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

interface CustomModalProps {
  id?: string;
  height?: number;
  variant: CustomModalVariant;
  content: React.ReactNode | JSX.Element;
  footerButtonText?: string;
  onPress?: () => void;
}

export enum CustomModalVariant {
  INFO = "info",
  WARN = "warn",
  WALLET_ACTIVITY = "wallet_activity",
  CURRENCY = "currency",
}

const icons = {
  [CustomModalVariant.INFO]: <Ionicons name="information-circle-sharp" size={40} color="#0369A1" />,
  [CustomModalVariant.WARN]: <Ionicons name="warning" size={40} color="#F97316" />,
  [CustomModalVariant.WALLET_ACTIVITY]: null,
  [CustomModalVariant.CURRENCY]: null,
};

const CustomModal = React.forwardRef<RBSheetRef, CustomModalProps>(({ id, height = 600, variant, content, footerButtonText = "Continue", onPress }, ref) => {
  const handleClose = () => {
    if (ref && "current" in ref && ref.current) {
      ref.current.close();
    }
  };

  const variantHeaders = {
    [CustomModalVariant.INFO]: "Things to Know...",
    [CustomModalVariant.WARN]: "Warning!",
    [CustomModalVariant.CURRENCY]: "Select Currency",
    [CustomModalVariant.WALLET_ACTIVITY]: `Wallet Txn: ${id}`,
  };

  return (
    <RBSheet
      ref={ref}
      draggable
      dragOnContent
      height={height}
      customStyles={{
        container: {
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
        draggableIcon: {
          width: 80,
          marginTop: 15,
        },
      }}
    >
      <View className="w-full mt-3 px-[7.5%] bg-white rounded-lg pb-5">
        {/* Header */}
        <View className="flex flex-row items-center justify-between">
          <View className="flex gap-1 flex-row items-center py-2">
            <Text className="text-2xl">{variantHeaders[variant]}</Text>
            {icons[variant] && <View>{icons[variant]}</View>}
          </View>
        </View>

        {/* Content */}
        <View className="flex flex-row justify-center border-t border-stone-400 pt-4">{content}</View>

        {/* Footer */}
        <View className="flex flex-row gap-x-4 justify-center">
          {!!onPress && (
            <Pressable
              onPress={() => {
                handleClose();
              }}
              className="mt-2 min-w-[40%]"
            >
              {({ pressed }) => (
                <View className={cn("mt-2 p-2 border-red-700 border-2 box-border h-12 rounded-md", { "bg-red-700": pressed })}>
                  <Text className={cn("text-lg text-red-700 text-center", { "text-white": pressed })}>Cancel</Text>
                </View>
              )}
            </Pressable>
          )}
          <Pressable
            onPress={() => {
              if (!!onPress) {
                onPress();
              }
              handleClose();
            }}
            className={cn("mt-2 min-w-[40%]", { "w-[90%]": !onPress })}
          >
            {({ pressed }) => (
              <View className={cn("mt-2 p-2 bg-stone-800 h-12 rounded-md", { "bg-stone-900": pressed })}>
                <Text className="text-lg text-white text-center">{footerButtonText}</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </RBSheet>
  );
});

export default CustomModal;
