import { Transaction } from "@/types/transaction";
import http from "./http";

export async function getTransactions(
  page: number = 1,
  limit: number = 10,
  sortBy: string = "transactionDate",
  order: "ASC" | "DESC" = "DESC"
) {
  const response = await http.get<{
    message: string;
    result: {
      data: Transaction[];
      pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    };
  }>("/payment/transactions", {
    params: { page, limit, sortBy, order },
  });

  return response.data;
}
