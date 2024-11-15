import { testWalletData, WALLET_CURRENCY_TYPE } from "@/app/data/testData";
import { atom } from "jotai";

export type WalletActivity = {
  id: string | number;
  dateTime: string;
  type: any;
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
