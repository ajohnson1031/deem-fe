import { Ionicons } from "@expo/vector-icons";
import React, { FC } from "react";
import { Modal, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface CustomModalProps {
  variant: CustomModalVariant;
  open: boolean;
  content: React.ReactNode | JSX.Element;
  footerButtonText?: string;
  onClick?: () => void;
  onClose: () => void;
}

export enum CustomModalVariant {
  INFO = "info",
  WARN = "warn",
}

const variantHeaders = {
  [CustomModalVariant.INFO]: "Things to Know...",
  [CustomModalVariant.WARN]: "Warning!",
};

const icons = {
  [CustomModalVariant.INFO]: <Ionicons name="information-circle-sharp" size={40} color="#0369A1" />,
  [CustomModalVariant.WARN]: <Ionicons name="warning" size={40} color="#F97316" />,
};

const CustomModal: FC<CustomModalProps> = ({ variant, open, content, footerButtonText, onClick, onClose }) => {
  if (!open) return null;

  return (
    <Modal animationType="fade" transparent>
      <View className="flex flex-1 flex-col items-center bg-stone-950/50">
        <View className="w-85 my-auto px-6 bg-white rounded-lg pt-1 pb-5">
          {/* Header */}
          <View className="flex flex-row items-center justify-between">
            <View className="flex gap-1 flex-row items-center py-2">
              <View>{icons[variant]}</View>
              <Text className="text-xl font-semibold">{variantHeaders[variant]}</Text>
            </View>
            <TouchableOpacity className="ml-auto" onPress={onClose}>
              <Ionicons name="close-outline" size={32} color="black" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View className="flex flex-row justify-center border-t border-stone-400 pt-4">{content}</View>

          {/* Footer */}
          <ModalFooter buttonText={footerButtonText} onClick={onClick} onClose={onClose} />
        </View>
      </View>
    </Modal>
  );
};

interface ModalFooterProps {
  buttonText?: string;
  onClick?: () => void;
  onClose: () => void;
}

const ModalFooter: FC<ModalFooterProps> = ({ buttonText = "Submit", onClick, onClose }) => {
  return (
    <View className="flex flex-row gap-2 ml-auto mt-3">
      <TouchableOpacity className="p-2 border-2 box-border rounded-md w-20 flex flex-row justify-center" onPress={onClose}>
        <Text className="font-semibold text-stone-950">Close</Text>
      </TouchableOpacity>
      {!!onClick && (
        <TouchableOpacity className="bg-sky-700 border-2 border-sky-700 p-2 rounded-md min-w-20 w-fit flex flex-row justify-center" onPress={onClick}>
          <Text className="font-semibold text-white">{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomModal;
