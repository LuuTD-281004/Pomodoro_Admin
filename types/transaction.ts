import { User } from "./user";

export type Transaction = {
  id: string;
  sepayId: string;
  userId: string;
  gateway: string;
  transactionDate: string;
  accountNumber: string;
  code: string;
  content: string;
  transferType: string;
  transferAmount: string;
  accumulated: string;
  referenceCode: string;
  description: string;
  createdAt: string;
  updatedAt: string;

  user?: User;
};
