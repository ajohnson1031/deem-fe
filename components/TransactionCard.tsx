import React, { FC } from "react";

export interface TestTransaction {
  id: string;
  description: string;
  amount: number;
}

interface TransactionCardProps {
  transaction: TestTransaction;
}

const TransactionCard: FC<TransactionCardProps> = ({ transaction }) => {
  return <div>TransactionCard</div>;
};

export default TransactionCard;
