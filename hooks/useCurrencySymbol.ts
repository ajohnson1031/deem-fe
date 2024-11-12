import { WALLET_CURRENCY_TYPE } from "@/app/data/testData";
import { useEffect, useState } from "react";

enum CURRENCY_SYMBOL {
  xrp = "xrp",
  usd = "$",
}

export const useCurrencySymbol = (currencyType: WALLET_CURRENCY_TYPE) => {
  const [currencySymbol, setCurrencySymbol] = useState<CURRENCY_SYMBOL>(CURRENCY_SYMBOL[currencyType]);

  useEffect(() => {
    setCurrencySymbol(CURRENCY_SYMBOL[currencyType]);
  }, [currencyType]);

  return currencySymbol;
};
