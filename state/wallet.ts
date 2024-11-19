import { testWalletData, WALLET_CURRENCY_TYPE } from "@/app/data/testData";
import { atom } from "jotai";

export type WalletActivity = {
  id: string | number;
  dateTime: string;
  type: any;
  amount: string | number;
  withdrawnTo?: string;
  memo?: string;
  networkFee: number;
  deemFee: number;
};

type WalletBalance = {
  xrp: { name: string; type: WALLET_CURRENCY_TYPE; amount: number; color: string };
  usd: { name: string; type: WALLET_CURRENCY_TYPE; amount: number; color: string };
};

interface WalletProps {
  walletAddress?: string;
  walletFriendlyName?: string;
  withdrawalWalletAddress?: string;
  withdrawalWalletFriendlyName?: string;
  balances: WalletBalance;
  activity: WalletActivity[];
}

const walletState = atom<WalletProps>(testWalletData);

export { walletState };
