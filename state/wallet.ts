import { testWalletData, WALLET_ACTIVITY_TYPE, WALLET_CONVERSION_TYPE, WALLET_CURRENCY_TYPE } from "@/app/data/testData";
import { atom } from "jotai";

type WalletActivity = {
  type: WALLET_ACTIVITY_TYPE;
  conversionType?: WALLET_CONVERSION_TYPE;
  withdrawalType?: WALLET_CURRENCY_TYPE;
  amount: number;
  networkFee: number;
  deemFee: number;
};

type WalletBalance = {
  xrp: { name: string; type: WALLET_CURRENCY_TYPE; amount: number; color: string };
  usd: { name: string; type: WALLET_CURRENCY_TYPE; amount: number; color: string };
};

interface WalletProps {
  balances: WalletBalance;
  activity: WalletActivity[];
}

const walletState = atom<WalletProps>(testWalletData);

export { walletState };
