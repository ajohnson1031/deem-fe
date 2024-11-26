import XRPLogo from "@/assets/images/XRPLogo.png";
import { Image, Text, View } from "react-native";

const CurrencySymbol = (currencyType: string) => {
  const CURRENCY_SYMBOL: Record<string, React.ReactNode> = {
    xrp: (
      <View className="relative -top-2.5">
        <Image source={XRPLogo} style={{ width: 24, height: 24 }} />
      </View>
    ),
    usd: <Text className="text-3xl font-light relative -top-1.5">$</Text>,
  };
  return CURRENCY_SYMBOL[currencyType];
};

export default CurrencySymbol;
