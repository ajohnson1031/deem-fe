import { FC } from "react";
import { View } from "react-native";

interface DividerProps {
  theme?: string;
}

enum DividerThemes {
  LIGHT = "h-[1px] w-3/4 bg-white/30 my-4",
  DARK = "h-[1px] w-3/4 bg-gray-600 my-4",
}

const Divider: FC<DividerProps> = ({ theme = DividerThemes.LIGHT }) => {
  return <View className={theme} />;
};

export default Divider;
