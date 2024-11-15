import dayjs from "dayjs";

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
  balances: {
    usd: { name: "U.S. Dollar", type: WALLET_CURRENCY_TYPE.USD, amount: 612.89, color: "bg-green-500" },
    xrp: { name: "Ripple XRP", type: WALLET_CURRENCY_TYPE.XRP, amount: 1000.67482, color: "bg-sky-500" },
  },
  activity: [
    {
      id: 1,
      dateTime: dayjs().format("MMM. DD, YYYY|h:ssa").toString(),
      type: WALLET_ACTIVITY_TYPE.XRP_TO_USD,
      amount: 25,
      networkFee: 0.003,
      deemFee: 0.003,
    },
    {
      id: 2,
      dateTime: dayjs().format("MMM. DD, YYYY|h:ssa").toString(),
      type: WALLET_ACTIVITY_TYPE.USD_TO_XRP,
      amount: 12,
      networkFee: 0.00144,
      deemFee: 0.00144,
    },
    {
      id: 3,
      dateTime: dayjs().format("MMM. DD, YYYY|h:ssa").toString(),
      type: WALLET_ACTIVITY_TYPE.WITHDRAW_XRP,
      amount: "20,000",
      networkFee: 0.0024,
      deemFee: 0.0024,
    },
    {
      id: 4,
      dateTime: dayjs().format("MMM. DD, YYYY|h:ssa").toString(),
      type: WALLET_ACTIVITY_TYPE.WITHDRAW_USD,
      amount: 18,
      networkFee: 0.0024,
      deemFee: 0.0024,
    },
  ],
};

export { testNotifications, testWalletData };
