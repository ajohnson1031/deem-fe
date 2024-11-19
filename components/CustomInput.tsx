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
  iconSide?: "left" | "right";
}

const CustomInput: FC<CustomInputProps> = ({
  value,
  label,
  placeholder,
  wrapperClass,
  autoCapitalize,
  editable = true,
  onChange,
  size = "full",
  side,
  error,
  icon,
  iconSide = "left",
}) => {
  return (
    <View className={cn("w-full mb-4", wrapperClass, { "w-1/2": size === "half", "mr-1": side === "left", "ml-1": side === "right", "mx-1": side === "mid" })}>
      {!!label && <Text className="text-sm font-semibold mb-1">{label}</Text>}
      <View className={cn("flex flex-row border border-r-0 bg-white border-base-100 rounded-md", { "bg-base-100 border border-base-200": !editable })}>
        {!!icon && iconSide === "left" && <View className={cn("flex justify-center p-1 pl-2")}>{icon}</View>}
        <TextInput
          data-testid={label?.split(" ").join("").toLowerCase()}
          className={cn("text-base font-medium bg-transparent w-full p-2 pb-3 pr-0 rounded-md text-stone-900 border border-base-100", {
            "text-stone-500": !editable,
            "w-[92%] pl-0 border-l-0": !!icon && iconSide === "left",
            "w-[92%] pr-0 border-r-0": !!icon && iconSide === "right",
          })}
          autoCapitalize={autoCapitalize}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#57534E"}
          onChangeText={onChange}
          editable={editable}
        />
        {!!icon && iconSide === "right" && <View className={cn("flex justify-center p-1 pl-2")}>{icon}</View>}
      </View>
      {!!error && <Text className="text-sm text-red-600">{error}</Text>}
    </View>
  );
};

export default CustomInput;
