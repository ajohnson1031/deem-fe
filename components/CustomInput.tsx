import cn from "classnames";
import { FC } from "react";
import { Text, TextInput, View } from "react-native";

interface CustomInputProps {
  value?: string;
  label?: string;
  placeholder?: string;
  wrapperClass?: string;
  editable?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  size?: "half" | "full";
  side?: "left" | "right" | "mid";
  onChange?: any;
  error?: string | null;
  icon?: React.ReactNode;
}

const CustomInput: FC<CustomInputProps> = ({ value, label, placeholder, wrapperClass, autoCapitalize, editable = true, onChange, size = "full", side, error, icon }) => {
  return (
    <View className={cn("w-full mb-4", wrapperClass, { "w-1/2": size === "half", "mr-1": side === "left", "ml-1": side === "right", "mx-1": side === "mid" })}>
      {!!label && <Text className="text-xs font-semibold mb-1">{label}</Text>}
      <View className={cn("flex flex-row border border-r-0 bg-white border-base-100", { "bg-base-100 border border-base-200": !editable })}>
        {!!icon && <View className={cn("flex justify-center p-1 pl-2")}>{icon}</View>}
        <TextInput
          data-testid={label?.split(" ").join("").toLowerCase()}
          className={cn("bg-transparent w-full p-2 pr-0 rounded text-stone-900 border border-base-100", {
            "text-stone-500 font-semibold": !editable,
            "w-[92%] pl-0 border-l-0": !!icon,
          })}
          autoCapitalize={autoCapitalize}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#57534E"}
          onChangeText={onChange}
          editable={editable}
        />
      </View>
      {!!error && <Text className="text-sm text-red-600">{error}</Text>}
    </View>
  );
};

export default CustomInput;
