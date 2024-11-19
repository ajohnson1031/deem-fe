enum NOTIFICATION_TYPES {
  URGENT = "urgent",
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}

const testNotifications = [
  { priority: NOTIFICATION_TYPES.URGENT, title: "Notification 1", description: "This is a test notification of the notification kind.", wasViewed: false },
  { priority: NOTIFICATION_TYPES.MEDIUM, title: "Notification 2", description: "This is test notification two of the notification kind.", wasViewed: false },
  { priority: NOTIFICATION_TYPES.URGENT, title: "Notification 3", description: "This is test notification three of the notification kind.", wasViewed: false },
  { priority: NOTIFICATION_TYPES.LOW, title: "Notification 4", description: "This is test notification four of the notification kind.", wasViewed: false },
  { priority: NOTIFICATION_TYPES.HIGH, title: "Notification 5", description: "This is test notification five of the notification kind.", wasViewed: false },
];

export enum WALLET_ACTIVITY_TYPE {
  WITHDRAW_XRP = "XRP → ",
  WITHDRAW_USD = "USD → ",
  XRP_TO_USD = "XRP → USD",
  USD_TO_XRP = "USD → XRP",
}

export enum WALLET_CURRENCY_TYPE {
  XRP = "xrp",
  USD = "usd",
}

const testWalletData = {
  walletAddress: "XRkoaufoPFjnc02089doxp1zveb",
  walletFriendlyName: undefined,
  withdrawalWalletAddress: undefined,
  withdrawalWalletFriendlyName: undefined,
  balances: {
    usd: { name: "U.S. Dollar", type: WALLET_CURRENCY_TYPE.USD, amount: 612.89, color: "bg-green-500" },
    xrp: { name: "Ripple XRP", type: WALLET_CURRENCY_TYPE.XRP, amount: 1000.67482, color: "bg-sky-500" },
  },
  activity: [
    {
      id: 1,
      dateTime: new Date().toString(),
      type: WALLET_ACTIVITY_TYPE.XRP_TO_USD,
      amount: 25,
      networkFee: 0.003,
      deemFee: 0.003,
    },
    {
      id: 2,
      dateTime: new Date(2024, 9, 25, 14, 30, 0).toString(),
      type: WALLET_ACTIVITY_TYPE.USD_TO_XRP,
      amount: 12,
      networkFee: 0.00144,
      deemFee: 0.00144,
    },
    {
      id: 3,
      dateTime: new Date().toString(),
      type: WALLET_ACTIVITY_TYPE.WITHDRAW_XRP,
      withdrawnTo: "Friendly XRP Wallet Name",
      memo: "For Rent",
      amount: "20,000",
      networkFee: 0.0024,
      deemFee: 0.0024,
    },
    {
      id: 4,
      dateTime: new Date(2023, 6, 12, 9, 15, 0).toString(),
      type: WALLET_ACTIVITY_TYPE.XRP_TO_USD,
      amount: 150,
      networkFee: 0.0025,
      deemFee: 0.0025,
    },
    {
      id: 5,
      dateTime: new Date(2022, 4, 20, 17, 45, 0).toString(),
      type: WALLET_ACTIVITY_TYPE.USD_TO_XRP,
      amount: 25,
      networkFee: 0.00144,
      deemFee: 0.00144,
    },
    {
      id: 6,
      dateTime: new Date(2021, 2, 18, 12, 30, 0).toString(),
      type: WALLET_ACTIVITY_TYPE.XRP_TO_USD,
      amount: 75,
      networkFee: 0.0012,
      deemFee: 0.0012,
    },
    {
      id: 7,
      dateTime: new Date(2020, 7, 5, 8, 0, 0).toString(),
      type: WALLET_ACTIVITY_TYPE.USD_TO_XRP,
      amount: 100,
      networkFee: 0.0018,
      deemFee: 0.0018,
    },
    {
      id: 8,
      dateTime: new Date(2019, 0, 22, 19, 15, 0).toString(),
      type: WALLET_ACTIVITY_TYPE.XRP_TO_USD,
      amount: 50,
      networkFee: 0.00095,
      deemFee: 0.00095,
    },
    {
      id: 9,
      dateTime: new Date(2018, 9, 15, 10, 10, 0).toString(),
      type: WALLET_ACTIVITY_TYPE.WITHDRAW_USD,
      withdrawnTo: "Friendly Bank Account Name",
      memo: "For shopping",
      amount: 200,
      networkFee: 0.002,
      deemFee: 0.002,
    },
  ],
};

export { testNotifications, testWalletData };
