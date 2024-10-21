import React, { FC } from "react";
import { View } from "react-native";

interface SpacerProps {
  space?: string;
}

const Spacer: FC<SpacerProps> = ({ space = "p-2" }) => {
  return <View className={space}></View>;
};

export default Spacer;
