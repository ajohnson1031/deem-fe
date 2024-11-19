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
  walletFriendlyName: Yup.string(),
  withdrawalWalletAddress: Yup.string(),
  withdrawalFriendlyName: Yup.string(),
});

type FormValues = {
  walletFriendlyName?: string;
  withdrawalWalletAddress?: string;
  withdrawalWalletFriendlyName?: string;
};

const WalletViewer: FC<WalletViewerProps> = () => {
  const [wState, setWState] = [useAtomValue(walletState), useSetAtom(walletState)];
  const { walletAddress, walletFriendlyName, withdrawalWalletAddress, withdrawalWalletFriendlyName } = wState;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCopying, setIsCopying] = useState<Record<string, boolean>>({ wallet: false, withdrawalWallet: false });
  const [formValues, setFormValues] = useState<FormValues>({ walletFriendlyName, withdrawalWalletAddress, withdrawalWalletFriendlyName });

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
        <View className="flex flex-row justify-end mt-2 mb-4 ">
          <View className={cn("p-2 border-2 border-sky-800 rounded-md", { "border-mango-600": isEditing })}>
            <Text className={cn("text-base font-semibold text-sky-800", { "text-mango-600": isEditing })}>{!isEditing ? "Edit" : "Stop Editing?"}</Text>
          </View>
        </View>
      </Pressable>
      <Formik initialValues={{ walletFriendlyName, withdrawalWalletAddress, withdrawalWalletFriendlyName }} validationSchema={validationSchema} onSubmit={() => void 0}>
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
                label="Deem Wallet Friendly Name"
                value={values.walletFriendlyName}
                onChange={(value: string) => {
                  handleChange("walletFriendlyName")(value);
                  setFormValues({ ...formValues, walletFriendlyName: value });
                  setWState({ ...wState, walletFriendlyName: value });
                }}
                placeholder="Enter wallet friendly name..."
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
                label="My Wallet Friendly Name"
                value={values.withdrawalWalletFriendlyName}
                onChange={(value: string) => {
                  handleChange("withdrawalWalletFriendlyName")(value);
                  setFormValues({ ...formValues, withdrawalWalletFriendlyName: value });
                  setWState({ ...wState, withdrawalWalletFriendlyName: value });
                }}
                placeholder="Enter your wallet friendly name..."
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
