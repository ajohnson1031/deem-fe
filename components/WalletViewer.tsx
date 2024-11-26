import { walletState } from "@/state/wallet";
import { Ionicons } from "@expo/vector-icons";
import cn from "classnames";
import * as Clipboard from "expo-clipboard";
import { Formik } from "formik";
import { useAtomValue, useSetAtom } from "jotai";
import { FC, useState } from "react";
import { Pressable, Text, View } from "react-native";
import * as Yup from "yup";
import CustomInput from "./CustomInput";

interface WalletViewerProps {}

const validationSchema = Yup.object().shape({
  walletNickname: Yup.string(),
  withdrawalWalletAddress: Yup.string(),
  withdrawalNickname: Yup.string(),
});

type FormValues = {
  walletNickname?: string;
  withdrawalWalletAddress?: string;
  withdrawalWalletNickname?: string;
};

const WalletViewer: FC<WalletViewerProps> = () => {
  const [wState, setWState] = [useAtomValue(walletState), useSetAtom(walletState)];
  const { walletAddress, walletNickname, withdrawalWalletAddress, withdrawalWalletNickname } = wState;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCopying, setIsCopying] = useState<Record<string, boolean>>({ wallet: false, withdrawalWallet: false });
  const [formValues, setFormValues] = useState<FormValues>({ walletNickname, withdrawalWalletAddress, withdrawalWalletNickname });

  const handleCopy = ({ text, toCopy }: { text?: string; toCopy: string }) => {
    Clipboard.setStringAsync(text || "");
    setCheckMark(toCopy);
  };

  const setCheckMark = (stateProp: string) => {
    setIsCopying({ ...isCopying, [stateProp]: true });
    setTimeout(() => setIsCopying({ ...isCopying, [stateProp]: false }), 2000);
  };

  return (
    <View>
      <Pressable onPress={() => setIsEditing(!isEditing)}>
        <View className="flex flex-row justify-between mt-2 pb-4 border-b border-b-base-300 mb-4">
          <Text className="text-base w-1/2">Edit your Deem wallet nickname and personal wallet details. </Text>
          <View className={cn("p-2 border-2 border-sky-800 rounded-md max-h-12", { "border-mango-600": isEditing })}>
            <Text className={cn("text-base font-semibold text-sky-800", { "text-mango-600": isEditing })}>{!isEditing ? "Edit" : "Stop Editing?"}</Text>
          </View>
        </View>
      </Pressable>
      <Formik initialValues={{ walletNickname, withdrawalWalletAddress, withdrawalWalletNickname }} validationSchema={validationSchema} onSubmit={() => void 0}>
        {({ handleChange, values, errors }) => (
          <>
            <View>
              <CustomInput
                label="Deem Wallet Address"
                value={walletAddress}
                autoCapitalize="none"
                editable={false}
                icon={
                  <Pressable onPress={() => handleCopy({ text: walletAddress, toCopy: "wallet" })}>
                    {({ pressed }) => (
                      <View className="relative right-2">
                        <Ionicons
                          name={!!isCopying.wallet ? "checkmark-done" : "copy-outline"}
                          size={18}
                          color={pressed ? "#1c1917" : !!isCopying.wallet ? "#22C55E" : "#78716C"}
                        />
                      </View>
                    )}
                  </Pressable>
                }
                iconSide="right"
              />
              <CustomInput
                label="Deem Wallet Nickname"
                value={values.walletNickname}
                onChange={(value: string) => {
                  handleChange("walletNickname")(value);
                  setFormValues({ ...formValues, walletNickname: value });
                  setWState({ ...wState, walletNickname: value });
                }}
                placeholder="Enter wallet Nickname..."
                autoCapitalize="none"
                editable={isEditing}
              />
            </View>
            <View>
              <CustomInput
                label="My Wallet Address"
                value={values.withdrawalWalletAddress}
                onChange={(value: string) => {
                  handleChange("withdrawalWalletAddress")(value);
                  setFormValues({ ...formValues, withdrawalWalletAddress: value });
                  setWState({ ...wState, withdrawalWalletAddress: value });
                }}
                placeholder="Enter your wallet address..."
                autoCapitalize="none"
                editable={isEditing}
                icon={
                  formValues.withdrawalWalletAddress &&
                  formValues.withdrawalWalletAddress.length > 0 && (
                    <Pressable onPress={() => handleCopy({ text: formValues.withdrawalWalletAddress, toCopy: "withdrawalWallet" })}>
                      {({ pressed }) => (
                        <View className="relative right-2">
                          <Ionicons
                            name={!!isCopying.withdrawalWallet ? "checkmark-done" : "copy-outline"}
                            size={18}
                            color={pressed ? "#1c1917" : !!isCopying.withdrawalWallet ? "#22C55E" : "#78716C"}
                          />
                        </View>
                      )}
                    </Pressable>
                  )
                }
                iconSide="right"
              />
              <CustomInput
                label="My Wallet Nickname"
                value={values.withdrawalWalletNickname}
                onChange={(value: string) => {
                  handleChange("withdrawalWalletNickname")(value);
                  setFormValues({ ...formValues, withdrawalWalletNickname: value });
                  setWState({ ...wState, withdrawalWalletNickname: value });
                }}
                placeholder="Enter your wallet Nickname..."
                autoCapitalize="none"
                editable={isEditing}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default WalletViewer;
